import type { FC } from 'react'

import { Anchor, Tooltip } from '@mantine/core'
import axios from 'axios'

import { useAuth } from 'app/hooks'

import { HOME_CONSTANTS } from 'features/home/constants/home.constants'

interface IProps {
  route: string
  value: string | null
}

export const HomeDownloadPdf: FC<IProps> = ({ route, value }) => {
  const { user } = useAuth()
  if (!value) return null

  const download = async (): Promise<void> => {
    try {
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

      link.setAttribute('download', `${value}.pdf`)

      document.body.appendChild(link)
      link.click()

      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading PDF:', error)
    }
  }

  return (
    <Tooltip label={HOME_CONSTANTS.DOWNLOAD_CERTIFICATE}>
      <Anchor onClick={download}>{value}</Anchor>
    </Tooltip>
  )
}
