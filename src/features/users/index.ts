import { withLazy } from 'app/hoks/with-lazy'

export const Users = withLazy(() => import('features/users/pages/users/users'))
export { usersApi } from 'features/users/store/api/users.api'
