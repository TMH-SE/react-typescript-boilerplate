import { FC, Suspense, useContext } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import { FallbackComponent } from '@/components'
import { AuthContext } from '@/context/auth'

import ProtectedRouter, { protectedRoutes } from './ProtectedRouter'
import RestrictedRouter, { restrictedRoutes } from './RestrictedRouter'

export interface IRoute {
  path: string
  component: string
  exact?: boolean
  strict?: boolean
}

const AppRouter: FC = () => {
  const {
    authState: { inProcessing, isAuthenticated },
  } = useContext(AuthContext)

  if (inProcessing) {
    return <FallbackComponent />
  }

  return (
    <BrowserRouter basename="/">
      <Suspense fallback={<FallbackComponent />}>
        <Switch>
          <Route
            path="/"
            render={() => {
              if (isAuthenticated) {
                return <ProtectedRouter />
              }
              return <RestrictedRouter />
            }}
          />
          <Route
            path="*"
            render={({ location }) => (
              <Redirect
                to={{
                  pathname: isAuthenticated
                    ? protectedRoutes.dashboard.path
                    : restrictedRoutes.login.path,
                }}
              />
            )}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRouter
