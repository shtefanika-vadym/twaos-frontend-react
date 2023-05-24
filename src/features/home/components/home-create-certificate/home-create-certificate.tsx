import type { FC } from 'react'

import { Button, Group, Modal, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'

import { Utils } from 'common/utils'

import { HOME_FORM_KEYS_CONSTANTS } from 'features/home/constants/home-form-keys.constants'
import { HOME_CERTIFICATE_INIT_VALUE } from 'features/home/constants/home-form-value'
import { HOME_CONSTANTS } from 'features/home/constants/home.constants'
import type { IHomeCertificate } from 'features/home/schemas/home-create-certificate.schema'
import { HOME_CERTIFICATE_SCHEMA } from 'features/home/schemas/home-create-certificate.schema'

interface IProps {
  opened: boolean
  close: () => void
  isLoading: boolean
  handleSubmit: (values: IHomeCertificate, reset: () => void) => void
}

export const HomeCreateCertificate: FC<IProps> = ({ opened, close, isLoading, handleSubmit }) => {
  const form = useForm({
    initialValues: HOME_CERTIFICATE_INIT_VALUE,
    validate: (values: IHomeCertificate) =>
      Utils.validateZodSchema(HOME_CERTIFICATE_SCHEMA, values),
  })
  return (
    <Modal radius='md' opened={opened} onClose={close} title={HOME_CONSTANTS.CREATE_CERTIFICATE}>
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
            {HOME_CONSTANTS.CLOSE}
          </Button>
          <Button loading={isLoading} type='submit' radius='md'>
            {HOME_CONSTANTS.CREATE}
          </Button>
        </Group>
      </form>
    </Modal>
  )
}
