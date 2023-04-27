import type { ReactNode } from 'react'

interface IProps {
  when: any
  children: ReactNode
  fallback?: ReactNode
}

export const Show = ({ when, children, fallback = null }: IProps) => {
  if (Boolean(when)) return <>{children}</>
  return <>{fallback}</>
}
