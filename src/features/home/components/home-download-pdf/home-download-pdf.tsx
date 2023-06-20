import type { FC } from 'react'
import { useToggle } from 'react-use'

import { Anchor, Button, Group, Tooltip } from '@mantine/core'
import { IconFileAnalytics } from '@tabler/icons-react'
import axios from 'axios'

import { useAuth } from 'app/hooks'

import { Show } from 'common/components'

import { HOME_CONSTANTS } from 'features/home/constants/home.constants'

interface IProps {
  route: string
  value: string | null
  type?: 'anchor' | 'button'
}

export const HomeDownloadPdf: FC<IProps> = ({ type = 'anchor', route, value }) => {
  const { user } = useAuth()
  const [isLoading, toggleIsLoading] = useToggle(false)

  if (!value) return null

  const download = async (): Promise<void> => {
    try {
      toggleIsLoading()
      const response = await axios({
        url: route,
        responseType: 'arraybuffer',
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
          'Content-Type': 'application/pdf',
          Accept: 'application/pdf',
          Authorization: `Bearer ${user?.token}`,
        },
      })

      const url: string = window.URL.createObjectURL(new Blob([response.data]))

      const link: HTMLAnchorElement = document.createElement('a')
      link.href = url

      link.setAttribute('download', `${type === 'button' ? 'monthly-report' : value}.pdf`)

      document.body.appendChild(link)
      link.click()

      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading PDF:', error)
    } finally {
      toggleIsLoading()
    }
  }

  return (
    <>
      <Show
        when={type === 'anchor'}
        fallback={
          <Button loading={isLoading} color='teal' onClick={download} variant='filled'>
            <Group>
              <IconFileAnalytics size='1rem' />
              {value}
            </Group>
          </Button>
        }>
        <Tooltip label={HOME_CONSTANTS.DOWNLOAD_CERTIFICATE}>
          <Anchor onClick={download}>{value}</Anchor>
        </Tooltip>
      </Show>
    </>
  )
}
