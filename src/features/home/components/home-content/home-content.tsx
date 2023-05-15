import { useMemo } from 'react'

import { Button, Flex, Group, Modal, Textarea, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { IconFileAnalytics } from '@tabler/icons-react'
import { MantineReactTable } from 'mantine-react-table'

import { useAuth } from 'app/hooks'

import { Show } from 'common/components'
import { USER_ROLES } from 'common/constants'
import { Utils } from 'common/utils'

import type { IHomeCertificate } from 'features/home/components/schemas/home.schema'
import { HOME_CERTIFICATE_SCHEMA } from 'features/home/components/schemas/home.schema'
import { HOME_CERTIFICATE_INIT_VALUE } from 'features/home/constants/home-form-value'
import { HOME_CONSTANTS } from 'features/home/constants/home.constants'

export const HomeContent = () => {
  const { user } = useAuth()
  const [opened, { open, close }] = useDisclosure(false)

  const form = useForm({
    initialValues: HOME_CERTIFICATE_INIT_VALUE,
    validate: (values: IHomeCertificate) =>
      Utils.validateZodSchema(HOME_CERTIFICATE_SCHEMA, values),
  })

  const data = [
    {
      id: 'test',
      status: 'confirmed',
      date: 'test',
      reason: 'Pentru Test',
    },
  ]

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'date',
        header: 'Date',
      },
      {
        accessorKey: 'reason',
        header: 'Reason',
      },
    ],
    [],
  )

  const handleSubmit = (values: IHomeCertificate): void => {
    console.info(values)
  }

  return (
    <Flex w='100%' gap={10} direction='column'>
      <Modal radius='md' opened={opened} onClose={close} title={HOME_CONSTANTS.CREATE_CERTIFICATE}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Textarea
            required
            autosize
            radius='md'
            label={HOME_CONSTANTS.REASON}
            {...form.getInputProps('reason')}
            placeholder={HOME_CONSTANTS.REASON_PLACEHOLDER}
          />
          <Group position='right' mt='xl'>
            <Button type='submit' radius='md'>
              {HOME_CONSTANTS.CREATE}
            </Button>
          </Group>
        </form>
      </Modal>
      <Title order={1}>{HOME_CONSTANTS.TITLE}</Title>
      <MantineReactTable
        columns={columns as any}
        data={data}
        renderTopToolbarCustomActions={() => (
          <Show when={user.role === USER_ROLES.STUDENT}>
            <Button color='teal' onClick={open} variant='filled'>
              <IconFileAnalytics size='1rem' />
              {HOME_CONSTANTS.CREATE_CERTIFICATE}
            </Button>
          </Show>
        )}
      />
    </Flex>
  )
}
