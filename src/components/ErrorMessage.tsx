interface ErrorMessageProps {
  /** Human-readable description of what went wrong. */
  message: string
  /** Optional heading shown above the message. */
  title?: string
  /** When provided, a "Try again" button is rendered that calls this handler. */
  onRetry?: () => void
}

function ErrorMessage({
  message,
  title = 'Something went wrong',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="error-message" role="alert">
      <p className="error-message-title">{title}</p>
      <p className="error-message-text">{message}</p>
      {onRetry && (
        <button type="button" className="error-message-retry" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
