import type { StatusType } from 'common/types'

export interface ICertificate {
  id: number
  reason: string
  created_at: string
  updated_at: string
  status: StatusType
  user?: ICertificateUser
  certificateId: string | null
  rejectReason: string | null
}

interface ICertificateUser {
  email: string
  status: string
  last_name: string
  first_name: string
  year_study: string
  field_study: string
  program_study: string
}

export interface IManageCertificate {
  id: number
  type: StatusType
}
