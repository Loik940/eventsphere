import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import eventsApi from '../api/events.api'
import registrationsApi from '../api/registrations.api'
import { EventCard } from '../components/events'
import { PageLayout } from '../components/layout'
import { Button } from '../components/ui'
import { useAuthStore } from '../store/auth.store'
import { useFiltersStore } from '../store/filters.store'
import type { Event } from '../types/event.types'

const CATEGORIES = ['Tout', 'Hackathon', 'Atelier', 'Conférence', 'Séminaire', 'Formation', 'Networking', 'Autre']

function EventsPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const { filters, setFilter } = useFiltersStore()

  const [events, setEvents] = useState<Event[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [registeredIds, setRegisteredIds] = useState<Set<string>>(new Set())
  const [registering, setRegistering] = useState<string | null>(null)

  // Charge les événements depuis l'API
  const fetchEvents = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await eventsApi.getEvents(filters)
      setEvents(result.events)
      setTotalPages(result.totalPages)
    } catch {
      setError('Impossible de charger les événements. Vérifiez votre connexion.')
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  // Charge les inscriptions de l'utilisateur pour afficher l'état "déjà inscrit"
  useEffect(() => {
    if (!isAuthenticated) {
      setRegisteredIds(new Set())
      return
    }
    registrationsApi
      .getMyRegistrations()
      .then((regs) => {
        const ids = new Set(
          regs
            .filter((r) => r.status === 'Participe')
            .map((r) => r.event._id),
        )
        setRegisteredIds(ids)
      })
      .catch(() => {/* silencieux */})
  }, [isAuthenticated])

  const handleRegister = async (eventId: string) => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    setRegistering(eventId)
    try {
      await registrationsApi.register(eventId)
      setRegisteredIds((prev) => new Set([...prev, eventId]))
      setEvents((prev) =>
        prev.map((e) =>
          e._id === eventId
            ? { ...e, currentParticipants: (e as Event & { currentParticipants?: number }).currentParticipants ?? 0 + 1 }
            : e,
        ),
      )
    } catch {
      // L'erreur sera affichée par le serveur dans un prochain toast
    } finally {
      setRegistering(null)
    }
  }

  const handleToggleFavorite = (_eventId: string) => {
    // Fonctionnalité favoris hors périmètre v1
  }

  const selectedCategory = filters.category ?? 'Tout'
  const currentPage = filters.page ?? 1

  return (
    <PageLayout>
      {/* Hero */}
      <section className="border-b border-[#ECEAE4] bg-white px-6 py-6 md:px-10 md:py-10">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex items-center rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-4 py-2 text-sm font-medium text-[#065F46]">
            • Événements disponibles
          </span>

          <div className="mt-5 max-w-2xl">
            <h1 className="font-serif text-[28px] leading-[1.05] text-[#0F172A] md:text-4xl">
              Connectez-vous aux événements qui font avancer.
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-7 text-[#64748B]">
              Découvrez les meilleurs hackathons, workshops et conférences près de chez vous.
            </p>
          </div>

          {/* Barre de recherche */}
          <div className="mt-6 max-w-md">
            <input
              type="search"
              placeholder="Rechercher un événement..."
              value={filters.search ?? ''}
              onChange={(e) => setFilter('search', e.target.value || undefined)}
              className="w-full rounded-xl border border-[#ECEAE4] bg-white px-4 py-3 text-sm text-[#0F172A] outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20"
            />
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:max-w-md">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:flex-1"
              onClick={() => {
                document.getElementById('events-list')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Explorer
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:flex-1"
              onClick={() => navigate('/events/new')}
            >
              Créer
            </Button>
          </div>
        </div>
      </section>

      {/* Filtres catégorie + période */}
      <section className="sticky top-16 z-40 border-b border-[#ECEAE4] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4 md:px-10">
          <div className="flex items-center gap-4">
            <div className="flex min-w-max gap-2 overflow-x-auto">
              {CATEGORIES.map((cat) => {
                const isActive = cat === selectedCategory
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilter('category', cat === 'Tout' ? undefined : cat)}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#0F172A] text-white'
                        : 'border border-[#ECEAE4] bg-white text-[#64748B] hover:bg-[#F4F3F0]'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            {/* Filtre période */}
            <select
              value={filters.period ?? ''}
              onChange={(e) => setFilter('period', (e.target.value as 'upcoming' | 'past') || undefined)}
              className="ml-auto shrink-0 rounded-xl border border-[#ECEAE4] bg-white px-3 py-2 text-sm text-[#64748B] outline-none focus:border-[#4F46E5]"
            >
              <option value="">Toutes les dates</option>
              <option value="upcoming">À venir</option>
              <option value="past">Passés</option>
            </select>
          </div>
        </div>
      </section>

      {/* Liste des événements */}
      <section id="events-list" className="mx-auto max-w-6xl px-6 py-6 md:px-10">
        {error && (
          <div className="mb-6 rounded-xl bg-[#FEF2F2] px-5 py-4 text-sm text-[#DC2626]">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-2xl bg-[#F4F3F0]" />
            ))}
          </div>
        )}

        {!isLoading && events.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event._id}
                id={event._id}
                title={event.title}
                category={event.category}
                date={event.date}
                location={event.location}
                organizer={event.organizer}
                currentParticipants={0}
                maxParticipants={event.maxParticipants}
                isRegistered={registeredIds.has(event._id)}
                onRegister={registering ? () => undefined : handleRegister}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}

        {!isLoading && events.length === 0 && !error && (
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#ECEAE4] bg-white px-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F4F3F0] text-3xl">
              ◌
            </div>
            <h2 className="text-lg font-semibold text-[#0F172A]">Aucun événement trouvé</h2>
            <p className="mt-2 max-w-sm text-sm text-[#64748B]">
              Essayez une autre catégorie ou revenez plus tard pour découvrir de nouveaux événements.
            </p>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setFilter('page', currentPage - 1)}
              className="rounded-lg border border-[#ECEAE4] px-4 py-2 text-sm font-medium text-[#0F172A] disabled:opacity-40 hover:bg-[#F4F3F0]"
            >
              ← Précédent
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setFilter('page', p)}
                className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${
                  p === currentPage
                    ? 'bg-[#0F172A] text-white'
                    : 'border border-[#ECEAE4] text-[#64748B] hover:bg-[#F4F3F0]'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setFilter('page', currentPage + 1)}
              className="rounded-lg border border-[#ECEAE4] px-4 py-2 text-sm font-medium text-[#0F172A] disabled:opacity-40 hover:bg-[#F4F3F0]"
            >
              Suivant →
            </button>
          </div>
        )}
      </section>
    </PageLayout>
  )
}

export default EventsPage
