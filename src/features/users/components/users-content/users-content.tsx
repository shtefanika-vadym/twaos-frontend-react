import { useMemo } from 'react'

import { Flex, Title } from '@mantine/core'
import { MantineReactTable } from 'mantine-react-table'

import type { IRequestResponse } from 'common/interfaces'

import { UsersUpload } from 'features/users/components/users-upload/users-upload'
import { USERS_CONSTANTS } from 'features/users/constants/users.constants'
import { useFetchAllUsersQuery } from 'features/users/store/api/users.api'

export const UsersContent = () => {
  const { data = [] }: IRequestResponse = useFetchAllUsersQuery()
  const columns = useMemo(
    () => [
      {
        accessorKey: 'first_name',
        header: 'First name',
      },
      {
        accessorKey: 'last_name',
        header: 'Last name',
      },
      {
        accessorKey: 'initials',
        header: 'Initial',
      },
      {
        accessorKey: 'program_study',
        header: 'Study program',
      },
      {
        accessorKey: 'field_study',
        header: 'Field study',
      },
      {
        accessorKey: 'year_study',
        header: 'Study year',
      },
      {
        accessorKey: 'faculty_name',
        header: 'Faculty name',
      },
    ],
    [],
  )
  return (
    <Flex w='100%' gap={10} direction='column'>
      <Title order={1}>{USERS_CONSTANTS.USERS}</Title>

      <MantineReactTable
        data={data}
        columns={columns}
        renderTopToolbarCustomActions={() => <UsersUpload />}
      />
    </Flex>
  )
}
