import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import authApi from '../api/auth.api'
import { Button, Input } from '../components/ui'

type RegisterErrors = {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  general?: string
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.24-.16-1.82H9v3.44h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.6z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.2l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.97 10.7A5.41 5.41 0 0 1 3.68 9c0-.59.1-1.16.29-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.03l3.01-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.34l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97L3.97 7.3C4.68 5.16 6.66 3.58 9 3.58z" />
    </svg>
  )
}

function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<RegisterErrors>({})
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = (): boolean => {
    const nextErrors: RegisterErrors = {}

    if (name.trim().length < 2) {
      nextErrors.name = 'Le nom doit contenir au moins 2 caractères'
    }

    if (!email.trim()) {
      nextErrors.email = 'Email obligatoire'
    }

    if (password.length < 6) {
      nextErrors.password = 'Le mot de passe doit contenir au moins 6 caractères'
    }

    if (confirmPassword !== password) {
      nextErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      await authApi.register({ name, email, password })
      setIsSuccess(true)
      setTimeout(() => navigate('/login'), 1500)
    } catch (_error) {
      setErrors({ general: 'Création du compte impossible. Réessayez plus tard.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F9F8F6] px-5 py-10">
      <div className="w-full max-w-[420px]">
        <div className="mb-10 text-center">
          <h1 className="font-serif text-[52px] leading-none text-black">EventSphere</h1>
          <h2 className="mt-8 text-[28px] font-semibold leading-tight text-[#0F172A]">
            Créer un compte
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[20px] border border-[#ECEAE4] bg-white p-8 shadow-sm"
        >
          <Button variant="secondary" size="lg" className="w-full" type="button">
            <GoogleIcon />
            Continuer avec Google
          </Button>

          <div className="my-8 flex items-center gap-4 text-sm text-[#64748B]">
            <span className="h-px flex-1 bg-[#ECEAE4]" />
            <span>ou</span>
            <span className="h-px flex-1 bg-[#ECEAE4]" />
          </div>

          <div className="space-y-5">
            <Input
              label="Nom"
              placeholder="Votre nom"
              value={name}
              onChange={(event) => setName(event.target.value)}
              error={errors.name}
            />
            <Input
              label="Email"
              placeholder="nom@exemple.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={errors.email}
            />
            <Input
              label="Mot de passe"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={errors.password}
            />
            <Input
              label="Confirmer le mot de passe"
              placeholder="••••••••"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              error={errors.confirmPassword}
            />
          </div>

          {errors.general && <p className="mt-4 text-sm text-[#DC2626]">{errors.general}</p>}
          {isSuccess && (
            <p className="mt-4 text-sm font-medium text-[#065F46]">
              Compte créé ! Redirection en cours...
            </p>
          )}

          <Button type="submit" variant="primary" size="lg" className="mt-8 w-full" isLoading={isLoading}>
            Créer mon compte
          </Button>
        </form>

        <p className="mt-10 text-center text-lg text-[#64748B]">
          Déjà un compte ?{' '}
          <Link to="/login" className="font-semibold text-[#4F46E5]">
            Se connecter
          </Link>
        </p>
      </div>
    </main>
  )
}

export default RegisterPage
