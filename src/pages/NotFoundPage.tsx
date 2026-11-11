import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="page">
      <h1>Page not found</h1>
      <p>
        This dimension doesn&apos;t exist. <Link to="/">Back to characters</Link>
      </p>
    </section>
  )
}

export default NotFoundPage
