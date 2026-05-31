/**
 * Route protegee.
 * Ce composant verifiera si l'utilisateur est connecte avant d'autoriser l'acces a une page privee.
 */
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function ProtectedRoute() {
  const navigate = useNavigate()
  const token = localStorage.getItem('eventsphere_token')

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true })
    }
  }, [navigate, token])

  if (!token) {
    return null
  }

  return <Outlet />
}

export default ProtectedRoute
