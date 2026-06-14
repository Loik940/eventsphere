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
