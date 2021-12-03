import {
  CACHE_SIZE_UNLIMITED,
  initializeFirestore,
} from '@firebase/firestore'

import { firebase } from './clientApp'

const firestore = initializeFirestore(
  firebase,
  {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
  }
)

export { firestore }
