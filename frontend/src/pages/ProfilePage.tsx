import { useCallback, useEffect, useState } from 'react'
import { CalendarDays, Edit2, Heart, Mail, MapPin } from 'lucide-react'

import authApi from '../api/auth.api'
import registrationsApi from '../api/registrations.api'
import usersApi from '../api/users.api'
import { PageLayout } from '../components/layout'
import { EventCard } from '../components/events'
import { Button, Card } from '../components/ui'
import { useAuthStore } from '../store/auth.store'
import type { AuthUser } from '../types/auth.types'
import type { Registration } from '../types/registration.types'
import type { Event } from '../types/event.types'

function getStatusClasses(status: string, isPast: boolean): string {
  if (status === 'Annulé') return 'bg-[#FEF2F2] text-[#DC2626]'
  if (isPast) return 'bg-[#F1F5F9] text-[#475569]'
  return 'bg-[#ECFDF5] text-[#065F46]'
}

function getStatusLabel(status: string, isPast: boolean): string {
  if (status === 'Annulé') return 'Annulé'
  if (isPast) return 'Terminé'
  return 'Inscrit'
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
  const [favorites, setFavorites] = useState<Event[]>([])
  const [activeTab, setActiveTab] = useState<'history' | 'favorites'>('history')
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(storeUser?.name ?? '')
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const [isEditingPwd, setIsEditingPwd] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isSavingPwd, setIsSavingPwd] = useState(false)
  const [pwdError, setPwdError] = useState<string | null>(null)
  const [pwdSuccess, setPwdSuccess] = useState(false)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const [me, regs, favs] = await Promise.all([
        authApi.getMe(),
        registrationsApi.getMyRegistrations(),
        usersApi.getFavorites(),
      ])
      setProfile(me)
      setEditName(me.name)
      setUser(me)
      setHistory(regs)
      setFavorites(favs)
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

  const handleUpdatePassword = async () => {
    if (!currentPassword || newPassword.length < 6) {
      setPwdError('Veuillez remplir correctement les champs.')
      return
    }
    setIsSavingPwd(true)
    setPwdError(null)
    setPwdSuccess(false)
    try {
      await authApi.updatePassword({ currentPassword, newPassword })
      setPwdSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setTimeout(() => setIsEditingPwd(false), 3000)
    } catch (err: unknown) {
      setPwdError(err instanceof Error ? err.message : 'Erreur.')
    } finally {
      setIsSavingPwd(false)
    }
  }

  const initials = profile ? getInitials(profile.name) : 'ES'
  const activeCount = history.filter((r) => r.status === 'Participe').length

  return (
    <PageLayout>
      <div className="mx-auto max-w-4xl px-6 py-8 md:px-10">
        
        {/* Cover & Header Profile */}
        <div className="relative mb-12 rounded-2xl bg-white shadow-sm ring-1 ring-[#ECEAE4]">
          {/* Cover */}
          <div className="h-32 w-full rounded-t-2xl bg-gradient-to-r from-[#4F46E5] to-[#9333EA] md:h-48" />
          
          <div className="px-6 pb-6 sm:px-10">
            {/* Avatar */}
            <div className="relative -mt-12 mb-4 sm:-mt-16 sm:mb-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#0F172A] text-3xl font-bold text-white shadow-md sm:h-32 sm:w-32 sm:text-4xl">
                {initials}
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full max-w-sm rounded-xl border border-[#ECEAE4] px-4 py-2 text-xl font-bold text-[#0F172A] outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20"
                      placeholder="Votre nom"
                      autoFocus
                    />
                    {saveError && <p className="text-xs text-[#DC2626]">{saveError}</p>}
                    <div className="flex gap-2">
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
                      <div className="mb-2 h-8 w-48 animate-pulse rounded-full bg-[#F4F3F0]" />
                    ) : (
                      <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">{profile?.name}</h1>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-[#64748B]">
                      <span className="flex items-center gap-1.5">
                        <Mail size={16} />
                        {profile?.email}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {!isEditing && !isEditingPwd && (
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="shrink-0"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 size={14} className="mr-2" />
                    Profil
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="shrink-0"
                    onClick={() => setIsEditingPwd(true)}
                  >
                    Mot de passe
                  </Button>
                </div>
              )}
            </div>

            {/* Change Password Form */}
            {isEditingPwd && (
              <div className="mt-6 rounded-xl border border-[#ECEAE4] p-4 bg-[#F9F8F6] max-w-sm">
                <h3 className="font-semibold text-[#0F172A] mb-3">Modifier le mot de passe</h3>
                
                {pwdSuccess ? (
                  <div className="rounded-xl bg-[#ECFDF5] px-4 py-3 text-sm text-[#065F46]">
                    Mot de passe mis à jour avec succès !
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full rounded-xl border border-[#ECEAE4] px-4 py-2 text-sm text-[#0F172A] outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20"
                      placeholder="Mot de passe actuel"
                    />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-xl border border-[#ECEAE4] px-4 py-2 text-sm text-[#0F172A] outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20"
                      placeholder="Nouveau mot de passe (6 car. min)"
                    />
                    {pwdError && <p className="text-xs text-[#DC2626]">{pwdError}</p>}
                    <div className="flex gap-2 pt-1">
                      <Button variant="secondary" size="sm" onClick={() => { setIsEditingPwd(false); setPwdError(null) }}>
                        Annuler
                      </Button>
                      <Button variant="primary" size="sm" onClick={handleUpdatePassword} isLoading={isSavingPwd}>
                        Valider
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Stats */}
            <div className="mt-8 flex gap-8 border-t border-[#ECEAE4] pt-6">
              <div>
                <p className="text-sm text-[#64748B]">Participations</p>
                <p className="mt-1 text-2xl font-semibold text-[#0F172A]">{activeCount}</p>
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Événements créés</p>
                <p className="mt-1 text-2xl font-semibold text-[#0F172A]">--</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs & Contenu */}
        <section>
          <div className="mb-6 flex gap-6 border-b border-[#ECEAE4]">
            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className={`pb-3 text-sm font-semibold transition-colors ${activeTab === 'history' ? 'border-b-2 border-[#4F46E5] text-[#4F46E5]' : 'text-[#64748B] hover:text-[#0F172A]'}`}
            >
              Activité récente
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('favorites')}
              className={`pb-3 text-sm font-semibold transition-colors ${activeTab === 'favorites' ? 'border-b-2 border-[#4F46E5] text-[#4F46E5]' : 'text-[#64748B] hover:text-[#0F172A]'}`}
            >
              Mes Favoris ({favorites.length})
            </button>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 animate-pulse rounded-2xl bg-white ring-1 ring-[#ECEAE4]" />
              ))}
            </div>
          ) : activeTab === 'history' ? (
            history.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#ECEAE4] bg-[#F9F8F6] py-12 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#94A3B8] shadow-sm">
                  <CalendarDays size={24} />
                </div>
                <p className="text-sm font-medium text-[#0F172A]">Aucune activité pour l'instant.</p>
                <p className="mt-1 text-sm text-[#64748B]">Inscrivez-vous à des événements pour remplir votre profil.</p>
              </div>
            ) : (
              <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#ECEAE4] before:to-transparent">
              {history.map((reg) => {
                const isPast = new Date(reg.event.date) <= new Date()
                return (
                  <div key={reg._id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#EEF2FF] text-[#4F46E5] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ml-0 md:ml-auto md:absolute md:left-1/2">
                      <CalendarDays size={16} />
                    </div>

                    <Card className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 transition-shadow hover:shadow-md ml-4 md:ml-0 bg-white">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs font-semibold text-[#4F46E5] uppercase tracking-wider mb-1">
                            {new Date(reg.event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                          <h3 className="font-semibold text-[#0F172A] line-clamp-1">{reg.event.title}</h3>
                          <p className="flex items-center gap-1 mt-2 text-xs text-[#64748B] line-clamp-1">
                            <MapPin size={12} />
                            {reg.event.location}
                          </p>
                        </div>
                        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase ${getStatusClasses(reg.status, isPast)}`}>
                          {getStatusLabel(reg.status, isPast)}
                        </span>
                      </div>
                    </Card>
                  </div>
                )
              })}
            </div>
          )
        ) : activeTab === 'favorites' ? (
            favorites.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#ECEAE4] bg-[#F9F8F6] py-12 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#94A3B8] shadow-sm">
                  <Heart size={24} />
                </div>
                <p className="text-sm font-medium text-[#0F172A]">Aucun favori pour l'instant.</p>
                <p className="mt-1 text-sm text-[#64748B]">Explorez les événements et ajoutez-les à vos favoris.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {favorites.map((event) => (
                <EventCard
                  key={event._id}
                  id={event._id}
                  title={event.title}
                  category={event.category}
                  imageUrl={event.imageUrl}
                  date={event.date}
                  location={event.location}
                  organizer={event.organizer}
                  currentParticipants={event.currentParticipants ?? 0}
                  maxParticipants={event.maxParticipants}
                  isRegistered={history.some(r => r.event._id === event._id && r.status === 'Participe')}
                  isFavorite={true}
                  onRegister={() => {}}
                  onToggleFavorite={async () => {
                    await usersApi.toggleFavorite(event._id)
                    setFavorites(prev => prev.filter(f => f._id !== event._id))
                  }}
                />
              ))}
              </div>
            )
          ) : null}
        </section>
      </div>
    </PageLayout>
  )
}

export default ProfilePage
