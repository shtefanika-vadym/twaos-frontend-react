import type { STATUS_CONSTANTS } from 'common/constants'

export type StatusType =
  | STATUS_CONSTANTS.PENDING
  | STATUS_CONSTANTS.REJECTED
  | STATUS_CONSTANTS.APPROVED
