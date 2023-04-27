import { useMemo } from 'react'

import { Flex, Title } from '@mantine/core'
import { MantineReactTable } from 'mantine-react-table'

import { UsersUpload } from 'features/users/components/users-upload/users-upload'
import { USERS_CONSTANTS } from 'features/users/constants/users.constants'

export const UsersContent = () => {
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
  return (
    <Flex w='100%' gap={10} direction='column'>
      <Title order={1}>{USERS_CONSTANTS.USERS}</Title>

      <MantineReactTable
        columns={columns as any}
        data={data}
        renderTopToolbarCustomActions={() => <UsersUpload />}
      />
    </Flex>
  )
}
