import { useState } from 'react'
import { ArrowLeft, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

import { PageLayout } from '../components/layout'
import { Button } from '../components/ui'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'}/auth/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email.trim() }),
        },
      )
      
      const json = await response.json()

      if (!response.ok) {
        throw new Error(json.message ?? "Erreur lors de l'envoi")
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
            <Link to="/login" className="inline-flex items-center text-sm font-medium text-[#64748B] hover:text-[#0F172A] mb-6">
              <ArrowLeft size={16} className="mr-2" />
              Retour à la connexion
            </Link>
            <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">Mot de passe oublié ?</h2>
            <p className="mt-3 text-sm text-[#64748B]">
              Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>
          </div>

          {success ? (
            <div className="rounded-2xl bg-[#ECFDF5] p-6 text-center">
              <Mail className="mx-auto h-12 w-12 text-[#065F46]" />
              <h3 className="mt-4 text-lg font-semibold text-[#065F46]">Vérifiez votre boîte de réception</h3>
              <p className="mt-2 text-sm text-[#065F46]">
                Si un compte est associé à cette adresse e-mail, nous vous avons envoyé les instructions pour réinitialiser votre mot de passe. Pensez à vérifier vos courriers indésirables (spams).
              </p>
            </div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-xl bg-[#FEF2F2] px-4 py-3 text-sm text-[#DC2626]">{error}</div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#0F172A]">
                  Adresse e-mail
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-xl border border-[#ECEAE4] px-4 py-3 text-[#0F172A] outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20"
                    placeholder="vous@exemple.com"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Envoyer le lien
              </Button>
            </form>
          )}
        </div>
      </div>
    </PageLayout>
  )
}

export default ForgotPasswordPage
