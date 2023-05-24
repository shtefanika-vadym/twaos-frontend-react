import { Box, Button, Flex, Group, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconUpload } from '@tabler/icons-react'

import { useApiResponse } from 'app/hooks'

import type { ApiResponse, ITriggerRequest } from 'common/interfaces'

import { UsersUploadForm } from 'features/users/components/users-upload-form/users-upload-form'
import { USERS_CONSTANTS } from 'features/users/constants/users.constants'
import type { IUsersUpload } from 'features/users/schemas/user-upload.schema'
import { useUpdateAllUsersMutation } from 'features/users/store/api/users.api'

export const UsersUpload = () => {
  const { processApiResponse } = useApiResponse()
  const [updateUsers, { isLoading }]: ITriggerRequest = useUpdateAllUsersMutation()
  const [opened, { open, close }] = useDisclosure(false)

  const handleUploadUsers = async (data: IUsersUpload): Promise<void> => {
    const { concatenateName, facultyName, usersFile, secretariesFile } = data
    const formData = new FormData()
    formData.append('files', secretariesFile as any)
    formData.append('files', usersFile as any)
    formData.append('facultyName', facultyName)
    formData.append('concatenateName', String(concatenateName))

    const response: ApiResponse = await updateUsers(formData)
    processApiResponse(response, {
      success: 'Users updated',
      successCallback: () => {
        close()
      },
    })
  }

  return (
    <Box w={150}>
      <Modal
        size='lg'
        radius='md'
        opened={opened}
        onClose={close}
        title={USERS_CONSTANTS.UPDATE_USERS}
        centered>
        <UsersUploadForm handleSubmit={handleUploadUsers} />
        <Flex justify='end'>
          <Group mt='sm'>
            <Button variant='outline' onClick={close}>
              {USERS_CONSTANTS.UPDATE_USERS_CANCEL}
            </Button>
            <Button color='red' type='submit' loading={isLoading} form='upload-users'>
              {USERS_CONSTANTS.UPDATE}
            </Button>
          </Group>
        </Flex>
      </Modal>
      <Button fullWidth onClick={open} variant='filled' color='teal'>
        <IconUpload size='1rem' />
        {USERS_CONSTANTS.UPDATE_USERS}
      </Button>
    </Box>
  )
}
