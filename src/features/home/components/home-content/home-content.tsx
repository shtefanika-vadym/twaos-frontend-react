import { useMemo } from 'react'

import { Button, Container, Flex, Group, Modal, Textarea, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { IconFileAnalytics } from '@tabler/icons-react'
import { MantineReactTable } from 'mantine-react-table'

import { Utils } from 'common/utils'

import type { IHomeCertificate } from 'features/home/components/schemas/home.schema'
import { HOME_CERTIFICATE_SCHEMA } from 'features/home/components/schemas/home.schema'
import { HOME_CERTIFICATE_INIT_VALUE } from 'features/home/constants/home-form-value'
import { HOME_CONSTANTS } from 'features/home/constants/home.constants'

export const HomeContent = () => {
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
    <Container>
      <Flex gap={10} direction='column'>
        <Modal centered opened={opened} onClose={close} title={HOME_CONSTANTS.CREATE_CERTIFICATE}>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Textarea
              required
              autosize
              radius='md'
              label={HOME_CONSTANTS.REASON}
              placeholder={HOME_CONSTANTS.REASON_PLACEHOLDER}
              {...form.getInputProps('reason')}
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
            <Button color='teal' onClick={open} variant='filled'>
              <IconFileAnalytics size='1rem' />
              {HOME_CONSTANTS.CREATE_CERTIFICATE}
            </Button>
          )}
        />
      </Flex>
    </Container>
  )
}
