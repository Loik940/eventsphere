# EventSphere — Frontend

Une plateforme moderne de gestion d'événements.

## Stack technique
- React 19
- TypeScript
- Vite
- TailwindCSS
- Zustand
- Axios
- React Router DOM
- Lucide React

## Configuration locale

### 1. Installation

```bash
npm install
```

### 2. Variables d'environnement

Créer un fichier `.env` à la racine de `frontend` avec :

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Lancer en développement

Assurez-vous que le backend (port 5000) est lancé en parallèle.

```bash
npm run dev
```

## Structure clé

- `/src/pages` : Les pages principales (Dashboard, EventDetail, EventForm, Events, Login, Profile, Register).
- `/src/api` : Clients API basés sur axios.
- `/src/store` : États globaux avec Zustand (`authStore`, `filtersStore`, `toastStore`).
- `/src/components` : Composants réutilisables (UI) et composants spécifiques.
- `/src/types` : Typages TypeScript stricts correspondants aux schémas Mongoose du backend.

## Déploiement

Ce projet est prêt à être déployé sur **Vercel** ou **Netlify**.
N'oubliez pas de configurer la variable d'environnement `VITE_API_URL` pointant vers votre backend de production lors du déploiement.
