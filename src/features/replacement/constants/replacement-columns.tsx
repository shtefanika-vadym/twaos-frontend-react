import { Badge } from '@mantine/core'

import { STATUS_CONSTANTS } from 'common/constants'

export const REPLACEMENT_COLUMNS = [
  {
    accessorKey: 'first_name',
    header: 'First name',
  },
  {
    accessorKey: 'last_name',
    header: 'Last name',
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
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'program_study',
    header: 'Program study',
  },
  {
    accessorKey: 'start_date',
    header: 'Start date',
  },
  {
    accessorKey: 'end_date',
    header: 'End date',
  },
]
