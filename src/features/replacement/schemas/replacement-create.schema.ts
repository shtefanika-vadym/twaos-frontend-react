import * as z from 'zod'

export const REPLACEMENT_CREATE_SCHEMA = z.object({
  end_date: z.date({
    required_error: 'Start date is required',
    invalid_type_error: 'Start date is required',
  }),
  start_date: z.date({
    required_error: 'Start date is required',
    invalid_type_error: 'Start date is required',
  }),
  secretary_id: z.string({
    required_error: 'Start date is required',
    invalid_type_error: 'Start date is required',
  }),
})

export type IReplacementCreate = z.infer<typeof REPLACEMENT_CREATE_SCHEMA>
