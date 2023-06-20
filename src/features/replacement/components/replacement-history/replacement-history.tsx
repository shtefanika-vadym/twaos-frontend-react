import { useCallback } from 'react'

import { Box, LoadingOverlay, Menu } from '@mantine/core'
import { MantineReactTable } from 'mantine-react-table'
import { nanoid } from 'nanoid'

import { useApiResponse } from 'app/hooks'

import { BUTTON_CONSTANTS, STATUS_CONSTANTS } from 'common/constants'
import type { ApiResponse, IRequestResponse, ITriggerRequest } from 'common/interfaces'

import { REPLACEMENT_COLUMNS } from 'features/replacement/constants/replacement-columns'
import type { IReplacement } from 'features/replacement/interfaces/replacement.interface'
import {
  useApproveReplacementMutation,
  useFetchReplacingQuery,
  useRejectReplacementMutation,
} from 'features/replacement/store/api/replacement.api'

export const ReplacementHistory = () => {
  const { processApiResponse } = useApiResponse()
  const { isLoading: isFetching, data = [] }: IRequestResponse<IReplacement[]> =
    useFetchReplacingQuery()

  const [rejectReplacement, { isLoading: isRejecting }]: ITriggerRequest =
    useRejectReplacementMutation()

  const [approveReplacement, { isLoading: isApproving }]: ITriggerRequest =
    useApproveReplacementMutation()

  const handleRejectReplacement = useCallback(async (id: number): Promise<void> => {
    const response: ApiResponse = await rejectReplacement(id)

    processApiResponse(response, {
      success: 'Replacement rejected',
    })
  }, [])

  const handleApproveReplacement = useCallback(async (id: number): Promise<void> => {
    const response: ApiResponse = await approveReplacement(id)

    processApiResponse(response, {
      success: 'Replacement approved',
    })
  }, [])

  return (
    <Box pos='relative'>
      <LoadingOverlay visible={isFetching || isRejecting || isApproving} overlayBlur={2} />
      <MantineReactTable
        data={data}
        enableRowActions
        columns={REPLACEMENT_COLUMNS as any}
        mantineTableBodyRowProps={({ row }) => {
          const rowData: IReplacement = row.original

          const currentDate: Date = new Date()
          const startDate: Date = new Date(rowData.start_date)
          const endDate: Date = new Date(rowData.end_date)

          const dateIsBetween: boolean = currentDate >= startDate && currentDate <= endDate

          const isActiveReplacement: boolean =
            rowData.status === STATUS_CONSTANTS.APPROVED && dateIsBetween

          return { style: { backgroundColor: isActiveReplacement ? '#EDF2FF' : '' } }
        }}
        renderRowActionMenuItems={({ row }): [JSX.Element, JSX.Element] => {
          const rowData: IReplacement = row.original
          return [
            <Menu.Item
              key={nanoid()}
              disabled={rowData.status !== STATUS_CONSTANTS.PENDING}
              onClick={() => handleApproveReplacement(rowData?.id)}>
              {BUTTON_CONSTANTS.APPROVE}
            </Menu.Item>,
            <Menu.Item
              key={nanoid()}
              disabled={rowData.status !== STATUS_CONSTANTS.PENDING}
              onClick={() => handleRejectReplacement(rowData?.id)}>
              {BUTTON_CONSTANTS.REJECT}
            </Menu.Item>,
          ]
        }}
      />
    </Box>
  )
}
