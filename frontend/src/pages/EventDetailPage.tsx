import { useEffect, useState } from 'react'
import { ArrowLeft, CalendarDays, Clock, MapPin, Users } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import eventsApi from '../api/events.api'
import registrationsApi from '../api/registrations.api'
import { PageLayout } from '../components/layout'
import { Badge, Button, Card } from '../components/ui'
import { useAuthStore } from '../store/auth.store'
import type { Event } from '../types/event.types'
import type { Registration } from '../types/registration.types'

function EventDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuthStore()

  const [event, setEvent] = useState<Event | null>(null)
  const [registration, setRegistration] = useState<Registration | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isActionLoading, setIsActionLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const [participantCount, setParticipantCount] = useState(0)

  useEffect(() => {
    if (!id) return

    setIsLoading(true)
    eventsApi
      .getEventById(id)
      .then((data) => {
        setEvent(data)
        setParticipantCount(data.currentParticipants ?? 0)
      })
      .catch(() => setError('Événement introuvable ou erreur de chargement.'))
      .finally(() => setIsLoading(false))
  }, [id])

  // Charge l'inscription courante de l'utilisateur pour cet événement
  useEffect(() => {
    if (!isAuthenticated || !id) return

    registrationsApi
      .getMyRegistrations()
      .then((regs) => {
        const match = regs.find((r) => r.event._id === id)
        setRegistration(match ?? null)
      })
      .catch(() => {/* silencieux */})
  }, [isAuthenticated, id])

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    if (!id) return
    setIsActionLoading(true)
    setActionError(null)
    try {
      const reg = await registrationsApi.register(id)
      setRegistration(reg)
      setParticipantCount((c) => c + 1)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur lors de l\'inscription.'
      setActionError(msg)
    } finally {
      setIsActionLoading(false)
    }
  }

  const handleCancel = async () => {
    if (!registration) return
    setIsActionLoading(true)
    setActionError(null)
    try {
      const reg = await registrationsApi.cancel(registration._id)
      setRegistration(reg)
      setParticipantCount((c) => Math.max(0, c - 1))
    } catch {
      setActionError('Erreur lors de l\'annulation.')
    } finally {
      setIsActionLoading(false)
    }
  }

  const isOrganizer = user && event && user.id === event.organizer._id
  const isRegistered = registration?.status === 'Participe'
  const isCancelled = registration?.status === 'Annulé'
  const eventDate = event ? new Date(event.date) : null
  const isPast = eventDate ? eventDate < new Date() : false
  const progress = event?.maxParticipants ? (participantCount / event.maxParticipants) * 100 : 0
  const remainingPlaces = event?.maxParticipants ? event.maxParticipants - participantCount : null

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#4F46E5] border-t-transparent" />
        </div>
      </PageLayout>
    )
  }

  if (error || !event) {
    return (
      <PageLayout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
          <p className="text-lg font-semibold text-[#0F172A]">{error ?? 'Événement introuvable'}</p>
          <Button variant="secondary" size="md" onClick={() => navigate(-1)}>
            Retour
          </Button>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      {/* Bannière de l'événement */}
      {event.imageUrl && (
        <div className="h-[30vh] w-full md:h-[45vh]">
          <img src={event.imageUrl} alt={event.title} className="h-full w-full object-cover" />
        </div>
      )}

      {/* En-tête */}
      <section className="bg-[#EEF2FF] px-6 py-8 md:px-10">
        <div className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#0F172A] shadow-sm"
            aria-label="Retour"
          >
            <ArrowLeft size={20} aria-hidden="true" />
          </button>

          <div className="max-w-3xl">
            <Badge category={event.category} />
            <h1 className="mt-4 font-serif text-[38px] leading-[0.95] text-[#0F172A] md:text-6xl">
              {event.title}
            </h1>

            <div className="mt-6 grid gap-3 text-sm text-[#0F172A] sm:grid-cols-3">
              {eventDate && (
                <>
                  <span className="flex items-center gap-2">
                    <CalendarDays size={16} aria-hidden="true" />
                    {eventDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} aria-hidden="true" />
                    {eventDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </>
              )}
              <span className="flex items-center gap-2">
                <MapPin size={16} aria-hidden="true" />
                {event.location}
              </span>
            </div>
          </div>

          <Card className="mt-8 flex max-w-md items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F172A] text-sm font-semibold text-white">
                {event.organizer.name.slice(0, 2).toUpperCase()}
              </span>
              <div>
                <p className="text-xs text-[#64748B]">Organisé par</p>
                <p className="text-sm font-semibold text-[#0F172A]">{event.organizer.name}</p>
              </div>
            </div>
            {isOrganizer && (
              <Link to={`/events/${event._id}/edit`}>
                <Button variant="secondary" size="sm">Modifier</Button>
              </Link>
            )}
          </Card>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[1fr_320px] md:px-10">
        <div className="max-w-3xl space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-[#0F172A]">À propos de l'événement</h2>
            <div className="mt-5 space-y-4 text-[15px] leading-7 text-[#0F172A]">
              {event.description.split('\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#0F172A]">Emplacement</h2>
            <div className="mt-5 flex h-[200px] items-center justify-center rounded-2xl border border-[#ECEAE4] bg-[linear-gradient(135deg,#E5E7EB,#F8FAFC)] text-[#64748B]">
              <div className="text-center">
                <MapPin size={34} aria-hidden="true" className="mx-auto mb-2" />
                <p className="text-sm font-medium">{event.location}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar inscription — desktop */}
        <aside className="hidden md:block">
          <Card className="sticky top-24 p-5">
            {event.maxParticipants && (
              <>
                <p className="text-sm text-[#64748B]">Places disponibles</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#ECEAE4]">
                  <div
                    className="h-full rounded-full bg-[#4F46E5] transition-all"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-[#0F172A]">
                  {remainingPlaces !== null ? `${remainingPlaces} places restantes` : ''}
                </p>
              </>
            )}

            <div className="mt-4 flex items-center gap-2 text-sm text-[#64748B]">
              <Users size={16} />
              <span>{participantCount} inscrit{participantCount > 1 ? 's' : ''}</span>
            </div>

            {actionError && (
              <p className="mt-3 text-xs text-[#DC2626]">{actionError}</p>
            )}

            {!isPast && !isOrganizer && (
              <div className="mt-5">
                {isRegistered ? (
                  <Button
                    className="w-full"
                    size="lg"
                    variant="secondary"
                    onClick={handleCancel}
                    isLoading={isActionLoading}
                  >
                    Annuler ma participation
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleRegister}
                    isLoading={isActionLoading}
                    disabled={remainingPlaces === 0}
                  >
                    {isCancelled ? 'Se réinscrire' : "S'inscrire"}
                  </Button>
                )}
              </div>
            )}

            {isPast && (
              <p className="mt-5 text-center text-sm text-[#64748B]">Cet événement est terminé.</p>
            )}
          </Card>
        </aside>
      </div>

      {/* Barre inscription mobile */}
      {!isPast && !isOrganizer && (
        <div className="fixed bottom-16 left-0 right-0 z-40 border-t border-[#ECEAE4] bg-white p-4 md:hidden">
          <div className="flex items-center gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs text-[#64748B]">
                {participantCount} inscrit{participantCount > 1 ? 's' : ''}
              </p>
              {remainingPlaces !== null && (
                <p className="text-sm font-semibold text-[#0F172A]">{remainingPlaces} places</p>
              )}
            </div>
            {isRegistered ? (
              <Button variant="secondary" size="lg" className="flex-1" onClick={handleCancel} isLoading={isActionLoading}>
                Annuler
              </Button>
            ) : (
              <Button size="lg" className="flex-1" onClick={handleRegister} isLoading={isActionLoading} disabled={remainingPlaces === 0}>
                {isCancelled ? 'Se réinscrire' : "S'inscrire"}
              </Button>
            )}
          </div>
        </div>
      )}
    </PageLayout>
  )
}

export default EventDetailPage
