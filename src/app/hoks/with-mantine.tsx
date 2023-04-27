import type { ComponentType, FC } from 'react'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'

export const withMantine = <T extends object>(Component: ComponentType<T>): FC<T> => {
  const WithMantineWrapper: FC<T> = (props: T) => {
    return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications />
        <ModalsProvider>
          <Component {...props} />
        </ModalsProvider>
      </MantineProvider>
    )
  }

  return WithMantineWrapper
}
