import { Badge } from '@mantine/core'

import { STATUS_CONSTANTS } from 'common/constants'

export const REPLACEMENT_COLUMNS = [
  {
    accessorKey: 'first_name',
    header: 'First name',
    size: 0,
  },
  {
    accessorKey: 'last_name',
    header: 'Last name',
    size: 0,
  },
  {
    accessorKey: 'status',
    header: 'Process status',
    Cell: ({ cell }: any) => {
      const value: string = cell.getValue()
      const isRejected: boolean = value === STATUS_CONSTANTS.REJECTED
      const isApproved: boolean = value === STATUS_CONSTANTS.APPROVED
      return <Badge color={isApproved ? 'green' : isRejected ? 'red' : 'yellow'}>{value}</Badge>
    },
    size: 0,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 0,
  },
  {
    accessorKey: 'program_study',
    header: 'Program study',
    size: 0,
  },
  {
    accessorKey: 'start_date',
    header: 'Start date',
    size: 0,
  },
  {
    accessorKey: 'end_date',
    header: 'End date',
    size: 0,
  },
]
