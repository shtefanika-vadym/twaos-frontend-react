import * as z from 'zod'

export const USERS_UPLOAD_SCHEMA = z.object({
  concatenateName: z.boolean(),
  facultyName: z.string({
    required_error: 'Faculty name is required',
    invalid_type_error: 'Faculty name is required',
  }),
  usersFile: z
    .object({})
    .nullable()
    .refine((data) => !!data, { message: 'File .csv with students is required' }),
  secretariesFile: z
    .object({})
    .nullable()
    .refine((data) => !!data, { message: 'File .csv with secretaries is required' }),
})

export type IUsersUpload = z.infer<typeof USERS_UPLOAD_SCHEMA>
