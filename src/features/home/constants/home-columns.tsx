import { Badge } from '@mantine/core'

import { HomeDownloadPdf } from 'features/home/components/home-download-pdf/home-download-pdf'
import { HOME_CONSTANTS } from 'features/home/constants/home.constants'

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
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
  },
  {
    accessorKey: 'status',
    header: 'Process status',
    Cell: ({ cell }: any) => {
      const value: string = cell.getValue()
      const isRejected: boolean = value === HOME_CONSTANTS.REJECTED
      const isApproved: boolean = value === HOME_CONSTANTS.APPROVED
      return <Badge color={isApproved ? 'green' : isRejected ? 'red' : 'yellow'}>{value}</Badge>
    },
  },

  {
    accessorKey: 'created_at',
    header: 'Created at',
  },
  {
    accessorKey: 'updated_at',
    header: 'Updated at',
  },
]

export const HOME_SECRETARY_COLUMNS = [
  {
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
  },
  {
    accessorKey: 'user.last_name',
    header: 'Last name',
  },
  {
    accessorKey: 'status',
    header: 'Process status',
    Cell: ({ cell }: any) => {
      const value: string = cell.getValue()
      const isRejected: boolean = value === HOME_CONSTANTS.REJECTED
      const isApproved: boolean = value === HOME_CONSTANTS.APPROVED
      return <Badge color={isApproved ? 'green' : isRejected ? 'red' : 'yellow'}>{value}</Badge>
    },
  },
  {
    accessorKey: 'user.email',
    header: 'Email',
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
  },
  {
    accessorKey: 'user.status',
    header: 'Budget status',
  },
  {
    accessorKey: 'user.year_study',
    header: 'Year study',
  },
  {
    accessorKey: 'user.field_study',
    header: 'Field study',
  },

  {
    accessorKey: 'created_at',
    header: 'Created at',
  },
  {
    accessorKey: 'updated_at',
    header: 'Updated at',
  },
  {
    accessorKey: 'rejectReason',
    header: 'Reject reason',
  },
]
