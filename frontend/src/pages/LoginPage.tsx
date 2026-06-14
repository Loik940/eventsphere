import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import authApi from '../api/auth.api'
import { Button, Input } from '../components/ui'
import { useAuthStore } from '../store/auth.store'

type LoginErrors = {
  email?: string
  password?: string
  general?: string
}


function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<LoginErrors>({})

  const validateForm = (): boolean => {
    const nextErrors: LoginErrors = {}

    if (!email.trim()) {
      nextErrors.email = 'Email obligatoire'
    }

    if (!password) {
      nextErrors.password = 'Mot de passe obligatoire'
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
      const result = await authApi.login({ email, password })
      login(result.token, result.user)
      navigate('/dashboard')
    } catch (_error) {
      setErrors({ general: 'Connexion impossible. Vérifiez vos informations.' })
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
            Bienvenue sur EventSphere
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[20px] border border-[#ECEAE4] bg-white p-8 shadow-sm"
        >
          <div className="space-y-5">
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
          </div>

          <div className="mt-4 flex justify-end">
            <Link to="/forgot-password" className="text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA]">
              Mot de passe oublié ?
            </Link>
          </div>

          {errors.general && <p className="mt-4 text-sm text-[#DC2626]">{errors.general}</p>}

          <Button type="submit" variant="primary" size="lg" className="mt-8 w-full" isLoading={isLoading}>
            Se connecter
          </Button>
        </form>

        <p className="mt-10 text-center text-lg text-[#64748B]">
          Pas encore de compte ?{' '}
          <Link to="/register" className="font-semibold text-[#4F46E5]">
            S'inscrire
          </Link>
        </p>
      </div>
    </main>
  )
}

export default LoginPage
