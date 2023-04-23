import type { RouteProps } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import { Account } from 'features/account'
import { Home } from 'features/home'

enum AUTHORIZED_ROUTES {
  HOME = 'HOME',
  ACCOUNT = 'ACCOUNT',
}

export const AUTHORIZED_PATHS: Record<AUTHORIZED_ROUTES, string> = {
  [AUTHORIZED_ROUTES.HOME]: '/home',
  [AUTHORIZED_ROUTES.ACCOUNT]: '/account',
}

export const AUTHORIZED_ROUTE_CONFIG: RouteProps[] = [
  {
    path: AUTHORIZED_PATHS.HOME,
    element: <Home />,
  },
  {
    path: AUTHORIZED_PATHS.ACCOUNT,
    element: <Account />,
  },
  {
    path: '*',
    element: <Navigate to={AUTHORIZED_PATHS.HOME} replace />,
  },
]
