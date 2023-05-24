import type { FC } from 'react'
import type { FileWithPath } from 'react-dropzone'

import { Checkbox, Flex, Group, rem, Text, TextInput, Title } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { useForm } from '@mantine/form'
import { IconAlignJustified, IconPhoto } from '@tabler/icons-react'

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

  const handleShowSuccessUpload = (): void => {
    showNotification({
      title: USERS_CONSTANTS.UPLOAD_SUCCESS,
      message: USERS_CONSTANTS.UPLOAD_SUCCESS,
      type: RESPONSE_PROPERTY.SUCCESS,
    })
  }

  const handleDropStudentsFile = (files: FileWithPath[]): void => {
    handleShowSuccessUpload()
    form.setFieldValue(USERS_FORM_KEYS_CONSTANTS.USERS_FILE, files.at(0))
  }

  const handleDropSecretariesFile = (files: FileWithPath[]): void => {
    handleShowSuccessUpload()
    form.setFieldValue(USERS_FORM_KEYS_CONSTANTS.SECRETARIES_FILE, files.at(0))
  }

  return (
    <form id='upload-users' onSubmit={form.onSubmit(handleSubmit)}>
      <Flex w='100%' direction='column' rowGap='lg' mt='sm' mb='xl'>
        <Text color='green' size='sm' inline>
          {USERS_CONSTANTS.UPLOAD_INFO}
        </Text>
        <Flex direction='column' rowGap='sm'>
          <Title order={4}>{USERS_CONSTANTS.UPLOAD_STUDENTS}</Title>
          <Dropzone
            multiple={false}
            onDrop={handleDropStudentsFile}
            onReject={handleRejectUpload}
            maxSize={3 * 1024 ** 2}
            accept={['text/csv']}>
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
          <Show when={form.values?.usersFile}>
            <Text color='blue' size='sm' inline>
              {form.values?.usersFile?.name}
            </Text>
          </Show>
        </Flex>

        <Flex direction='column' rowGap='sm'>
          <Title order={4}>{USERS_CONSTANTS.UPLOAD_SECRETARIES}</Title>
          <Dropzone
            multiple={false}
            onDrop={handleDropSecretariesFile}
            onReject={handleRejectUpload}
            maxSize={3 * 1024 ** 2}
            accept={['text/csv']}>
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
          <Show when={form.errors?.secretariesFile}>
            <Text color='red' size='sm' inline>
              {form.errors?.secretariesFile}
            </Text>
          </Show>
          <Show when={form.values?.secretariesFile}>
            <Text color='blue' size='sm' inline>
              {form.values?.secretariesFile?.name}
            </Text>
          </Show>
        </Flex>
        <Flex w='100%' rowGap='sm'>
          <TextInput
            style={{ width: 'inherit' }}
            label={USERS_CONSTANTS.FACULTY}
            icon={<IconAlignJustified size='1rem' />}
            placeholder={USERS_CONSTANTS.FACULTY_PLACEHOLDER}
            {...form.getInputProps(USERS_FORM_KEYS_CONSTANTS.FACULTY_NAME)}
          />
          <Show when={form.errors?.faculyName}>
            <Text color='red' size='sm' inline>
              {form.errors?.faculyName}
            </Text>
          </Show>
        </Flex>

        <Checkbox
          label={USERS_CONSTANTS.CONCATENATE}
          {...form.getInputProps(USERS_FORM_KEYS_CONSTANTS.CONCATENATE_NAME)}
        />
      </Flex>
    </form>
  )
}
