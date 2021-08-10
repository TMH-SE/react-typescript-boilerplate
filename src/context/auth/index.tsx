import { createContext, Dispatch , FC, useReducer } from 'react'

import { LocalStorageItemKeys } from '@/constants/app'

import { AuthAction, authReducer, IAuthState, initialAuthState } from './auth.reducer'

export interface IAuthContext {
  authState: IAuthState
  dispatchAuthAction: Dispatch<AuthAction>
}

export const AuthContext: React.Context<IAuthContext> = createContext(null)

const AuthProvider: FC = ({ children }) => {
  const [authState, dispatchAuthAction] = useReducer(authReducer, {
    ...initialAuthState,
    isAuthenticated: !!localStorage.getItem(LocalStorageItemKeys.ACCESS_TOKEN)
  })

  return (
    <AuthContext.Provider value={{ authState, dispatchAuthAction }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
