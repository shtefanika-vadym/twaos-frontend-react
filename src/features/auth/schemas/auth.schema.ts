import * as z from 'zod'

export const AUTH_SCHEMA = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password should include at least 6 characters').max(20),
})

export type IAuthLogin = z.infer<typeof AUTH_SCHEMA>
