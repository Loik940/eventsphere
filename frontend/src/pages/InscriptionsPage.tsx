import { useCallback, useEffect, useState } from 'react'
import { CalendarDays, ChevronRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import registrationsApi from '../api/registrations.api'
import { PageLayout } from '../components/layout'
import { Badge, Button, Card } from '../components/ui'
import { useToastStore } from '../store/toast.store'
import type { Registration } from '../types/registration.types'

function InscriptionsPage() {
  const navigate = useNavigate()
  const { addToast } = useToastStore()

  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')

  const fetchRegistrations = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await registrationsApi.getMyRegistrations()
      setRegistrations(data)
    } catch {
      addToast('Impossible de charger vos inscriptions.', 'error')
    } finally {
      setIsLoading(false)
    }
  }, [addToast])

  useEffect(() => {
    fetchRegistrations()
  }, [fetchRegistrations])

  const upcomingRegs = registrations.filter(
    (r) => r.status === 'Participe' && new Date(r.event.date) > new Date(),
  )
  const pastRegs = registrations.filter(
    (r) => r.status === 'Participe' && new Date(r.event.date) <= new Date(),
  )
  const cancelledRegs = registrations.filter((r) => r.status === 'Annulé')

  const displayList = activeTab === 'upcoming' ? upcomingRegs : [...pastRegs, ...cancelledRegs]

  return (
    <PageLayout>
      <div className="mx-auto max-w-4xl px-6 py-10 md:px-10">
        <header className="mb-10">
          <h1 className="font-serif text-[38px] leading-none text-[#0F172A] md:text-5xl">
            Mes inscriptions
          </h1>
          <p className="mt-3 text-[15px] leading-6 text-[#64748B]">
            Retrouvez tous les événements auxquels vous avez prévu de participer.
          </p>
        </header>

        {/* Navigation / Tabs */}
        <div className="mb-8 flex gap-4 border-b border-[#ECEAE4]">
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`border-b-2 pb-3 text-sm font-semibold transition-colors ${
              activeTab === 'upcoming'
                ? 'border-[#4F46E5] text-[#4F46E5]'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            À venir ({upcomingRegs.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('past')}
            className={`border-b-2 pb-3 text-sm font-semibold transition-colors ${
              activeTab === 'past'
                ? 'border-[#4F46E5] text-[#4F46E5]'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Passés & Annulés ({pastRegs.length + cancelledRegs.length})
          </button>
        </div>

        {/* Liste */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-[#F4F3F0]" />
            ))}
          </div>
        ) : displayList.length === 0 ? (
          <div className="flex min-h-[30vh] flex-col items-center justify-center rounded-2xl border border-dashed border-[#ECEAE4] bg-[#F9F8F6] p-6 text-center">
            <h2 className="text-lg font-semibold text-[#0F172A]">Aucune inscription trouvée</h2>
            <p className="mt-2 text-sm text-[#64748B]">
              Vous n'avez aucun événement dans cette catégorie pour le moment.
            </p>
            <Link to="/">
              <Button variant="primary" size="md" className="mt-6">
                Explorer les événements
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {displayList.map((reg) => {
              const isPast = new Date(reg.event.date) <= new Date()
              return (
                <Card
                  key={reg._id}
                  className={`flex cursor-pointer flex-col p-5 transition-colors hover:border-[#CBD5E1] sm:flex-row sm:items-center ${
                    reg.status === 'Annulé' ? 'opacity-60' : ''
                  }`}
                  onClick={() => navigate(`/events/${reg.event._id}`)}
                >
                  {reg.event.imageUrl && (
                    <div className="mb-4 hidden h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-[#F4F3F0] sm:mb-0 sm:mr-5 sm:block">
                      <img
                        src={reg.event.imageUrl}
                        alt={reg.event.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge category={reg.event.category} />
                      {reg.status === 'Annulé' && (
                        <span className="rounded-full bg-[#FEF2F2] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#DC2626]">
                          Annulé
                        </span>
                      )}
                      {reg.status === 'Participe' && isPast && (
                        <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#475569]">
                          Terminé
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 truncate text-lg font-semibold text-[#0F172A]">
                      {reg.event.title}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-[#64748B]">
                      <CalendarDays size={14} aria-hidden="true" />
                      {new Date(reg.event.date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <ChevronRight size={24} className="mt-4 shrink-0 text-[#94A3B8] sm:mt-0" />
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </PageLayout>
  )
}

export default InscriptionsPage
