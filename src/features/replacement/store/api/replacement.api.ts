import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { EndpointBuilder } from '@reduxjs/toolkit/src/query/endpointDefinitions'

import { baseQuery } from 'app/store/base-query'

import { HTTP_METHODS, REDUCER_NAMES } from 'common/constants'

export const replacementApi = createApi({
  reducerPath: REDUCER_NAMES.REPLACEMENT,
  baseQuery: baseQuery(),
  tagTypes: ['MyReplacement', 'HistoryReplacement'],
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    fetchSecretaries: build.query({
      query: (data) => ({
        data,
        url: '/users/secretaries',
      }),
    }),

    createReplacement: build.mutation({
      query: (data) => ({
        data,
        url: '/replacements',
        method: HTTP_METHODS.POST,
      }),
      invalidatesTags: ['MyReplacement'],
    }),

    fetchReplacements: build.query({
      query: (data) => ({
        data,
        url: '/replacements',
      }),
      providesTags: ['MyReplacement'],
    }),

    fetchReplacing: build.query({
      query: (data) => ({
        data,
        url: '/replacements/replacing',
      }),
      providesTags: ['HistoryReplacement'],
    }),

    rejectReplacement: build.mutation({
      query: (id) => ({
        url: `/replacements/${id}/reject`,
        method: HTTP_METHODS.PATCH,
      }),
      invalidatesTags: ['HistoryReplacement'],
    }),

    approveReplacement: build.mutation({
      query: (id) => ({
        url: `/replacements/${id}/approve`,
        method: HTTP_METHODS.PATCH,
      }),
      invalidatesTags: ['HistoryReplacement'],
    }),
  }),
})

export const {
  useFetchReplacingQuery,
  useFetchSecretariesQuery,
  useFetchReplacementsQuery,
  useRejectReplacementMutation,
  useApproveReplacementMutation,
  useCreateReplacementMutation,
}: any = replacementApi
