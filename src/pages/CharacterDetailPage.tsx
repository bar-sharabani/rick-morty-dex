import { useParams } from 'react-router-dom'

type CharacterDetailParams = {
  id: string
}

function CharacterDetailPage() {
  const { id } = useParams<CharacterDetailParams>()

  return (
    <section className="page">
      <h1>Character #{id}</h1>
      <p>Character details will appear here.</p>
    </section>
  )
}

export default CharacterDetailPage
