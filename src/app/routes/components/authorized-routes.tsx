import { Navigate, Outlet } from 'react-router-dom'

import { Container, Group } from '@mantine/core'

import { useAuth } from 'app/hooks/use-auth'
import { Header } from 'app/layout'
import { UNAUTHORIZED_PATHS } from 'app/routes/config/unauthorized-config'

export const AuthorizedRoutes = () => {
  const { user } = useAuth()

  if (!user) return <Navigate to={UNAUTHORIZED_PATHS.LOGIN} />

  return (
    <Container size='xl'>
      <Header />
      <Group mt={30}>
        <Outlet />
      </Group>
    </Container>
  )
}
