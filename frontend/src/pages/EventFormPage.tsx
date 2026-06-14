/**
 * Page formulaire d'evenement.
 * Elle servira a creer un nouvel evenement ou a modifier un evenement existant.
 */
import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import eventsApi from '../api/events.api'
import { PageLayout } from '../components/layout'
import { Button, Input } from '../components/ui'
import type { CreateEventPayload } from '../types/event.types'

const CATEGORIES = [
  'Atelier',
  'Conférence',
  'Hackathon',
  'Séminaire',
  'Formation',
  'Networking',
  'Autre',
]

type FormErrors = Partial<Record<keyof CreateEventPayload | 'general', string>>

function EventFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [imageUrl, setImageUrl] = useState('')
  const [maxParticipants, setMaxParticipants] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(isEditMode)
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    if (!id) return

    setIsFetching(true)
    eventsApi
      .getEventById(id)
      .then((event) => {
        setTitle(event.title)
        setDescription(event.description)
        // Formater la date ISO en format datetime-local (YYYY-MM-DDTHH:mm)
        setDate(new Date(event.date).toISOString().slice(0, 16))
        setLocation(event.location)
        setCategory(event.category)
        setImageUrl(event.imageUrl ?? '')
        setMaxParticipants(event.maxParticipants?.toString() ?? '')
      })
      .catch(() => {
        setErrors({ general: 'Impossible de charger les données de cet événement.' })
      })
      .finally(() => setIsFetching(false))
  }, [id])

  const validate = (): boolean => {
    const next: FormErrors = {}

    if (title.trim().length < 3) next.title = 'Le titre doit contenir au moins 3 caractères'
    if (description.trim().length < 10) next.description = 'La description doit contenir au moins 10 caractères'
    if (!date) next.date = 'La date est obligatoire'
    else if (new Date(date) <= new Date()) next.date = 'La date doit être dans le futur'
    if (location.trim().length < 2) next.location = 'Le lieu doit contenir au moins 2 caractères'
    if (maxParticipants && Number(maxParticipants) < 1) {
      next.maxParticipants = 'La capacité doit être un nombre positif'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    setErrors({})

    const payload: CreateEventPayload = {
      title: title.trim(),
      description: description.trim(),
      date: new Date(date).toISOString(),
      location: location.trim(),
      category,
      ...(imageUrl.trim() ? { imageUrl: imageUrl.trim() } : {}),
      ...(maxParticipants ? { maxParticipants: Number(maxParticipants) } : {}),
    }

    try {
      if (isEditMode && id) {
        await eventsApi.updateEvent(id, payload)
        navigate(`/events/${id}`)
      } else {
        const created = await eventsApi.createEvent(payload)
        navigate(`/events/${created._id}`)
      }
    } catch (_err) {
      setErrors({ general: 'Une erreur est survenue. Veuillez réessayer.' })
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <PageLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#4F46E5] border-t-transparent" />
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="mx-auto max-w-2xl px-6 py-10 md:px-10">
        <header className="mb-8">
          <h1 className="font-serif text-4xl text-[#0F172A]">
            {isEditMode ? 'Modifier l\'événement' : 'Créer un événement'}
          </h1>
          <p className="mt-2 text-sm text-[#64748B]">
            {isEditMode
              ? 'Mettez à jour les informations de votre événement.'
              : 'Renseignez les informations pour publier votre événement.'}
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-[#ECEAE4] bg-white p-8 shadow-sm"
        >
          <Input
            label="Titre de l'événement"
            placeholder="Ex : Atelier React avancé"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
          />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
              Description
            </label>
            <textarea
              rows={5}
              placeholder="Décrivez votre événement en détail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full rounded-xl border px-4 py-3 text-sm text-[#0F172A] outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 ${
                errors.description ? 'border-[#DC2626]' : 'border-[#ECEAE4]'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-[#DC2626]">{errors.description}</p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
                Catégorie
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-[#ECEAE4] bg-white px-4 py-3 text-sm text-[#0F172A] outline-none transition-colors focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Capacité maximale"
              placeholder="Ex : 40"
              type="number"
              min="1"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              error={errors.maxParticipants}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Date et heure"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              error={errors.date}
            />

            <Input
              label="Lieu"
              placeholder="Ex : IFRI, Cotonou"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              error={errors.location}
            />
          </div>

          <Input
            label="URL de l'image (optionnel)"
            placeholder="https://exemple.com/image.jpg"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          {errors.general && (
            <p className="rounded-lg bg-[#FEF2F2] px-4 py-3 text-sm text-[#DC2626]">
              {errors.general}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => navigate(-1)}
            >
              Annuler
            </Button>
            <Button type="submit" variant="primary" size="md" isLoading={isLoading}>
              {isEditMode ? 'Enregistrer les modifications' : 'Publier l\'événement'}
            </Button>
          </div>
        </form>
      </div>
    </PageLayout>
  )
}

export default EventFormPage
