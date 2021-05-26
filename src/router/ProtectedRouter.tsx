import { Suspense } from 'react'
import { Redirect, Switch } from 'react-router'

import { FallbackComponent } from '@/components'
import AppLayout from '@/layout/app'

import { IRoute } from '.'
import { renderRoutesList } from './utils'

type ProtectedRoute = 'dashboard'

export const protectedRoutes: Readonly<Record<ProtectedRoute, IRoute>> = {
  dashboard: {
    component: 'dashboard',
    path: '/dashboard',
    exact: true
  }
}

function ProtectedRouter() {
  return (
    <AppLayout>
      <Suspense fallback={<FallbackComponent />}>
        <Switch>
          {renderRoutesList(protectedRoutes)}
          <Redirect to={protectedRoutes.dashboard.path} />
        </Switch>
      </Suspense>
    </AppLayout>
  )
}

export default ProtectedRouter
