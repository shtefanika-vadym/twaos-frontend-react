import { Navigate } from 'react-router-dom'

import { USER_ROLES } from 'common/constants'
import type { IRoute, INavLink } from 'common/interfaces'

import { Account } from 'features/account'
import { Home } from 'features/home'
import { Replacement } from 'features/replacement'
import { Users } from 'features/users'

enum AUTHORIZED_ROUTES {
  HOME = 'HOME',
  USERS = 'USERS',
  ACCOUNT = 'ACCOUNT',
  REPLACEMENTS = 'REPLACEMENTS',
}

export const AUTHORIZED_PATHS: Record<AUTHORIZED_ROUTES, string> = {
  [AUTHORIZED_ROUTES.HOME]: '/home',
  [AUTHORIZED_ROUTES.USERS]: '/users',
  [AUTHORIZED_ROUTES.ACCOUNT]: '/replacement',
  [AUTHORIZED_ROUTES.REPLACEMENTS]: '/replacements',
}

export const AUTHORIZED_NAVIGATION: INavLink[] = [
  {
    label: 'Home',
    link: AUTHORIZED_PATHS.HOME,
    restrictedFor: [USER_ROLES.ADMIN],
  },
  {
    label: 'Users',
    link: AUTHORIZED_PATHS.USERS,
    restrictedFor: [USER_ROLES.SECRETARY, USER_ROLES.STUDENT],
  },
  {
    label: 'Replacements',
    link: AUTHORIZED_PATHS.REPLACEMENTS,
    restrictedFor: [USER_ROLES.STUDENT, USER_ROLES.ADMIN],
  },
  {
    label: 'Account',
    link: AUTHORIZED_PATHS.ACCOUNT,
  },
]

export const AUTHORIZED_ROUTE_CONFIG: IRoute[] = [
  {
    element: <Home />,
    path: AUTHORIZED_PATHS.HOME,
    restrictedFor: [USER_ROLES.ADMIN],
  },
  {
    element: <Account />,
    path: AUTHORIZED_PATHS.ACCOUNT,
  },
  {
    element: <Users />,
    path: AUTHORIZED_PATHS.USERS,
    restrictedFor: [USER_ROLES.SECRETARY, USER_ROLES.STUDENT],
  },
  {
    element: <Replacement />,
    path: AUTHORIZED_PATHS.REPLACEMENTS,
    restrictedFor: [USER_ROLES.STUDENT, USER_ROLES.ADMIN],
  },
  {
    path: '*',
    element: <Navigate to={AUTHORIZED_PATHS.HOME} replace />,
  },
]
