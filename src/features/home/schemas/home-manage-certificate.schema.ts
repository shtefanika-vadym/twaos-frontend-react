import * as z from 'zod'

export const HOME_MANAGE_CERTIFICATE_SCHEMA = z.object({
  rejectReason: z.string().nullable(),
  notifyUser: z.boolean(),
})

export type IHomeManageCertificate = z.infer<typeof HOME_MANAGE_CERTIFICATE_SCHEMA>
