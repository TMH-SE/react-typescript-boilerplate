import { Redirect, Switch } from 'react-router'

import { IRoute } from '.'
import { renderRoutesList } from './utils'

type RestrictedRoute = 'login'

export const restrictedRoutes: Readonly<Record<RestrictedRoute, IRoute>> = {
  login: {
    component: 'login',
    path: '/login',
    exact: true
  }
}

function RestrictedRouter() {
  return (
    <Switch>
      {renderRoutesList(restrictedRoutes)}
      <Redirect to={restrictedRoutes.login.path} />
    </Switch>
  )
}

export default RestrictedRouter
