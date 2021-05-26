import { FC, useReducer } from 'react'

import { LocalStorageItemKeys } from '@/constants/app'
import { AuthContext, authReducer, initialAuthState } from '@/context'

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
