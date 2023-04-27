import type { FC } from 'react'
import type { FileWithPath } from 'react-dropzone'

import { Checkbox, Group, rem, Text } from '@mantine/core'
import { Dropzone, MS_EXCEL_MIME_TYPE } from '@mantine/dropzone'
import { useForm } from '@mantine/form'
import { IconPhoto } from '@tabler/icons-react'

import { Show } from 'common/components'
import { RESPONSE_PROPERTY } from 'common/constants'
import { useNotification } from 'common/hooks'
import { Utils } from 'common/utils'

import { USERS_FORM_KEYS_CONSTANTS } from 'features/users/constants/users-form-keys.constants'
import { USERS_UPLOAD_INIT_VALUES } from 'features/users/constants/users-upload-form-value'
import { USERS_CONSTANTS } from 'features/users/constants/users.constants'
import type { IUsersUpload } from 'features/users/schemas/user-upload.schema'
import { USERS_UPLOAD_SCHEMA } from 'features/users/schemas/user-upload.schema'

interface IProps {
  handleSubmit: (values: IUsersUpload) => void
}

export const UsersUploadForm: FC<IProps> = ({ handleSubmit }) => {
  const { showNotification } = useNotification()
  const form = useForm({
    initialValues: USERS_UPLOAD_INIT_VALUES,
    validate: (values: IUsersUpload) => Utils.validateZodSchema(USERS_UPLOAD_SCHEMA, values),
  })

  const handleRejectUpload = (): void => {
    showNotification({
      title: USERS_CONSTANTS.UPLOAD_ERROR,
      message: USERS_CONSTANTS.UPLOAD_ERROR,
      type: RESPONSE_PROPERTY.ERROR,
    })
  }

  const handleDropFile = (files: FileWithPath[]): void => {
    showNotification({
      title: USERS_CONSTANTS.UPLOAD_SUCCESS,
      message: USERS_CONSTANTS.UPLOAD_SUCCESS,
      type: RESPONSE_PROPERTY.SUCCESS,
    })
    form.setFieldValue(USERS_FORM_KEYS_CONSTANTS.USERS_FILE, files.at(0))
  }

  return (
    <form id='upload-users' onSubmit={form.onSubmit(handleSubmit)}>
      <Group position='left' mt='xl' mb='xl'>
        <Text color='green' size='sm' inline>
          {USERS_CONSTANTS.UPLOAD_INFO}
        </Text>
        <Dropzone
          multiple={false}
          onDrop={handleDropFile}
          onReject={handleRejectUpload}
          maxSize={3 * 1024 ** 2}
          accept={MS_EXCEL_MIME_TYPE}>
          <Group
            position='center'
            spacing='sm'
            style={{ minHeight: rem(40), pointerEvents: 'none' }}>
            <Dropzone.Idle>
              <IconPhoto size='3.2rem' stroke={1.5} />
            </Dropzone.Idle>
            <Text size='lg' inline>
              {USERS_CONSTANTS.DRAG_USERS}
            </Text>
          </Group>
        </Dropzone>
        <Show when={form.errors?.usersFile}>
          <Text color='red' size='sm' inline>
            {form.errors?.usersFile}
          </Text>
        </Show>
        <Checkbox
          label={USERS_CONSTANTS.CONCATENATE_Q}
          {...form.getInputProps(USERS_FORM_KEYS_CONSTANTS.CONCATENATE_NAME)}
        />
      </Group>
    </form>
  )
}
