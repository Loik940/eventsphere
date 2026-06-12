import { useCallback, useEffect, useState } from 'react'
import { CalendarDays, ChevronRight, Eye, Pencil, Plus, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import eventsApi from '../api/events.api'
import registrationsApi from '../api/registrations.api'
import { PageLayout } from '../components/layout'
import { Badge, Card } from '../components/ui'
import { useAuthStore } from '../store/auth.store'
import type { Event } from '../types/event.types'
import type { Registration } from '../types/registration.types'

function DashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const [myEvents, setMyEvents] = useState<Event[]>([])
  const [myRegistrations, setMyRegistrations] = useState<Registration[]>([])
  const [isLoadingEvents, setIsLoadingEvents] = useState(true)
  const [isLoadingRegs, setIsLoadingRegs] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const firstName = user?.name?.split(' ')[0] ?? 'toi'

  const today = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())

  const fetchMyEvents = useCallback(async () => {
    setIsLoadingEvents(true)
    try {
      const data = await eventsApi.getMyEvents()
      setMyEvents(data)
    } catch {
      // silencieux
    } finally {
      setIsLoadingEvents(false)
    }
  }, [])

  const fetchMyRegistrations = useCallback(async () => {
    setIsLoadingRegs(true)
    try {
      const data = await registrationsApi.getMyRegistrations()
      setMyRegistrations(data)
    } catch {
      // silencieux
    } finally {
      setIsLoadingRegs(false)
    }
  }, [])

  useEffect(() => {
    fetchMyEvents()
    fetchMyRegistrations()
  }, [fetchMyEvents, fetchMyRegistrations])

  const handleDelete = async (eventId: string) => {
    const confirmed = window.confirm('Supprimer cet événement ? Cette action est irréversible.')
    if (!confirmed) return
    setDeletingId(eventId)
    try {
      await eventsApi.deleteEvent(eventId)
      setMyEvents((prev) => prev.filter((e) => e._id !== eventId))
    } catch {
      alert('Impossible de supprimer cet événement.')
    } finally {
      setDeletingId(null)
    }
  }

  const activeRegistrations = myRegistrations.filter((r) => r.status === 'Participe')
  const upcomingEvents = myRegistrations.filter(
    (r) => r.status === 'Participe' && new Date(r.event.date) > new Date(),
  )
  const pastEvents = myRegistrations.filter(
    (r) => new Date(r.event.date) <= new Date(),
  )

  const stats = [
    { label: 'Inscriptions', value: activeRegistrations.length, color: '#4F46E5' },
    { label: 'Créés', value: myEvents.length, color: '#0F172A' },
    { label: 'À venir', value: upcomingEvents.length, color: '#10B981' },
    { label: 'Passés', value: pastEvents.length, color: '#64748B' },
  ]

  return (
    <PageLayout>
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-[38px] leading-none text-[#0F172A] md:text-5xl">
              Bonjour, {firstName}
            </h1>
            <p className="mt-3 text-[15px] leading-6 text-[#64748B]">
              Voici le résumé de votre activité pour ce {today}.
            </p>
          </div>
          <Link
            to="/events/new"
            className="flex shrink-0 items-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#4338CA]"
          >
            <Plus size={16} />
            Créer
          </Link>
        </header>

        {/* Stats */}
        <section className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-5">
              <p className="text-sm text-[#64748B]">{stat.label}</p>
              <p className="mt-4 text-4xl font-semibold" style={{ color: stat.color }}>
                {stat.value}
              </p>
            </Card>
          ))}
        </section>

        {/* Prochains événements inscrits */}
        <section className="mt-14">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="max-w-[230px] text-2xl font-semibold leading-tight text-[#0F172A]">
              Mes prochains événements
            </h2>
          </div>

          {isLoadingRegs ? (
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2].map((i) => (
                <div key={i} className="h-20 animate-pulse rounded-2xl bg-[#F4F3F0]" />
              ))}
            </div>
          ) : upcomingEvents.length === 0 ? (
            <p className="text-sm text-[#64748B]">Aucun événement à venir. <Link to="/" className="text-[#4F46E5] font-medium">Explorer</Link></p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {upcomingEvents.map((reg) => (
                <Card
                  key={reg._id}
                  className="flex cursor-pointer items-center gap-4 p-4"
                  onClick={() => navigate(`/events/${reg.event._id}`)}
                >
                  <div className="min-w-0 flex-1">
                    <Badge category={reg.event.category} />
                    <h3 className="mt-2 truncate text-sm font-semibold text-[#0F172A]">
                      {reg.event.title}
                    </h3>
                    <p className="mt-1 flex items-center gap-1 text-xs text-[#64748B]">
                      <CalendarDays size={13} aria-hidden="true" />
                      {new Date(reg.event.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <ChevronRight size={20} className="shrink-0 text-[#0F172A]" aria-hidden="true" />
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Mes événements créés */}
        <section className="mt-14">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-[#0F172A]">Mes événements créés</h2>
          </div>

          {isLoadingEvents ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-16 animate-pulse rounded-2xl bg-[#F4F3F0]" />
              ))}
            </div>
          ) : myEvents.length === 0 ? (
            <p className="text-sm text-[#64748B]">
              Vous n'avez pas encore créé d'événement.{' '}
              <Link to="/events/new" className="font-medium text-[#4F46E5]">Créer maintenant</Link>
            </p>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-[#ECEAE4] bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#ECEAE4] bg-[#F9F8F6]">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#64748B]">Titre</th>
                    <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#64748B] sm:table-cell">Date</th>
                    <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#64748B] md:table-cell">Places</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-[#64748B]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myEvents.map((event) => (
                    <tr key={event._id} className="border-b border-[#ECEAE4] last:border-0">
                      <td className="px-5 py-4">
                        <p className="truncate max-w-[200px] font-medium text-[#0F172A]">{event.title}</p>
                        <p className="mt-0.5 text-xs text-[#64748B]">{event.category}</p>
                      </td>
                      <td className="hidden px-5 py-4 text-[#64748B] sm:table-cell">
                        {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="hidden px-5 py-4 text-[#64748B] md:table-cell">
                        {event.maxParticipants ? `– / ${event.maxParticipants}` : '∞'}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/events/${event._id}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#F4F3F0]"
                            aria-label="Voir"
                          >
                            <Eye size={16} />
                          </Link>
                          <Link
                            to={`/events/${event._id}/edit`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#4F46E5] hover:bg-[#EEF2FF]"
                            aria-label="Modifier"
                          >
                            <Pencil size={16} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(event._id)}
                            disabled={deletingId === event._id}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#DC2626] hover:bg-[#FEF2F2] disabled:opacity-40"
                            aria-label="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Historique des inscriptions */}
        {pastEvents.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-5 text-2xl font-semibold text-[#0F172A]">Historique</h2>
            <div className="space-y-3">
              {pastEvents.map((reg) => (
                <Card key={reg._id} className="flex items-center justify-between p-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#0F172A]">{reg.event.title}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-[#64748B]">
                      <CalendarDays size={12} />
                      {new Date(reg.event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      reg.status === 'Participe' ? 'bg-[#ECFDF5] text-[#065F46]' : 'bg-[#FEF2F2] text-[#DC2626]'
                    }`}
                  >
                    {reg.status}
                  </span>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  )
}

export default DashboardPage
