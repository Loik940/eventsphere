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
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import ProfilePage from '../pages/ProfilePage'
import RegisterPage from '../pages/RegisterPage'
import ProtectedRoute from './ProtectedRoute'

function TemporaryPage({ title }: { title: string }) {
  return (
    <PageLayout>
      <section className="mx-auto flex min-h-[calc(100vh-64px)] max-w-3xl flex-col justify-center px-6 py-12 text-center">
        <h1 className="font-serif text-5xl text-[#0F172A]">{title}</h1>
        <p className="mt-4 text-sm text-[#64748B]">Cette page sera complétée dans la prochaine étape.</p>
      </section>
    </PageLayout>
  )
}

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
          <Route path="/inscriptions" element={<TemporaryPage title="Mes inscriptions" />} />
        </Route>

        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
