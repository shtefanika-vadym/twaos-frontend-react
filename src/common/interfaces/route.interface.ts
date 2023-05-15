import type { USER_ROLES } from 'common/constants'

export interface IRoute {
  path: string
  element: JSX.Element
  restrictedFor?: USER_ROLES[]
}

export interface INavLink {
  link: string
  label: string
  restrictedFor?: USER_ROLES[]
}
