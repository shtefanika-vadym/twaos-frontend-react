import { withLazy } from 'app/hoks/with-lazy'

export const Users = withLazy(() => import('features/users/pages/users/users'))
