import { getFirestore } from 'firebase/firestore'

import { firebaseApp } from './firebaseApp'

const fireStore = getFirestore( firebaseApp )

export { fireStore }
