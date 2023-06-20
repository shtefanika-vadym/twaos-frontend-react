import { withLazy } from 'app/hoks/with-lazy'

export const Replacement = withLazy(
  () => import('features/replacement/pages/replacement/replacement'),
)
export { replacementApi } from 'features/replacement/store/api/replacement.api'
