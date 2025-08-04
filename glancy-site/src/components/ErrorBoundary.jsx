import React, { Component } from 'react'
import styles from './ErrorBoundary.module.css'
import logger from '../services/Logger.js'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    logger.error('ErrorBoundary caught an error', { error, info })
    this.setState({ hasError: true })
  }

  render() {
    const { hasError } = this.state
    const { fallback, children } = this.props
    if (hasError) {
      return (
        <div className={styles['error-boundary']}>
          {fallback || 'Something went wrong.'}
        </div>
      )
    }
    return children
  }
}

export default ErrorBoundary
