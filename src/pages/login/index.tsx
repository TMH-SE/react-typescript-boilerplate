import { useCallback, useContext } from 'react'

import { LocalStorageItemKeys } from '@/constants/app'
import { AuthContext } from '@/context/auth'

const Login = () => {
  const { dispatchAuthAction } = useContext(AuthContext)
  const handleLogin = useCallback(() => {
    localStorage.setItem(LocalStorageItemKeys.ACCESS_TOKEN, 'hello-world')
    dispatchAuthAction({
      type: 'AUTHENTICATE',
      payload: {
        user: null,
      },
    })
  }, [dispatchAuthAction])
  return (
    <button type="button" onClick={handleLogin} color="primary">
      Login
    </button>
  )
}

export default Login
