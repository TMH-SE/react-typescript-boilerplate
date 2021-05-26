import { createContext, Dispatch } from 'react'

import { AuthAction, IAuthState } from './auth.reducer'

export interface IAuthContext {
  authState: IAuthState
  dispatchAuthAction: Dispatch<AuthAction>
}

export const AuthContext: React.Context<IAuthContext> = createContext(null)
