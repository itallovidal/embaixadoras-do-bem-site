import { initializeApp } from 'firebase/app'
import { env } from '@/root/env'
import {
  addDoc,
  collection,
  Firestore,
  getFirestore,
} from '@firebase/firestore'

export class FirebaseRepository /* implements IDatabaseRepository */ {
  private db: Firestore

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
    return getFirestore(app)
  }

  constructor() {
    this.db = this.initializeFirebase()
  }

  async createProject() {

  }
  // editProject
  // deleteProject
  // getProjectDetails
  // getProjectImages
}
