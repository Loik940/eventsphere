import { CalendarDays, ChevronRight, Eye, Users } from 'lucide-react'

import { PageLayout } from '../components/layout'
import { Badge, Card } from '../components/ui'

const stats = [
  { label: 'Inscriptions', value: '12', color: '#4F46E5' },
  { label: 'Créés', value: '4', color: '#0F172A' },
  { label: 'À venir', value: '3', color: '#10B981' },
  { label: 'Passés', value: '28', color: '#0F172A' },
]

const upcomingEvents = [
  {
    title: 'Global AI Summit 2026',
    category: 'Hackathon',
    date: 'Demain, 10:00',
    image: 'bg-[linear-gradient(135deg,#4F46E5,#0F172A)]',
  },
  {
    title: 'Design UI Avancé',
    category: 'Atelier',
    date: '14 Juin, 14:30',
    image: 'bg-[linear-gradient(135deg,#ECFDF5,#D1FAE5)]',
  },
]

const today = new Intl.DateTimeFormat('fr-FR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
}).format(new Date())

function DashboardPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <header>
          <h1 className="font-serif text-[38px] leading-none text-[#0F172A] md:text-5xl">Bonjour, Alex</h1>
          <p className="mt-3 text-[15px] leading-6 text-[#64748B]">
            Voici le résumé de votre activité pour ce {today}.
          </p>
        </header>

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

        <section className="mt-14">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="max-w-[230px] text-2xl font-semibold leading-tight text-[#0F172A]">
              Mes prochains événements
            </h2>
            <button type="button" className="text-sm font-medium text-[#4F46E5]">
              Voir tout
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {upcomingEvents.map((event) => (
              <Card key={event.title} className="flex items-center gap-4 p-4" onClick={() => undefined}>
                <div className={`h-14 w-14 shrink-0 rounded-lg ${event.image}`} />
                <div className="min-w-0 flex-1">
                  <Badge category={event.category} />
                  <h3 className="mt-2 truncate text-sm font-semibold text-[#0F172A]">{event.title}</h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-[#64748B]">
                    <CalendarDays size={13} aria-hidden="true" /> {event.date}
                  </p>
                </div>
                <ChevronRight size={20} className="text-[#0F172A]" aria-hidden="true" />
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-[#0F172A]">Mes événements créés</h2>
            <button type="button" className="text-sm font-medium text-[#4F46E5]">
              Gérer
            </button>
          </div>

          <Card className="max-w-xl">
            <div className="relative h-44 bg-[linear-gradient(135deg,#111827,#F97316)]">
              <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase text-[#0F172A]">
                En direct
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-3xl font-semibold leading-tight text-[#0F172A]">Soirée Networking Elite</h3>
              <div className="mt-5 flex flex-wrap gap-5 text-sm text-[#64748B]">
                <span className="flex items-center gap-2">
                  <Users size={16} aria-hidden="true" /> 124 inscrits
                </span>
                <span className="flex items-center gap-2">
                  <Eye size={16} aria-hidden="true" /> 1.2k vues
                </span>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </PageLayout>
  )
}

export default DashboardPage
