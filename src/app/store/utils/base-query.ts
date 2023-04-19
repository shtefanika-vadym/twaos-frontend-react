import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'

export const baseQuery =
  (): BaseQueryFn<
    {
      url: string
      data?: AxiosRequestConfig['data']
      method: AxiosRequestConfig['method']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
  > =>
  async (param) => {
    try {
      const user = { token: '' }
      // IUser | null = localStorage.getItem(LOCALE_STORAGE_KEYS.USER)
      // ? JSON.parse(localStorage.getItem(LOCALE_STORAGE_KEYS.USER))
      // : null

      const result = await axios({
        ...param,
        baseURL: process.env.REACT_APP_RESIDEN_API_BASE_URL,
        headers: {
          ...param?.headers,
          Authorization: user ? `Bearer ${user.token}` : null,
        },
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      if (err.response?.status === 401) {
        localStorage.clear()
        window.location.assign('/login')
      }
      const errors = err.response?.data['error' as keyof unknown]
      return {
        error: {
          status: err.response?.status,
          data:
            typeof errors === 'object'
              ? Object.values(errors).flat()
              : [err.response.data['message' as keyof unknown]],
        },
      }
    }
  }
