import { Button } from '@material-ui/core'
import { FC, useCallback, useContext } from 'react'

import { LocalStorageItemKeys } from '@/constants/app'
import { AuthContext } from '@/context'

const Dasshboard: FC = () => {
  const { dispatchAuthAction } = useContext(AuthContext)
  const handleLogout = useCallback(() => {
    localStorage.setItem(LocalStorageItemKeys.ACCESS_TOKEN, 'hello-world')
    dispatchAuthAction({
      type: 'RESET_AUTH_CONTEXT'
    })
  }, [dispatchAuthAction])
  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  )
}

export default Dasshboard
