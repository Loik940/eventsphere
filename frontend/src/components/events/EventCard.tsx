import { CalendarDays, Heart, MapPin } from 'lucide-react'

import { Badge } from '../ui'

type EventCardProps = {
  id: string
  title: string
  category: string
  imageUrl?: string
  date: string | Date
  location: string
  organizer: {
    name: string
  }
  currentParticipants: number
  maxParticipants?: number
  isRegistered: boolean
  onRegister: (id: string) => void
  onToggleFavorite?: (id: string) => void
  onClick?: () => void
}

const categoryAccents: Record<string, string> = {
  hackathon: '#4F46E5',
  atelier: '#10B981',
  conference: '#F97316',
  seminaire: '#9333EA',
  culturel: '#F43F5E',
  sport: '#F59E0B',
}

const normalizeCategory = (category: string): string =>
  category
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const getAccentColor = (category: string): string =>
  categoryAccents[normalizeCategory(category)] ?? '#94A3B8'

const formatEventDate = (date: string | Date): string => {
  const parsedDate = date instanceof Date ? date : new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return String(date)
  }

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate)
}

const getInitials = (name: string): string => {
  const [firstName, lastName] = name.trim().split(' ')
  const firstInitial = firstName?.charAt(0) ?? ''
  const lastInitial = lastName?.charAt(0) ?? ''

  return `${firstInitial}${lastInitial}`.toUpperCase() || 'ES'
}

function EventCard({
  id,
  title,
  category,
  imageUrl,
  date,
  location,
  organizer,
  currentParticipants,
  maxParticipants,
  isRegistered,
  onRegister,
  onToggleFavorite,
  onClick,
}: EventCardProps) {
  const accentColor = getAccentColor(category)
  const isFull = maxParticipants !== undefined && currentParticipants >= maxParticipants
  const progress = maxParticipants ? Math.min((currentParticipants / maxParticipants) * 100, 100) : 100
  const participantText = `${currentParticipants}/${maxParticipants ?? '∞'}`
  const actionLabel = isRegistered ? 'Inscrit ✓' : isFull ? 'Complet' : 'Participer'
  const actionClasses = isRegistered
    ? 'bg-[#ECFDF5] text-[#065F46]'
    : isFull
      ? 'bg-[#FEF2F2] text-[#DC2626] disabled:cursor-not-allowed'
      : 'bg-[#EEF2FF] text-[#4F46E5] hover:bg-[#E0E7FF]'

  const handleRegister = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isRegistered && !isFull) {
      onRegister(id)
    }
  }

  return (
    <article 
      onClick={onClick}
      className={`overflow-hidden rounded-2xl border border-[#ECEAE4] bg-white transition-shadow ${onClick ? 'cursor-pointer hover:shadow-md' : ''}`}
    >
      {imageUrl ? (
        <div className="h-[140px] w-full bg-[#F4F3F0]">
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="h-[140px] w-full" style={{ backgroundColor: accentColor }} />
      )}

      <div className="p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Badge category={category} />
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(id); }}
            disabled={!onToggleFavorite}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#0F172A] transition-colors hover:bg-[#F4F3F0] disabled:cursor-default disabled:hover:bg-transparent"
            aria-label="Ajouter aux favoris"
          >
            <Heart size={20} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <h3 className="mb-3 line-clamp-2 text-sm font-semibold leading-snug text-[#0F172A]">
          {title}
        </h3>

        <div className="space-y-2">
          <p className="flex items-center gap-2 text-xs text-[#64748B]">
            <CalendarDays size={13} strokeWidth={2} aria-hidden="true" />
            <span>{formatEventDate(date)}</span>
          </p>
          <p className="flex items-center gap-2 text-xs text-[#64748B]">
            <MapPin size={13} strokeWidth={2} aria-hidden="true" />
            <span>{location}</span>
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F4F3F0] text-[9px] font-semibold text-[#0F172A]">
            {getInitials(organizer.name)}
          </span>
          <span className="text-[11px] text-[#64748B]">Organisé par {organizer.name}</span>
        </div>
      </div>

      <footer className="flex items-center justify-between gap-4 border-t border-[#ECEAE4] bg-[#F9F8F6] px-4 py-2.5">
        <div className="min-w-0">
          <div className="h-1 w-14 overflow-hidden rounded-full bg-[#ECEAE4]">
            <div
              className="h-full rounded-full"
              style={{ width: `${progress}%`, backgroundColor: accentColor }}
            />
          </div>
          <p className="mt-1 text-[10px] text-[#64748B]">{participantText}</p>
        </div>

        <button
          type="button"
          onClick={handleRegister}
          disabled={isFull && !isRegistered}
          className={`rounded-[10px] px-4 py-2 text-xs font-semibold transition-colors ${actionClasses} ${isRegistered ? 'cursor-default' : ''}`}
        >
          {actionLabel}
        </button>
      </footer>
    </article>
  )
}

export default EventCard
