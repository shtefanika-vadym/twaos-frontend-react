import * as z from 'zod'

export const HOME_CERTIFICATE_SCHEMA = z.object({
  reason: z.string().min(10, '10 characters minimum').max(255),
})

export type IHomeCertificate = z.infer<typeof HOME_CERTIFICATE_SCHEMA>
