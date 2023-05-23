import { Box, Button } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconUpload } from '@tabler/icons-react'

import { useApiResponse } from 'app/hooks'

import type { ApiResponse } from 'common/interfaces'

import { UsersUploadForm } from 'features/users/components/users-upload-form/users-upload-form'
import { USERS_CONSTANTS } from 'features/users/constants/users.constants'
import type { IUsersUpload } from 'features/users/schemas/user-upload.schema'
import { useUpdateAllUsersMutation } from 'features/users/store/api/users.api'

export const UsersUpload = () => {
  const { processApiResponse } = useApiResponse()
  const [updateUsers] = useUpdateAllUsersMutation()

  const handleUploadUsers = async (data: IUsersUpload): Promise<void> => {
    const { concatenateName, facultyName, usersFile, secretariesFile } = data
    const formData = new FormData()
    formData.append('files', usersFile as any)
    formData.append('files', secretariesFile as any)
    formData.append('facultyName', facultyName)
    formData.append('concatenateName', String(concatenateName))

    const response: ApiResponse = await updateUsers(formData)
    processApiResponse(response, {
      success: 'Users updated',
      successCallback: () => {
        modals.close('upload-users-modal')
      },
    })
  }

  const openDeleteModal = (): void => {
    modals.openConfirmModal({
      size: 'lg',
      radius: 'md',
      modalId: 'upload-users-modal',
      title: USERS_CONSTANTS.UPDATE_USERS,
      children: <UsersUploadForm handleSubmit={handleUploadUsers} />,
      labels: {
        confirm: USERS_CONSTANTS.UPDATE,
        cancel: USERS_CONSTANTS.UPDATE_USERS_CANCEL,
      },
      closeOnConfirm: false,
      confirmProps: { color: 'teal', type: 'submit', form: 'upload-users' },
    })
  }

  return (
    <Box w={150}>
      <Button fullWidth onClick={openDeleteModal} variant='filled' color='teal'>
        <IconUpload size='1rem' />
        {USERS_CONSTANTS.UPDATE_USERS}
      </Button>
    </Box>
  )
}
