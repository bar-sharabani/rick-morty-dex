interface LoadingSpinnerProps {
  /** Text announced to screen readers and shown under the spinner. */
  label?: string
}

function LoadingSpinner({ label = 'Loading…' }: LoadingSpinnerProps) {
  return (
    <div className="loading-spinner" role="status" aria-live="polite">
      <span className="loading-spinner-circle" aria-hidden="true" />
      <span className="loading-spinner-label">{label}</span>
    </div>
  )
}

export default LoadingSpinner
