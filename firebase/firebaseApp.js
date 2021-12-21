// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
// import { getAnalytics } from "firebaseClient/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  CACHE_SIZE_UNLIMITED,
  initializeFirestore,
  enableIndexedDbPersistence,
  getFirestore
} from 'firebase/firestore'

import firebaseConfig from './firebaseConfig';

const firebaseApp = getApps().find((item) => item.name_ === firebaseConfig.projectId) || initializeApp(firebaseConfig, firebaseConfig.projectId)

let fireStore = initializeFirestore(
  firebaseApp,
  {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
  }
)

export { firebaseApp }
