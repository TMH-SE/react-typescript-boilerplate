import firebase from 'firebase'
import { Context, createContext, FC } from 'react'

import { auth, firestore } from '@/config/firebase'

interface IFirebaseContext {
  auth: firebase.auth.Auth
  firestore: firebase.firestore.Firestore
}

const FirebaseContext: Context<IFirebaseContext> = createContext(null)

export { IFirebaseContext, FirebaseContext }

const FirebaseProvider: FC = ({ children }) => {
  return (
    <FirebaseContext.Provider
      value={{
        auth,
        firestore,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseProvider
