import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from 'app/hooks/use-auth'
import { AUTHORIZED_PATHS } from 'app/routes/config/authorized-config'

import { USER_ROLES } from 'common/constants'

export const UnauthorizedRoutes = () => {
  const { user } = useAuth()

  if (user && user.role === USER_ROLES.ADMIN) return <Navigate to={AUTHORIZED_PATHS.USERS} />
  else if (user) return <Navigate to={AUTHORIZED_PATHS.HOME} />
  return <Outlet />
}
