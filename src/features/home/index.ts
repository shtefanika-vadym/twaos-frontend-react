import { withLazy } from 'app/hoks/with-lazy'

export const Home = withLazy(() => import('features/home/pages/home/home'))
