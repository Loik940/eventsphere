// Point d'entree du frontend React. Ce fichier monte l'application dans le DOM et chargera le routeur principal.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/plus-jakarta-sans/400.css'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'
import '@fontsource/instrument-serif/400.css'
import './index.css'
import AppRouter from './routes/AppRouter.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
