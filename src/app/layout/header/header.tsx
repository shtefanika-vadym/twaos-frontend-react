import { NavLink, useLocation } from 'react-router-dom'

import { Button, Container, Group } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'

import { LINKS } from 'app/layout/header/links'

import logo from 'common/assets/logo.png'

import { ALT_CONSTANTS } from 'common/constants'

import { useHeaderStyles } from './header-styles'

export function Header() {
  const { pathname } = useLocation()
  const { classes: styles, cx: classNames } = useHeaderStyles()

  return (
    <Container className={styles.header}>
      <img className={styles.logo} src={logo} alt={ALT_CONSTANTS.LOGO} />
      <Group spacing={5} className={styles.links}>
        {LINKS.map(({ label, link }) => (
          <NavLink
            key={label}
            to={link}
            className={classNames(styles.link, { [styles.linkActive]: pathname === link })}>
            {label}
          </NavLink>
        ))}
      </Group>
      <Button variant='white'>
        <IconLogout className={styles.logout} size='1.2rem' stroke={1.5} />
        Logout
      </Button>
    </Container>
  )
}
