import type { FC } from 'react'

import { Button, Checkbox, Group, Modal, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'

import { Show } from 'common/components'
import { Utils } from 'common/utils'

import { HOME_FORM_KEYS_CONSTANTS } from 'features/home/constants/home-form-keys.constants'
import { HOME_MANAGE_CERTIFICATE_INIT_VALUE } from 'features/home/constants/home-form-value'
import { HOME_CONSTANTS } from 'features/home/constants/home.constants'
import type { IManageCertificate } from 'features/home/interfaces/certificate.interface'
import type { IHomeManageCertificate } from 'features/home/schemas/home-manage-certificate.schema'
import { HOME_MANAGE_CERTIFICATE_SCHEMA } from 'features/home/schemas/home-manage-certificate.schema'

interface IProps {
  isLoading: boolean
  onClose: () => void
  certificate: IManageCertificate
  handleReject: (values: IHomeManageCertificate, reset: () => void) => void
  handleApprove: (values: IHomeManageCertificate, reset: () => void) => void
}

export const HomeManageCertificate: FC<IProps> = ({
  isLoading,
  onClose,
  certificate,
  handleApprove,
  handleReject,
}) => {
  const form = useForm({
    initialValues: HOME_MANAGE_CERTIFICATE_INIT_VALUE,
    validate: (values: IHomeManageCertificate) =>
      Utils.validateZodSchema(HOME_MANAGE_CERTIFICATE_SCHEMA, values),
  })

  const isApprove: boolean = certificate?.type === 'approve'

  return (
    <Modal
      radius='md'
      onClose={onClose}
      opened={Boolean(certificate)}
      title={isApprove ? HOME_CONSTANTS.APPROVE_CERTIFICATE : HOME_CONSTANTS.REJECT_CERTIFICATE}>
      <form
        onSubmit={form.onSubmit(
          (): void =>
            isApprove
              ? handleApprove(form.values, form.reset)
              : handleReject(form.values, form.reset),
          close,
        )}>
        <Show when={!isApprove}>
          <Textarea
            mb='sm'
            required
            autosize
            radius='md'
            label={HOME_CONSTANTS.REJECT_REASON}
            placeholder={HOME_CONSTANTS.REJECT_REASON_PLACEHOLDER}
            {...form.getInputProps(HOME_FORM_KEYS_CONSTANTS.REJECT_REASON)}
          />
        </Show>

        <Checkbox
          label={HOME_CONSTANTS.NOTIFY_USER}
          {...form.getInputProps(HOME_FORM_KEYS_CONSTANTS.NOTIFY_USER)}
        />

        <Group position='right' mt='xl'>
          <Button onClick={onClose} radius='md' variant='outline'>
            {HOME_CONSTANTS.CLOSE}
          </Button>
          <Button radius='md' type='submit' loading={isLoading} color={isApprove ? 'green' : 'red'}>
            {isApprove ? HOME_CONSTANTS.APPROVE : HOME_CONSTANTS.REJECT}
          </Button>
        </Group>
      </form>
    </Modal>
  )
}
