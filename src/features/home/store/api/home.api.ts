import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { EndpointBuilder } from '@reduxjs/toolkit/src/query/endpointDefinitions'

import { baseQuery } from 'app/store/base-query'

import { HTTP_METHODS, REDUCER_NAMES } from 'common/constants'

import { HOME_CONSTANTS } from 'features/home/constants/home.constants'
import type { ICertificate } from 'features/home/interfaces/certificate.interface'

export const homeApi = createApi({
  reducerPath: REDUCER_NAMES.HOME,
  baseQuery: baseQuery(),
  tagTypes: ['Certificates'],
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    createCertificate: build.mutation({
      query: (data) => ({
        data,
        url: '/certificates',
        method: HTTP_METHODS.POST,
      }),
      invalidatesTags: ['Certificates'],
    }),
    approveCertificate: build.mutation({
      query: ({ id, notifyUser }) => ({
        data: { notifyUser },
        url: `/certificates/${id}/approve`,
        method: HTTP_METHODS.PATCH,
      }),
      invalidatesTags: ['Certificates'],
    }),
    rejectCertificate: build.mutation({
      query: (data) => ({
        data,
        url: `/certificates/${data.id}/reject`,
        method: HTTP_METHODS.PATCH,
      }),
      invalidatesTags: ['Certificates'],
    }),
    fetchCertificates: build.query({
      query: (data) => ({
        data,
        url: '/certificates',
      }),
      providesTags: ['Certificates'],
      transformResponse: (response: ICertificate[]): ICertificate[] => {
        return response.map(
          ({ status, created_at, updated_at, ...rest }: ICertificate): ICertificate => {
            const isSameDate: boolean = created_at === updated_at
            return {
              ...rest,
              status:
                status === 'pending'
                  ? HOME_CONSTANTS.IN_PROGRESS
                  : status === 'approved'
                  ? HOME_CONSTANTS.APPROVED
                  : HOME_CONSTANTS.REJECTED,
              created_at: created_at.slice(0, 10),
              updated_at: isSameDate ? null : updated_at.slice(0, 10),
            }
          },
        )
      },
    }),
  }),
})

export const {
  useCreateCertificateMutation,
  useFetchCertificatesQuery,
  useApproveCertificateMutation,
  useRejectCertificateMutation,
}: any = homeApi
