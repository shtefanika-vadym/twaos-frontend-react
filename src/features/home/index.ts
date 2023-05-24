import { withLazy } from 'app/hoks/with-lazy'

export const Home = withLazy(() => import('features/home/pages/home/home'))
export { homeApi } from 'features/home/store/api/home.api'
