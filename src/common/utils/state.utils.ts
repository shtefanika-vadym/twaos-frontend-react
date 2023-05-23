import type { Middleware, Reducer } from '@reduxjs/toolkit'

import { accountApi } from 'features/account'
import { authApi } from 'features/auth'
import { usersApi } from 'features/users'

type ApiReducerObject = Record<string, Reducer>

const APP_API_LIST = [authApi, accountApi, usersApi]

const getAppMiddlewareList = (): Middleware[] => APP_API_LIST.map((api) => api.middleware)
const getAppApiReducerList = (): ApiReducerObject =>
  APP_API_LIST.reduce<ApiReducerObject>((acc: ApiReducerObject, api) => {
    acc[api.reducerPath] = api.reducer
    return acc
  }, {})

export const StateUtils = {
  getAppMiddlewareList,
  getAppApiReducerList,
}
