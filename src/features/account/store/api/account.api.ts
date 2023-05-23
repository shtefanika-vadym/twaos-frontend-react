import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { EndpointBuilder } from '@reduxjs/toolkit/src/query/endpointDefinitions'

import { baseQuery } from 'app/store/base-query'

import { REDUCER_NAMES } from 'common/constants'

export const accountApi = createApi({
  reducerPath: REDUCER_NAMES.ACCOUNT,
  baseQuery: baseQuery(),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    fetchAccountDetails: build.query({
      query: (data) => ({
        data,
        url: '/users/details',
      }),
    }),
  }),
})

export const { useFetchAccountDetailsQuery }: any = accountApi
