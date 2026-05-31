import { ArrowLeft, CalendarDays, Clock, Lightbulb, MapPin, Rocket, Utensils } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { PageLayout } from '../components/layout'
import { Badge, Button, Card } from '../components/ui'

const mockEvent = {
  title: "Synthèse : L'Avenir de l'IA Collaborative",
  category: 'Hackathon',
  date: '24 Oct. 2026',
  time: '09:00 - 21:00',
  location: 'Station F, Cotonou',
  organizer: 'Jean-Marc Valois',
  participants: 47,
  maxParticipants: 60,
  description: [
    "Plongez au coeur de l'innovation lors de Synthèse, un hackathon exclusif dédié à la synergie entre intelligence artificielle et créativité humaine. Pendant 12 heures, les meilleurs esprits de la tech se réunissent pour concevoir des prototypes qui redéfinissent notre rapport à la machine.",
    "Plus qu'une simple compétition, cet événement est une plateforme d'échange où chaque ligne de code raconte une histoire. Rejoignez-nous pour une journée de co-création intense.",
  ],
  highlights: [
    {
      title: "Pitch final avec jury d'experts",
      text: "Présentez votre projet devant des mentors, investisseurs et leaders de l'industrie.",
      icon: Rocket,
    },
    {
      title: 'Expérience gastronomique',
      text: 'Une restauration premium est assurée tout au long de la journée.',
      icon: Utensils,
    },
    {
      title: 'Mentorat continu',
      text: 'Des experts accompagnent chaque équipe de la phase idée au prototype.',
      icon: Lightbulb,
    },
  ],
}

function EventDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const remainingPlaces = mockEvent.maxParticipants - mockEvent.participants
  const progress = (mockEvent.participants / mockEvent.maxParticipants) * 100

  return (
    <PageLayout>
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
            <Badge category={mockEvent.category} />
            <h1 className="mt-4 font-serif text-[38px] leading-[0.95] text-[#0F172A] md:text-6xl">
              {mockEvent.title}
            </h1>

            <div className="mt-6 grid gap-3 text-sm text-[#0F172A] sm:grid-cols-3">
              <span className="flex items-center gap-2">
                <CalendarDays size={16} aria-hidden="true" /> {mockEvent.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} aria-hidden="true" /> {mockEvent.time}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={16} aria-hidden="true" /> {mockEvent.location}
              </span>
            </div>
          </div>

          <Card className="mt-8 flex max-w-md items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F172A] text-sm font-semibold text-white">
                JV
              </span>
              <div>
                <p className="text-xs text-[#64748B]">Organisé par</p>
                <p className="text-sm font-semibold text-[#0F172A]">{mockEvent.organizer}</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">Contacter</Button>
          </Card>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[1fr_320px] md:px-10">
        <div className="max-w-3xl space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-[#0F172A]">À propos de l'événement</h2>
            <div className="mt-5 space-y-5 text-[15px] leading-7 text-[#0F172A]">
              {mockEvent.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0F172A]">Points forts</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {mockEvent.highlights.map((highlight) => {
                const Icon = highlight.icon

                return (
                  <Card key={highlight.title} className="p-5">
                    <Icon className="mb-4 text-[#4F46E5]" size={20} aria-hidden="true" />
                    <h3 className="text-sm font-semibold text-[#0F172A]">{highlight.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#64748B]">{highlight.text}</p>
                  </Card>
                )
              })}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#0F172A]">Emplacement</h2>
            <div className="mt-5 flex h-[200px] items-center justify-center rounded-2xl border border-[#ECEAE4] bg-[linear-gradient(135deg,#E5E7EB,#F8FAFC)] text-[#64748B]">
              <MapPin size={34} aria-hidden="true" />
            </div>
          </section>
        </div>

        <aside className="hidden md:block">
          <Card className="sticky top-24 p-5">
            <p className="text-sm text-[#64748B]">Places disponibles</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#ECEAE4]">
              <div className="h-full rounded-full bg-[#4F46E5]" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-3 text-sm font-semibold text-[#0F172A]">{remainingPlaces} places restantes</p>
            <p className="mt-6 text-xs text-[#64748B]">Prix d'entrée</p>
            <p className="text-2xl font-semibold text-[#0F172A]">Gratuit</p>
            <Button className="mt-5 w-full" size="lg">S'inscrire</Button>
            <p className="mt-4 text-xs text-[#64748B]">Référence événement : {id ?? 'demo'}</p>
          </Card>
        </aside>
      </div>

      <div className="fixed bottom-16 left-0 right-0 z-40 border-t border-[#ECEAE4] bg-white p-4 md:hidden">
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-[#64748B]">Prix d'entrée</p>
            <p className="text-lg font-semibold text-[#0F172A]">Gratuit</p>
          </div>
          <Button className="flex-1" size="lg">S'inscrire</Button>
        </div>
      </div>
    </PageLayout>
  )
}

export default EventDetailPage
