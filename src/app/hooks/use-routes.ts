import { useMemo } from 'react'

import { useAuth } from 'app/hooks/use-auth'
import { AUTHORIZED_NAVIGATION, AUTHORIZED_ROUTE_CONFIG } from 'app/routes/config/authorized-config'
import { UNAUTHORIZED_ROUTE_CONFIG } from 'app/routes/config/unauthorized-config'

import type { INavLink, IRoute } from 'common/interfaces'

interface IUseAppRoutesOut {
  authorized: IRoute[]
  unauthorized: IRoute[]
  navigation: INavLink[]
}

export const useRoutes = (): IUseAppRoutesOut => {
  const { user } = useAuth()

  const routes: IUseAppRoutesOut = useMemo((): IUseAppRoutesOut => {
    const authorized: IRoute[] = AUTHORIZED_ROUTE_CONFIG.filter(
      ({ restrictedFor = [] }: IRoute): boolean => !restrictedFor.includes(user?.role),
    )
    const navigation: INavLink[] = AUTHORIZED_NAVIGATION.filter(
      ({ restrictedFor = [] }: INavLink): boolean => !restrictedFor.includes(user?.role),
    )
    return {
      navigation,
      authorized,
      unauthorized: UNAUTHORIZED_ROUTE_CONFIG,
    }
  }, [user])

  return routes
}
