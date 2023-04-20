import { withLazy } from 'app/hoks/with-lazy'

export { authApi } from 'features/auth/store/api/auth.api'
export const Auth = withLazy(() => import('features/auth/pages/auth/auth'))
