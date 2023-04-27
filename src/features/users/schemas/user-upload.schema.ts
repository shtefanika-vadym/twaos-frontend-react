import * as z from 'zod'

export const USERS_UPLOAD_SCHEMA = z.object({
  concatenateName: z.boolean(),
  usersFile: z
    .object({})
    .nullable()
    .refine((data) => !!data, { message: 'File .xlsx with users is required' }),
})

export type IUsersUpload = z.infer<typeof USERS_UPLOAD_SCHEMA>
