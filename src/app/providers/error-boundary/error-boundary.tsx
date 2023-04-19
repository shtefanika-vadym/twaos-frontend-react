import type { ErrorInfo, ReactNode } from 'react'
import { Component } from 'react'

interface IProps {
  children: ReactNode
}

interface IState {
  hasError: boolean
}

export class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo)
  }

  handleReloadPage() {
    window.location.reload()
  }

  render() {
    const { children } = this.props
    const { hasError } = this.state

    if (hasError) {
      return <p>Error page</p>
    }

    return children
  }
}
