import type { USER_ROLES } from 'common/constants'

export interface IUser {
  token: string
  role: USER_ROLES.ADMIN | USER_ROLES.STUDENT | USER_ROLES.SECRETARY
}
