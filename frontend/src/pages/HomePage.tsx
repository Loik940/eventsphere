/**
 * Page d'accueil.
 * Redirige vers la liste des evenements qui sert de landing page principale.
 */
import { Navigate } from 'react-router-dom'

function HomePage() {
  return <Navigate to="/events" replace />
}

export default HomePage
