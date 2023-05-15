import { Box, Button } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconUpload } from '@tabler/icons-react'

import { UsersUploadForm } from 'features/users/components/users-upload-form/users-upload-form'
import { USERS_CONSTANTS } from 'features/users/constants/users.constants'
import type { IUsersUpload } from 'features/users/schemas/user-upload.schema'

export const UsersUpload = () => {
  const handleUploadUsers = (data: IUsersUpload): void => {
    console.info(data)
    modals.close('upload-users-modal')
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
