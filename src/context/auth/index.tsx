import {
  createContext,
  Dispatch,
  FC,
  useContext,
  useEffect,
  useReducer,
} from 'react'

import { LocalStorageItemKeys } from '@/constants/app'

import { FirebaseContext } from '../firebase'
import {
  AuthAction,
  authReducer,
  IAuthState,
  initialAuthState,
} from './auth.reducer'

export interface IAuthContext {
  authState: IAuthState
  dispatchAuthAction: Dispatch<AuthAction>
}

export const AuthContext: React.Context<IAuthContext> = createContext(null)

const AuthProvider: FC = ({ children }) => {
  const { auth } = useContext(FirebaseContext)
  const [authState, dispatchAuthAction] = useReducer(authReducer, {
    ...initialAuthState,
  })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authenticatedUser => {
      dispatchAuthAction({
        type: 'AUTHENTICATE',
        payload: {
          user: authenticatedUser,
        },
      })
    })
    return () => unsubscribe()
  }, [auth])

  return (
    <AuthContext.Provider value={{ authState, dispatchAuthAction }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
