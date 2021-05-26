import { Route } from 'react-router'

import { LazyComponent } from '@/components'

import { IRoute } from '.'

export const renderRoutesList = (routes: Readonly<Record<string, IRoute>>) =>
  Object.entries(routes).map(([key, route]) => {
    const { component, ...rest } = route
    return (
      <Route
        key={key}
        {...rest}
        render={() => <LazyComponent component={component} />}
      />
    )
  })
