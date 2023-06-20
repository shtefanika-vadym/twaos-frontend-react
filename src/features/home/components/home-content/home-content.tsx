import { useState } from 'react'

import { Box, Button, Flex, Group, LoadingOverlay, Menu, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconFileAnalytics } from '@tabler/icons-react'
import { MantineReactTable } from 'mantine-react-table'

import { useApiResponse, useAuth } from 'app/hooks'
import { HomeApproveCertificate } from 'features/home/components/home-approve-certificate/home-approve-certificate'

import { Show } from 'common/components'
import { BUTTON_CONSTANTS, STATUS_CONSTANTS, USER_ROLES } from 'common/constants'
import type { ApiResponse, IRequestResponse, ITriggerRequest } from 'common/interfaces'

import { HomeCreateCertificate } from 'features/home/components/home-create-certificate/home-create-certificate'
import { HomeDownloadPdf } from 'features/home/components/home-download-pdf/home-download-pdf'
import { HomeRejectCertificate } from 'features/home/components/home-reject-certificate/home-reject-certificate'
import { HOME_SECRETARY_COLUMNS, HOME_STUDENT_COLUMNS } from 'features/home/constants/home-columns'
import { HOME_CONSTANTS } from 'features/home/constants/home.constants'
import type { ICertificate } from 'features/home/interfaces/certificate.interface'
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
  const [rejectCertificateId, setRejectCertificateId] = useState<number>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [approveCertificateId, setApproveCertificateId] = useState<number>(null)
  const [openedCreate, { open: openCreateModal, close: closeCreateModal }] = useDisclosure(false)
  const { data: certificates = [], isFetching }: IRequestResponse<ICertificate[]> =
    useFetchCertificatesQuery()

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
      id: rejectCertificateId,
      ...values,
    })
    processApiResponse(response, {
      success: 'Certificate rejected',
      successCallback: (): void => {
        setRejectCertificateId(null)
        reset()
      },
    })
  }

  const handleApprove = async (
    values: IHomeManageCertificate,
    reset: () => void,
  ): Promise<void> => {
    const response: ApiResponse = await approveCertificate({
      id: approveCertificateId,
      ...values,
    })
    processApiResponse(response, {
      success: 'Certificate approved',
      successCallback: (): void => {
        setApproveCertificateId(null)
        reset()
      },
    })
  }

  return (
    <Flex w='100%' gap={10} direction='column'>
      <HomeCreateCertificate
        opened={openedCreate}
        isCreating={isCreating}
        close={closeCreateModal}
        handleSubmit={handleCreate}
      />
      <HomeRejectCertificate
        isLoading={isRejecting}
        handleReject={handleReject}
        isOpen={!!rejectCertificateId}
        handleClose={() => setRejectCertificateId(null)}
      />
      <HomeApproveCertificate
        isLoading={isApproving}
        handleApprove={handleApprove}
        isOpen={!!approveCertificateId}
        handleClose={() => setApproveCertificateId(null)}
      />
      <Title order={1}>{HOME_CONSTANTS.TITLE}</Title>
      <Box pos='relative'>
        <LoadingOverlay overlayBlur={2} visible={isFetching || isCreating} />
        <MantineReactTable
          enableRowActions={user.role === USER_ROLES.SECRETARY}
          columns={
            user.role === USER_ROLES.STUDENT
              ? (HOME_STUDENT_COLUMNS as any)
              : HOME_SECRETARY_COLUMNS
          }
          data={certificates}
          renderRowActionMenuItems={({ row }): [JSX.Element, JSX.Element] => {
            const rowData: ICertificate = row.original
            return [
              <Menu.Item
                key={rowData.id}
                onClick={() => setApproveCertificateId(rowData.id)}
                disabled={rowData.status !== STATUS_CONSTANTS.PENDING}>
                {BUTTON_CONSTANTS.APPROVE}
              </Menu.Item>,
              <Menu.Item
                key={rowData.id}
                onClick={() => setRejectCertificateId(rowData.id)}
                disabled={rowData.status !== STATUS_CONSTANTS.PENDING}>
                {BUTTON_CONSTANTS.REJECT}
              </Menu.Item>,
            ]
          }}
          renderTopToolbarCustomActions={() => (
            <>
              <Show when={user.role === USER_ROLES.STUDENT}>
                <Button color='teal' onClick={openCreateModal} variant='filled'>
                  <Group>
                    <IconFileAnalytics size='1rem' />
                    {HOME_CONSTANTS.CREATE_CERTIFICATE}
                  </Group>
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
      </Box>
    </Flex>
  )
}
