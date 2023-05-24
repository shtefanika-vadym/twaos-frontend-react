import type { IHomeCertificate } from 'features/home/schemas/home-create-certificate.schema'
import type { IHomeManageCertificate } from 'features/home/schemas/home-manage-certificate.schema'

export const HOME_CERTIFICATE_INIT_VALUE: IHomeCertificate = {
  reason: '',
}

export const HOME_MANAGE_CERTIFICATE_INIT_VALUE: IHomeManageCertificate = {
  rejectReason: null,
  notifyUser: false,
}
