import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

import { PageLayout } from '../components/layout'
import { Button } from '../components/ui'

function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'}/auth/reset-password/${token}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password }),
        },
      )
      
      const json = await response.json()

      if (!response.ok) {
        throw new Error(json.message ?? 'Erreur lors de la réinitialisation')
      }

      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageLayout>
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#ECEAE4] sm:p-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">Nouveau mot de passe</h2>
            <p className="mt-3 text-sm text-[#64748B]">
              Choisissez un nouveau mot de passe sécurisé pour votre compte.
            </p>
          </div>

          {success ? (
            <div className="rounded-2xl bg-[#ECFDF5] p-6 text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-[#065F46]" />
              <h3 className="mt-4 text-lg font-semibold text-[#065F46]">Mot de passe mis à jour !</h3>
              <p className="mt-2 text-sm text-[#065F46]">
                Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
              </p>
              <Link to="/login" className="mt-6 inline-block w-full rounded-xl bg-[#065F46] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#065F46]/90">
                Aller à la connexion
              </Link>
            </div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-xl bg-[#FEF2F2] px-4 py-3 text-sm text-[#DC2626]">{error}</div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-[#0F172A]">
                    Nouveau mot de passe
                  </label>
                  <div className="mt-2">
                    <input
                      id="new-password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-xl border border-[#ECEAE4] px-4 py-3 text-[#0F172A] outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-[#0F172A]">
                    Confirmer le mot de passe
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirm-password"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full rounded-xl border border-[#ECEAE4] px-4 py-3 text-[#0F172A] outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Réinitialiser
              </Button>
            </form>
          )}
        </div>
      </div>
    </PageLayout>
  )
}

export default ResetPasswordPage
