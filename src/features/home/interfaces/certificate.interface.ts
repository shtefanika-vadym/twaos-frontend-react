import type { StatusType } from 'common/types'

export interface ICertificate {
  id: number
  reason: string
  created_at: string
  updated_at: string
  status: StatusType
  rejectReason: string | null
}

export interface IManageCertificate {
  id: number
  type: StatusType
}
