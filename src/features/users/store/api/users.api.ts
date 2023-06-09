import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { EndpointBuilder } from '@reduxjs/toolkit/src/query/endpointDefinitions'

import { baseQuery } from 'app/store/base-query'

import { HTTP_METHODS, REDUCER_NAMES } from 'common/constants'

export const usersApi = createApi({
  reducerPath: REDUCER_NAMES.USERS,
  baseQuery: baseQuery(),
  tagTypes: ['Users'],
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    fetchAllUsers: build.query({
      query: (data) => ({
        data,
        url: '/users',
      }),
      providesTags: ['Users'],
    }),

    updateAllUsers: build.mutation({
      query: (data) => ({
        data,
        url: '/users',
        method: HTTP_METHODS.PUT,
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
      invalidatesTags: ['Users'],
    }),
  }),
})

export const { useFetchAllUsersQuery, useUpdateAllUsersMutation }: any = usersApi
