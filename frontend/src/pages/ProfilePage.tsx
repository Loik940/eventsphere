import { CalendarDays } from 'lucide-react'

import { PageLayout } from '../components/layout'
import { Button, Card } from '../components/ui'

const history = [
  {
    title: 'AI Builders Global Summit',
    date: '14 Juin 2026',
    status: 'Participe',
  },
  {
    title: 'Design Systems for Scale',
    date: '18 Juin 2026',
    status: 'Participe',
  },
  {
    title: 'Culture numérique et création locale',
    date: '02 Mai 2026',
    status: 'Annulé',
  },
]

const getStatusClasses = (status: string): string =>
  status === 'Participe'
    ? 'bg-[#ECFDF5] text-[#065F46]'
    : 'bg-[#FEF2F2] text-[#DC2626]'

function ProfilePage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-3xl px-6 py-10 md:px-10">
        <section className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#4F46E5] text-2xl font-semibold text-white">
            AT
          </div>
          <h1 className="mt-5 text-2xl font-semibold text-[#0F172A]">Alex Tossa</h1>
          <p className="mt-1 text-sm text-[#64748B]">alex.tossa@eventsphere.app</p>
          <Button variant="secondary" size="md" className="mt-6">
            Modifier le profil
          </Button>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-[#0F172A]">Historique des participations</h2>
          <div className="mt-5 space-y-4">
            {history.map((event) => (
              <Card key={`${event.title}-${event.date}`} className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-[#0F172A]">{event.title}</h3>
                    <p className="mt-2 flex items-center gap-2 text-xs text-[#64748B]">
                      <CalendarDays size={13} aria-hidden="true" /> {event.date}
                    </p>
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(event.status)}`}>
                    {event.status}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  )
}

export default ProfilePage
