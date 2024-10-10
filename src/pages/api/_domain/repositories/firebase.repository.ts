import { initializeApp } from 'firebase/app'
import { env } from '@/root/env'
import {
  addDoc,
  collection,
  Firestore,
  getDocs,
  getFirestore,
  limit,
  query,
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
import { IGetProjectRes } from '@/types/responses/get-project-response'

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
    console.log('Arquivo a ser guardado:')
    console.log(file)

    const fileType = file.mimetype?.slice(6)
    const URL = `projects/${id}/${crypto.randomUUID()}.${fileType}`

    const storageRef = ref(this.storage, URL)

    const fileBuffer = await fs.readFile(file.filepath)
    const uploadTask = uploadBytesResumable(storageRef, fileBuffer)

    return await uploadTask.then(async () => {
      const { snapshot } = uploadTask
      console.log('concluido')
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

    // if (files.length === 0) throw new Error('Erro com o arquivo.')

    console.log('arquivos:')
    console.log(images)

    for await (const image of images) {
      await this.storeFile(image, id)
    }
  }

  async getProjects(queryLimit?: number): Promise<IGetProjectRes[]> {
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
        const doc = docs.data() as Omit<IGetProjectRes, 'images'>
        const imgUrl = await this.getFiles(`projects/${doc.id}`, 1)
        return { ...doc, images: imgUrl }
      }),
    )

    return projects
  }

  // getProjectDetails()
  // editProject
  // deleteProject
  // getProjectImages
}
