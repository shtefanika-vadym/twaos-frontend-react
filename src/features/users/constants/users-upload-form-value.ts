import type { IUsersUpload } from 'features/users/schemas/user-upload.schema'

export const USERS_UPLOAD_INIT_VALUES: IUsersUpload = {
  usersFile: null,
  facultyName: null,
  secretariesFile: null,
  concatenateName: false,
}
