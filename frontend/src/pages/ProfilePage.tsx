import { useCallback, useEffect, useState } from 'react'
import { CalendarDays } from 'lucide-react'

import authApi from '../api/auth.api'
import registrationsApi from '../api/registrations.api'
import { PageLayout } from '../components/layout'
import { Button, Card } from '../components/ui'
import { useAuthStore } from '../store/auth.store'
import type { AuthUser } from '../types/auth.types'
import type { Registration } from '../types/registration.types'

function getStatusClasses(status: string): string {
  return status === 'Participe'
    ? 'bg-[#ECFDF5] text-[#065F46]'
    : 'bg-[#FEF2F2] text-[#DC2626]'
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? '')
    .join('')
}

function ProfilePage() {
  const { user: storeUser, setUser } = useAuthStore()

  const [profile, setProfile] = useState<AuthUser | null>(storeUser)
  const [history, setHistory] = useState<Registration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(storeUser?.name ?? '')
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const [me, regs] = await Promise.all([
        authApi.getMe(),
        registrationsApi.getMyRegistrations(),
      ])
      setProfile(me)
      setEditName(me.name)
      setUser(me)
      setHistory(regs)
    } catch {
      // silencieux
    } finally {
      setIsLoading(false)
    }
  }, [setUser])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSave = async () => {
    if (!editName.trim() || editName.trim() === profile?.name) {
      setIsEditing(false)
      return
    }
    setIsSaving(true)
    setSaveError(null)
    try {
      // Appel PATCH /api/users/me
      const response = await fetch(
        `${import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'}/users/me`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('eventsphere_token')}`,
          },
          body: JSON.stringify({ name: editName.trim() }),
        },
      )
      const json = await response.json()
      if (!response.ok) throw new Error(json.message ?? 'Erreur')
      setProfile({ ...profile!, name: editName.trim() })
      setUser({ ...profile!, name: editName.trim() })
      setIsEditing(false)
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    } finally {
      setIsSaving(false)
    }
  }

  const initials = profile ? getInitials(profile.name) : '?'

  return (
    <PageLayout>
      <div className="mx-auto max-w-3xl px-6 py-10 md:px-10">
        {/* En-tête profil */}
        <section className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#4F46E5] text-2xl font-semibold text-white">
            {initials}
          </div>

          {isEditing ? (
            <div className="mx-auto mt-5 max-w-xs space-y-3">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full rounded-xl border border-[#ECEAE4] px-4 py-2 text-center text-lg font-semibold text-[#0F172A] outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20"
                placeholder="Votre nom"
                autoFocus
              />
              {saveError && <p className="text-xs text-[#DC2626]">{saveError}</p>}
              <div className="flex justify-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => { setIsEditing(false); setSaveError(null) }}>
                  Annuler
                </Button>
                <Button variant="primary" size="sm" onClick={handleSave} isLoading={isSaving}>
                  Enregistrer
                </Button>
              </div>
            </div>
          ) : (
            <>
              {isLoading ? (
                <div className="mx-auto mt-5 h-6 w-40 animate-pulse rounded-full bg-[#F4F3F0]" />
              ) : (
                <h1 className="mt-5 text-2xl font-semibold text-[#0F172A]">{profile?.name}</h1>
              )}
              <p className="mt-1 text-sm text-[#64748B]">{profile?.email}</p>
              <Button
                variant="secondary"
                size="md"
                className="mt-6"
                onClick={() => setIsEditing(true)}
              >
                Modifier le profil
              </Button>
            </>
          )}
        </section>

        {/* Historique des participations */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-[#0F172A]">Historique des participations</h2>

          {isLoading ? (
            <div className="mt-5 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 animate-pulse rounded-2xl bg-[#F4F3F0]" />
              ))}
            </div>
          ) : history.length === 0 ? (
            <p className="mt-5 text-sm text-[#64748B]">
              Aucune participation pour l'instant.
            </p>
          ) : (
            <div className="mt-5 space-y-4">
              {history.map((reg) => (
                <Card key={reg._id} className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-[#0F172A]">
                        {reg.event.title}
                      </h3>
                      <p className="mt-2 flex items-center gap-2 text-xs text-[#64748B]">
                        <CalendarDays size={13} aria-hidden="true" />
                        {new Date(reg.event.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(reg.status)}`}
                    >
                      {reg.status}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </PageLayout>
  )
}

export default ProfilePage
