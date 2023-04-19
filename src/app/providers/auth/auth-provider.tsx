import type { ReactNode } from 'react'
import { createContext, useMemo } from 'react'

interface IProps {
  user: null
}

export const AuthContext = createContext<IProps | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const value = useMemo(
    () => ({
      user: null,
    }),
    [],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
