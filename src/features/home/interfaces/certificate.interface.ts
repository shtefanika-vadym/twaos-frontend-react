export interface ICertificate {
  id: number
  status: string
  reason: string
  created_at: string
  updated_at: string
  rejectReason: string | null
}

export interface IManageCertificate {
  id: number
  type: 'reject' | 'approve'
}
