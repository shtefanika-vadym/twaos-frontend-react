import type { RouteProps } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import { Account } from 'features/account'
import { Home } from 'features/home'
import { Users } from 'features/users'

enum AUTHORIZED_ROUTES {
  HOME = 'HOME',
  USERS = 'USERS',
  ACCOUNT = 'ACCOUNT',
}

export const AUTHORIZED_PATHS: Record<AUTHORIZED_ROUTES, string> = {
  [AUTHORIZED_ROUTES.HOME]: '/home',
  [AUTHORIZED_ROUTES.USERS]: '/users',
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
    path: AUTHORIZED_PATHS.USERS,
    element: <Users />,
  },
  {
    path: '*',
    element: <Navigate to={AUTHORIZED_PATHS.HOME} replace />,
  },
]
