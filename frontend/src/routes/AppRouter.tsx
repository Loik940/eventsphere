/**
 * Routeur principal du frontend.
 * Ce fichier declarera les routes publiques, les routes protegees et les pages associees.
 */
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { PageLayout } from '../components/layout'
import DashboardPage from '../pages/DashboardPage'
import EventDetailPage from '../pages/EventDetailPage'
import EventFormPage from '../pages/EventFormPage'
import EventsPage from '../pages/EventsPage'
import InscriptionsPage from '../pages/InscriptionsPage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import ProfilePage from '../pages/ProfilePage'
import RegisterPage from '../pages/RegisterPage'
import ProtectedRoute from './ProtectedRoute'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/events/new" element={<EventFormPage />} />
          <Route path="/events/:id/edit" element={<EventFormPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/inscriptions" element={<InscriptionsPage />} />
        </Route>

        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
