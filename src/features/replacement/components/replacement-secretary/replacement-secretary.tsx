import { Box, LoadingOverlay } from '@mantine/core'
import { MantineReactTable } from 'mantine-react-table'

import { useApiResponse } from 'app/hooks'

import type { ApiResponse, IRequestResponse, ITriggerRequest } from 'common/interfaces'
import { Utils } from 'common/utils'

import { ReplacementCreate } from 'features/replacement/components/replacement-create/replacement-create'
import { REPLACEMENT_COLUMNS } from 'features/replacement/constants/replacement-columns'
import type { IReplacement } from 'features/replacement/interfaces/replacement.interface'
import type { IReplacementCreate } from 'features/replacement/schemas/replacement-create.schema'
import {
  useCreateReplacementMutation,
  useFetchReplacementsQuery,
} from 'features/replacement/store/api/replacement.api'

const { formatDateToISO } = Utils

export const ReplacementSecretary = () => {
  const { processApiResponse } = useApiResponse()

  const { isLoading: isFetching, data = [] }: IRequestResponse<IReplacement[]> =
    useFetchReplacementsQuery()

  const [createReplacement, { isLoading: isCreating }]: ITriggerRequest =
    useCreateReplacementMutation()
  const handleReplace = async (data: IReplacementCreate): Promise<void> => {
    const adjustedData = {
      secretary_id: Number(data.secretary_id),
      end_date: formatDateToISO(data.end_date),
      start_date: formatDateToISO(data.start_date),
    }
    const response: ApiResponse = await createReplacement(adjustedData)
    processApiResponse(response, {
      success: 'Replacement created',
    })
  }
  return (
    <Box pos='relative'>
      <LoadingOverlay visible={isCreating || isFetching} overlayBlur={2} />
      <MantineReactTable
        data={data}
        columns={REPLACEMENT_COLUMNS}
        renderTopToolbarCustomActions={() => <ReplacementCreate handleReplace={handleReplace} />}
      />
    </Box>
  )
}
