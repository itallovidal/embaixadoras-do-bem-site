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
  where,
} from '@firebase/firestore'
import { uuidv4 } from '@firebase/util'
import { ICreateProjectDTO } from '@/pages/api/_types/create-project-dto.type'
import formidable from 'formidable'
import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  list,
  ref,
  uploadBytesResumable,
} from '@firebase/storage'
import fs from 'node:fs/promises'
import { IGetProjectResponse } from '@/types/responses/get-project-response'

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

  async createProject(project: ICreateProjectDTO, images: formidable.File[]) {
    const projectsCollection = collection(this.db, 'projects')
    const id = uuidv4()
    await addDoc(projectsCollection, {
      id,
      ...project,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    console.log('arquivos:')
    console.log(images)

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
        return { ...doc, images: imgUrl }
      }),
    )

    return project[0]
  }

  async deleteProjectById(collectionId: string) {
    console.log('deletando...')
    console.log(collectionId)
    const projectRef = doc(this.db, 'projects', collectionId)

    await deleteDoc(projectRef)
  }
}
