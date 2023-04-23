import { withLazy } from 'app/hoks/with-lazy'

export const Account = withLazy(() => import('features/account/pages/account/account'))
