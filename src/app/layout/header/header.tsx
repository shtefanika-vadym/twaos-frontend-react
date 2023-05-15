import { NavLink, useLocation } from 'react-router-dom'

import { Button, Group } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'

import { useAuth } from 'app/hooks'
import { useRoutes } from 'app/hooks/use-routes'

import logo from 'common/assets/logo.png'

import { ALT_CONSTANTS } from 'common/constants'
import type { INavLink } from 'common/interfaces'

import { useHeaderStyles } from './header-styles'

export function Header() {
  const { handleLogout } = useAuth()
  const { pathname } = useLocation()
  const { navigation } = useRoutes()
  const { classes: styles, cx: classNames } = useHeaderStyles()

  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logo} alt={ALT_CONSTANTS.LOGO} />
      <Group spacing={5} className={styles.links}>
        {navigation.map(({ label, link }: INavLink) => (
          <NavLink
            to={link}
            key={label}
            className={classNames(styles.link, { [styles.linkActive]: pathname === link })}>
            {label}
          </NavLink>
        ))}
      </Group>
      <Button onClick={handleLogout} variant='white'>
        <IconLogout className={styles.logout} size='1.2rem' stroke={1.5} />
        Logout
      </Button>
    </header>
  )
}
