/**
 * Page 404.
 * Elle sera affichee lorsqu'une route frontend inconnue est demandee.
 */
import { useNavigate } from 'react-router-dom'

import { PageLayout } from '../components/layout'
import { Button } from '../components/ui'

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <PageLayout>
      <section className="mx-auto flex min-h-[calc(100vh-64px)] max-w-3xl flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="font-serif text-[96px] leading-none text-[#0F172A] md:text-[140px]">404</h1>
        <p className="mt-4 text-2xl font-semibold text-[#0F172A]">Page introuvable</p>
        <Button className="mt-8" size="lg" onClick={() => navigate('/')}>
          Retour à l'accueil
        </Button>
      </section>
    </PageLayout>
  )
}

export default NotFoundPage
