import type { FC } from 'react'

import { Box, Button, Group, LoadingOverlay, Modal, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'

import { BUTTON_CONSTANTS } from 'common/constants'
import { Utils } from 'common/utils'

import { HOME_FORM_KEYS_CONSTANTS } from 'features/home/constants/home-form-keys.constants'
import { HOME_CERTIFICATE_INIT_VALUE } from 'features/home/constants/home-form-value'
import { HOME_CONSTANTS } from 'features/home/constants/home.constants'
import type { IHomeCertificate } from 'features/home/schemas/home-create-certificate.schema'
import { HOME_CERTIFICATE_SCHEMA } from 'features/home/schemas/home-create-certificate.schema'

interface IProps {
  opened: boolean
  close: () => void
  isCreating: boolean
  handleSubmit: (values: IHomeCertificate, reset: () => void) => void
}

export const HomeCreateCertificate: FC<IProps> = ({ opened, close, isCreating, handleSubmit }) => {
  const form = useForm({
    initialValues: HOME_CERTIFICATE_INIT_VALUE,
    validate: (values: IHomeCertificate) =>
      Utils.validateZodSchema(HOME_CERTIFICATE_SCHEMA, values),
  })
  return (
    <Modal
      radius='md'
      zIndex={500}
      opened={opened}
      onClose={close}
      title={HOME_CONSTANTS.CREATE_CERTIFICATE}>
      <Box pos='relative'>
        <LoadingOverlay visible={isCreating} overlayBlur={1} />
        <form onSubmit={form.onSubmit(() => handleSubmit(form.values, form.reset))}>
          <Textarea
            required
            autosize
            radius='md'
            label={HOME_CONSTANTS.REASON}
            placeholder={HOME_CONSTANTS.REASON_PLACEHOLDER}
            {...form.getInputProps(HOME_FORM_KEYS_CONSTANTS.REASON)}
          />
          <Group position='right' mt='xl'>
            <Button onClick={close} radius='md' variant='outline'>
              {BUTTON_CONSTANTS.CLOSE}
            </Button>
            <Button type='submit' radius='md'>
              {BUTTON_CONSTANTS.CREATE}
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  )
}
