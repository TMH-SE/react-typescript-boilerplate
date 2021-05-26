import { Button } from '@material-ui/core'
import { useCallback, useContext } from 'react'

import { LocalStorageItemKeys } from '@/constants/app'
import { AuthContext } from '@/context'

const Login = () => {
  const { dispatchAuthAction } = useContext(AuthContext)
  const handleLogin = useCallback(() => {
    localStorage.setItem(LocalStorageItemKeys.ACCESS_TOKEN, 'hello-world')
    dispatchAuthAction({
      type: 'AUTHENTICATE',
      payload: {
        isAuthenticated: !!localStorage.getItem(
          LocalStorageItemKeys.ACCESS_TOKEN
        )
      }
    })
  }, [dispatchAuthAction])
  return (
    <Button onClick={handleLogin} variant="contained" color="primary">
      Login
    </Button>
  )
}

export default Login
