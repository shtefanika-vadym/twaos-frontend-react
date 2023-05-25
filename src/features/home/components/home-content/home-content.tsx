import { useState } from 'react'

import { Button, Flex, Menu, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconFileAnalytics } from '@tabler/icons-react'
import { MantineReactTable } from 'mantine-react-table'
import { nanoid } from 'nanoid'

import { useApiResponse, useAuth } from 'app/hooks'

import { Show } from 'common/components'
import { USER_ROLES } from 'common/constants'
import type { ApiResponse, IRequestResponse, ITriggerRequest } from 'common/interfaces'

import { HomeCreateCertificate } from 'features/home/components/home-create-certificate/home-create-certificate'
import { HomeDownloadPdf } from 'features/home/components/home-download-pdf/home-download-pdf'
import { HomeManageCertificate } from 'features/home/components/home-manage-certificate/home-manage-certificate'
import { HOME_SECRETARY_COLUMNS, HOME_STUDENT_COLUMNS } from 'features/home/constants/home-columns'
import { HOME_CONSTANTS } from 'features/home/constants/home.constants'
import type { ICertificate } from 'features/home/interfaces/certificate.interface'
import type { IManageCertificate } from 'features/home/interfaces/certificate.interface'
import type { IHomeCertificate } from 'features/home/schemas/home-create-certificate.schema'
import type { IHomeManageCertificate } from 'features/home/schemas/home-manage-certificate.schema'
import {
  useApproveCertificateMutation,
  useCreateCertificateMutation,
  useFetchCertificatesQuery,
  useRejectCertificateMutation,
} from 'features/home/store/api/home.api'

export const HomeContent = () => {
  const { user } = useAuth()
  const { processApiResponse } = useApiResponse()
  const [selectedCertification, setSelectedCertification] = useState<IManageCertificate>(null)
  const [openedCreate, { open: openCreateModal, close: closeCreateModal }] = useDisclosure(false)
  const { data: certificates = [] }: IRequestResponse<ICertificate[]> = useFetchCertificatesQuery()

  const [createCertificate, { isLoading: isCreating }]: ITriggerRequest =
    useCreateCertificateMutation()

  const [approveCertificate, { isLoading: isApproving }]: ITriggerRequest =
    useApproveCertificateMutation()

  const [rejectCertificate, { isLoading: isRejecting }]: ITriggerRequest =
    useRejectCertificateMutation()

  const handleCreate = async (values: IHomeCertificate, reset: () => void): Promise<void> => {
    const response: ApiResponse = await createCertificate(values)
    processApiResponse(response, {
      success: 'Certificate created',
      successCallback: (): void => {
        reset()
        closeCreateModal()
      },
    })
  }

  const handleReject = async (values: IHomeManageCertificate, reset: () => void): Promise<void> => {
    const response: ApiResponse = await rejectCertificate({
      id: selectedCertification.id,
      ...values,
    })
    processApiResponse(response, {
      success: 'Certificate rejected',
      successCallback: (): void => {
        setSelectedCertification(null)
        reset()
      },
    })
  }

  const handleApprove = async (
    values: IHomeManageCertificate,
    reset: () => void,
  ): Promise<void> => {
    const response: ApiResponse = await approveCertificate({
      id: selectedCertification.id,
      ...values,
    })
    processApiResponse(response, {
      success: 'Certificate approved',
      successCallback: (): void => {
        setSelectedCertification(null)
        reset()
      },
    })
  }

  return (
    <Flex w='100%' gap={10} direction='column'>
      <HomeCreateCertificate
        opened={openedCreate}
        isLoading={isCreating}
        close={closeCreateModal}
        handleSubmit={handleCreate}
      />
      <Title order={1}>{HOME_CONSTANTS.TITLE}</Title>
      <HomeManageCertificate
        handleReject={handleReject}
        handleApprove={handleApprove}
        certificate={selectedCertification}
        isLoading={isApproving || isRejecting}
        onClose={() => setSelectedCertification(null)}
      />
      <MantineReactTable
        enableRowActions={user.role === USER_ROLES.SECRETARY}
        columns={
          user.role === USER_ROLES.STUDENT ? (HOME_STUDENT_COLUMNS as any) : HOME_SECRETARY_COLUMNS
        }
        data={certificates}
        renderRowActionMenuItems={({ row }): [JSX.Element, JSX.Element] => {
          const rowData: ICertificate = row.original
          return [
            <Menu.Item
              key={nanoid()}
              disabled={rowData.status !== HOME_CONSTANTS.IN_PROGRESS}
              onClick={() => setSelectedCertification({ id: rowData.id, type: 'approve' })}>
              {HOME_CONSTANTS.APPROVE}
            </Menu.Item>,
            <Menu.Item
              key={nanoid()}
              disabled={rowData.status !== HOME_CONSTANTS.IN_PROGRESS}
              onClick={() => setSelectedCertification({ id: rowData.id, type: 'reject' })}>
              {HOME_CONSTANTS.REJECT}
            </Menu.Item>,
          ]
        }}
        renderTopToolbarCustomActions={() => (
          <>
            <Show when={user.role === USER_ROLES.STUDENT}>
              <Button color='teal' onClick={openCreateModal} variant='filled'>
                <IconFileAnalytics size='1rem' />
                {HOME_CONSTANTS.CREATE_CERTIFICATE}
              </Button>
            </Show>
            <Show when={user.role === USER_ROLES.SECRETARY}>
              <HomeDownloadPdf
                type='button'
                route='certificates/report'
                value={HOME_CONSTANTS.DOWNLOAD_MONTHLY_REPORT}
              />
            </Show>
          </>
        )}
      />
    </Flex>
  )
}
