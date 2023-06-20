import type { StatusType } from 'common/types'

export interface IReplacement {
  id: number
  email: string
  end_date: string
  last_name: string
  status: StatusType
  start_date: string
  first_name: string
  program_study: string
}
