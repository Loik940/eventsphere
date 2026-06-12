/**
 * Route protegee.
 * Ce composant verifiera si l'utilisateur est connecte avant d'autoriser l'acces a une page privee.
 */
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useAuthStore } from '../store/auth.store'

function ProtectedRoute() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true })
    }
  }, [navigate, isAuthenticated])

  if (!isAuthenticated) {
    return null
  }

  return <Outlet />
}

export default ProtectedRoute
