import type { FC } from 'react'

import { Box, Button, Checkbox, Group, LoadingOverlay, Modal, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'

import { BUTTON_CONSTANTS } from 'common/constants'
import { Utils } from 'common/utils'

import { HOME_FORM_KEYS_CONSTANTS } from 'features/home/constants/home-form-keys.constants'
import { HOME_MANAGE_CERTIFICATE_INIT_VALUE } from 'features/home/constants/home-form-value'
import { HOME_CONSTANTS } from 'features/home/constants/home.constants'
import type { IHomeManageCertificate } from 'features/home/schemas/home-manage-certificate.schema'
import { HOME_MANAGE_CERTIFICATE_SCHEMA } from 'features/home/schemas/home-manage-certificate.schema'

interface IProps {
  isOpen: boolean
  isLoading: boolean
  handleClose: () => void
  handleReject: (values: IHomeManageCertificate, reset: () => void) => void
}

export const HomeRejectCertificate: FC<IProps> = ({
  isLoading,
  isOpen,
  handleClose: onClose,
  handleReject,
}) => {
  const form = useForm({
    initialValues: HOME_MANAGE_CERTIFICATE_INIT_VALUE,
    validate: (values: IHomeManageCertificate) =>
      Utils.validateZodSchema(HOME_MANAGE_CERTIFICATE_SCHEMA, values),
  })

  const handleSubmit = (): void => {
    handleReject(form.values, form.reset)
  }

  const handleClose = (): void => {
    onClose()
    form.reset()
  }

  return (
    <Modal
      radius='md'
      zIndex={500}
      opened={isOpen}
      onClose={handleClose}
      title={HOME_CONSTANTS.REJECT_CERTIFICATE}>
      <Box pos='relative'>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Textarea
            mb='sm'
            required
            autosize
            radius='md'
            label={HOME_CONSTANTS.REJECT_REASON}
            placeholder={HOME_CONSTANTS.REJECT_REASON_PLACEHOLDER}
            {...form.getInputProps(HOME_FORM_KEYS_CONSTANTS.REJECT_REASON)}
          />

          <Checkbox
            label={HOME_CONSTANTS.NOTIFY_USER}
            {...form.getInputProps(HOME_FORM_KEYS_CONSTANTS.NOTIFY_USER)}
          />

          <Group position='right' mt='xl'>
            <Button onClick={handleClose} radius='md' variant='outline'>
              {BUTTON_CONSTANTS.CLOSE}
            </Button>
            <Button radius='md' type='submit' color='red'>
              {BUTTON_CONSTANTS.REJECT}
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  )
}
