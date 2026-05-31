import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { EventCard } from '../components/events'
import { PageLayout } from '../components/layout'
import { Button } from '../components/ui'

type EventItem = {
  id: string
  title: string
  category: string
  date: string
  location: string
  organizer: {
    name: string
  }
  currentParticipants: number
  maxParticipants?: number
  isRegistered: boolean
}

const categories = ['Tout', 'Hackathon', 'Atelier', 'Conférence', 'Séminaire', 'Culturel', 'Sport']

const initialEvents: EventItem[] = [
  {
    id: '1',
    title: 'AI Builders Global Summit',
    category: 'Hackathon',
    date: '2026-06-14T09:00:00.000Z',
    location: 'Cotonou Digital Center, Cotonou',
    organizer: { name: 'Amina Lawson' },
    currentParticipants: 42,
    maxParticipants: 80,
    isRegistered: false,
  },
  {
    id: '2',
    title: 'Design Systems for Scale',
    category: 'Atelier',
    date: '2026-06-18T14:00:00.000Z',
    location: 'Creative Lab, Lomé',
    organizer: { name: 'Koffi Mensah' },
    currentParticipants: 18,
    maxParticipants: 30,
    isRegistered: true,
  },
  {
    id: '3',
    title: 'Future of Web3 & Crypto',
    category: 'Conférence',
    date: '2026-06-21T10:30:00.000Z',
    location: 'Palais de la Culture, Abidjan',
    organizer: { name: 'Fatou Diarra' },
    currentParticipants: 95,
    maxParticipants: 120,
    isRegistered: false,
  },
  {
    id: '4',
    title: 'Séminaire Cloud & DevOps Afrique',
    category: 'Séminaire',
    date: '2026-06-26T08:30:00.000Z',
    location: 'Impact Hub, Dakar',
    organizer: { name: 'Moussa Ndiaye' },
    currentParticipants: 60,
    maxParticipants: 60,
    isRegistered: false,
  },
  {
    id: '5',
    title: 'Culture numérique et création locale',
    category: 'Culturel',
    date: '2026-07-02T16:00:00.000Z',
    location: 'Institut Français, Cotonou',
    organizer: { name: 'Nadia Houngbo' },
    currentParticipants: 24,
    maxParticipants: 50,
    isRegistered: false,
  },
  {
    id: '6',
    title: 'Sport Tech Challenge pour campus innovants',
    category: 'Sport',
    date: '2026-07-08T07:30:00.000Z',
    location: 'Stade Universitaire, Porto-Novo',
    organizer: { name: 'Alex Tossa' },
    currentParticipants: 33,
    maxParticipants: 45,
    isRegistered: false,
  },
]

const normalizeCategory = (category: string): string =>
  category
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

function EventsPage() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('Tout')
  const [events, setEvents] = useState<EventItem[]>(initialEvents)
  const [isLoading] = useState(false)

  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'Tout') {
      return events
    }

    return events.filter(
      (event) => normalizeCategory(event.category) === normalizeCategory(selectedCategory),
    )
  }, [events, selectedCategory])

  const handleRegister = (eventId: string) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) => {
        if (event.id !== eventId || event.isRegistered) {
          return event
        }

        return {
          ...event,
          isRegistered: true,
          currentParticipants: event.currentParticipants + 1,
        }
      }),
    )
  }

  const handleToggleFavorite = (_eventId: string) => {
    // Le stockage des favoris sera branche avec l'API plus tard.
  }

  return (
    <PageLayout>
      <section className="border-b border-[#ECEAE4] bg-white px-6 py-6 md:px-10 md:py-10">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex items-center rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-4 py-2 text-sm font-medium text-[#065F46]">
            • 24 événements cette semaine
          </span>

          <div className="mt-5 max-w-2xl">
            <h1 className="font-serif text-[28px] leading-[1.05] text-[#0F172A] md:text-4xl">
              Connectez-vous aux événements qui font avancer.
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-7 text-[#64748B]">
              Découvrez les meilleurs hackathons, workshops et conférences près de chez vous.
            </p>
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

      <section className="sticky top-16 z-40 border-b border-[#ECEAE4] bg-white">
        <div className="mx-auto max-w-6xl overflow-x-auto px-6 py-4 md:px-10">
          <div className="flex min-w-max gap-3">
            {categories.map((category) => {
              const isActive = category === selectedCategory

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#0F172A] text-white'
                      : 'border border-[#ECEAE4] bg-white text-[#64748B] hover:bg-[#F4F3F0]'
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section id="events-list" className="mx-auto max-w-6xl px-6 py-6 md:px-10">
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-64 animate-pulse rounded-2xl bg-[#F4F3F0]" />
            ))}
          </div>
        )}

        {!isLoading && filteredEvents.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                category={event.category}
                date={event.date}
                location={event.location}
                organizer={event.organizer}
                currentParticipants={event.currentParticipants}
                maxParticipants={event.maxParticipants}
                isRegistered={event.isRegistered}
                onRegister={handleRegister}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}

        {!isLoading && filteredEvents.length === 0 && (
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
      </section>
    </PageLayout>
  )
}

export default EventsPage
