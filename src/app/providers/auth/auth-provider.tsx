import type { ReactNode } from 'react'
import { createContext, useMemo } from 'react'
import { useLocalStorage } from 'react-use'

import { LOCALE_STORAGE_KEYS, RESPONSE_PROPERTY } from 'common/constants'
import { useNotification } from 'common/hooks'
import type { ApiResponse, ITriggerRequest, IUser } from 'common/interfaces'

import type { IAuthLogin } from 'features/auth'
import { useLoginMutation } from 'features/auth'

interface IContextProps {
  user: IUser | null
  isLoading: boolean
  handleLogout: () => void
  handleLogin: (data: IAuthLogin) => Promise<void>
}

export const AuthContext = createContext<IContextProps | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { showNotification } = useNotification()
  const [doLogin, { isLoading }]: ITriggerRequest = useLoginMutation()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useLocalStorage<IUser>(LOCALE_STORAGE_KEYS.USER, null)

  const handleLogin = async (data: IAuthLogin) => {
    const response: ApiResponse = await doLogin(data)
    console.info(response)
    if (data.email.includes('student')) {
      setUser({ token: 'dsds', role: 'student' })
      window.location.reload()
    } else if (data.email.includes('secretary')) {
      window.location.reload()
      setUser({ token: 'dsds', role: 'secretary' })
    } else if (Object.hasOwn(response, RESPONSE_PROPERTY.ERROR))
      showNotification('Login error', response.error.data, RESPONSE_PROPERTY.ERROR)
  }

  const handleLogout = (): void => {
    window.localStorage.clear()
    window.location.reload()
  }

  const value: IContextProps = useMemo(
    (): IContextProps => ({
      user,
      isLoading,
      handleLogin,
      handleLogout,
    }),
    [],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
