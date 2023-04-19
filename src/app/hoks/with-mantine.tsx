import type { ComponentType, FC } from 'react'

import { MantineProvider } from '@mantine/core'

export const withMantine = <T extends object>(Component: ComponentType<T>): FC<T> => {
  const WithMantineWrapper: FC<T> = (props) => {
    return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Component {...props} />
      </MantineProvider>
    )
  }

  return WithMantineWrapper
}
