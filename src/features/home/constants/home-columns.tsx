import { Badge } from '@mantine/core'

import { STATUS_CONSTANTS } from 'common/constants'

import { HomeDownloadPdf } from 'features/home/components/home-download-pdf/home-download-pdf'

export const HOME_STUDENT_COLUMNS = [
  {
    accessorKey: 'certificateId',
    header: 'ID',
    Cell: ({ cell, row }: any) => {
      return (
        <HomeDownloadPdf
          value={cell.getValue()}
          route={`/certificates/${row.original.id}/download`}
        />
      )
    },
    size: 0,
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
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
    accessorKey: 'created_at',
    header: 'Created at',
    size: 0,
  },
  {
    accessorKey: 'updated_at',
    header: 'Updated at',
    size: 0,
  },
]

export const HOME_SECRETARY_COLUMNS = [
  {
    size: 0,
    accessorKey: 'certificateId',
    header: 'Certificate ID',
    Cell: ({ cell, row }: any) => {
      return (
        <HomeDownloadPdf
          value={cell.getValue()}
          route={`/certificates/${row.original.id}/download`}
        />
      )
    },
  },
  {
    accessorKey: 'user.first_name',
    header: 'First name',
    size: 0,
  },
  {
    accessorKey: 'user.last_name',
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
    accessorKey: 'user.email',
    header: 'Email',
    size: 0,
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    size: 0,
  },
  {
    accessorKey: 'user.status',
    header: 'Budget status',
    size: 0,
  },
  {
    accessorKey: 'user.year_study',
    header: 'Year study',
    size: 0,
  },
  {
    accessorKey: 'user.field_study',
    header: 'Field study',
    size: 0,
  },
  {
    accessorKey: 'user.program_study',
    header: 'Program study',
    size: 0,
  },
  {
    accessorKey: 'created_at',
    header: 'Created at',
    size: 0,
  },
  {
    accessorKey: 'updated_at',
    header: 'Updated at',
    size: 0,
  },
  {
    accessorKey: 'rejectReason',
    header: 'Reject reason',
    size: 0,
  },
]
