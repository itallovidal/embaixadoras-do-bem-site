import { initializeApp } from 'firebase/app'
import { env } from '@/root/env'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  getFirestore,
  limit,
  query,
  updateDoc,
  where,
} from '@firebase/firestore'
import { uuidv4 } from '@firebase/util'
import { ICreateProjectDTO } from '@/pages/api/_types/create-project-dto.type'
import formidable from 'formidable'
import {
  deleteObject,
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  list,
  listAll,
  ref,
  uploadBytesResumable,
} from '@firebase/storage'
import fs from 'node:fs/promises'
import { IGetProjectResponse } from '@/domain/api-responses/projects/get-project-response'
import { TLoginSchema } from '@/validation/login.schema'
import { TProjectSchema } from '@/validation/project.schema'

export class FirebaseRepository /* implements IDatabaseRepository */ {
  private db: Firestore
  private storage: FirebaseStorage

  private initializeFirebase() {
    const firebaseConfig = {
      apiKey: env.FIREBASE_API_KEY,
      authDomain: 'embaixadoras-do-bem-site.firebaseapp.com',
      projectId: 'embaixadoras-do-bem-site',
      storageBucket: 'embaixadoras-do-bem-site.appspot.com',
      messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
      appId: env.FIREBASE_APP_ID,
    }

    // Criando uma conexão com o banco de dados
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const storage = getStorage(app)
    return {
      db,
      storage,
    }
  }

  constructor() {
    const { db, storage } = this.initializeFirebase()
    this.db = db
    this.storage = storage
  }

  private async storeFile(file: formidable.File, id: string) {
    if (!file.mimetype) throw new Error('Arquivo sem mimetype')

    const fileType = file.mimetype.split('/')[1]
    const validTypes = ['png', 'jpeg', 'jpg', 'webp']

    if (!validTypes.includes(fileType.toLowerCase())) {
      throw new Error('Tipo de arquivo não suportado')
    }

    const URL = `projects/${id}/${crypto.randomUUID()}.${fileType}`
    const storageRef = ref(this.storage, URL)

    const fileBuffer = await fs.readFile(file.filepath)

    const uploadTask = uploadBytesResumable(storageRef, fileBuffer, {
      contentType: file.mimetype,
    })

    return await uploadTask.then(async () => {
      const { snapshot } = uploadTask
      return await getDownloadURL(snapshot.ref)
    })
  }

  private async getFiles(
    imagePath: string,
    resultsLimit?: number,
  ): Promise<string[]> {
    const imgPathRef = ref(this.storage, imagePath)
    const imgList = await list(imgPathRef, { maxResults: resultsLimit })
    const imgsUrls: string[] = []

    for await (const item of imgList.items) {
      const url = await getDownloadURL(item)
      imgsUrls.push(url)
    }

    return imgsUrls
  }

  private async deleteFile(path: string) {
    const imgPathRef = ref(this.storage, path)
    await deleteObject(imgPathRef)
  }

  async createProject(project: ICreateProjectDTO, images: formidable.File[]) {
    const projectsCollection = collection(this.db, 'projects')
    const id = uuidv4()
    await addDoc(projectsCollection, {
      id,
      ...project,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    for await (const image of images) {
      await this.storeFile(image, id)
    }
  }

  async getProjects(queryLimit?: number): Promise<IGetProjectResponse[]> {
    const projectsCollection = collection(this.db, 'projects')
    let projectData

    if (queryLimit) {
      const projectQuery = query(projectsCollection, limit(queryLimit))
      projectData = await getDocs(projectQuery)
    } else {
      projectData = await getDocs(projectsCollection)
    }

    const projects = await Promise.all(
      projectData.docs.map(async (docs) => {
        const doc = docs.data() as Omit<IGetProjectResponse, 'images'>
        const imgUrl = await this.getFiles(`projects/${doc.id}`, 1)
        return { ...doc, images: imgUrl, collectionId: docs.id }
      }),
    )

    return projects
  }

  async getProjectByID(id: string): Promise<IGetProjectResponse> {
    const projectCollection = collection(this.db, 'projects')
    const q = query(projectCollection, where('id', '==', id))
    const request = await getDocs(q)

    const project = await Promise.all(
      request.docs.map(async (docs) => {
        const doc = docs.data() as Omit<IGetProjectResponse, 'images'>
        const imgUrl = await this.getFiles(`projects/${doc.id}`)
        return { ...doc, images: imgUrl, collectionId: docs.id }
      }),
    )

    return project[0]
  }

  async deleteProjectById(collectionId: string, id: string) {
    const projectRef = doc(this.db, 'projects', collectionId)
    await deleteDoc(projectRef)

    const imgPathRef = ref(this.storage, `projects/${id}/`)
    const imgList = await listAll(imgPathRef)

    for await (const item of imgList.items) await this.deleteFile(item.fullPath)
  }

  async login({ email, password }: TLoginSchema): Promise<IUserDTO> {
    const usersColletion = collection(this.db, 'users')
    const q = query(
      usersColletion,
      where('email', '==', email),
      where('password', '==', password),
    )
    const data = await getDocs(q)
    const user = data.docs.map((doc) => {
      const userInfo = doc.data() as Omit<IUserDTO, 'collectionId'>
      return {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        collectionId: doc.id,
      }
    })[0]

    return user
  }

  async editProject({
    collectionId,
    id,
    imgsToRemove,
    imgsToAdd,
    ...project
  }: {
    collectionId: string
    id: string
    imgsToRemove: string[]
    imgsToAdd: formidable.File[] | undefined
    project: Omit<TProjectSchema, 'images'>
  }) {
    const projectRef = doc(this.db, 'projects', collectionId)
    await updateDoc(projectRef, { ...project.project, updatedAt: new Date() })
    const url = `projects/${id}/`

    if (imgsToAdd) {
      for await (const image of imgsToAdd) {
        await this.storeFile(image, id)
      }
    }

    if (imgsToRemove) {
      imgsToRemove.map((img) =>
        this.deleteFile(url + img.split('%')[2].split('?')[0].slice(2)),
      )
    }
  }

  async getBlogPostsTags() {
    const tagsCollection = collection(this.db, 'blogPostsTags')
    const docs = await getDocs(tagsCollection)

    return docs.docs.map((doc) => doc.data())
  }
}
