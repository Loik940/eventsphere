# EventSphere 

✨ **[Visiter le site en ligne (Live Demo)](https://eventsphere-blush.vercel.app/)** ✨

EventSphere est une plateforme web moderne dédiée à la découverte, la création et la gestion d'événements (hackathons, conférences, ateliers, séminaires, etc.). Conçue avec une interface utilisateur premium et intuitive, elle permet aux utilisateurs de s'inscrire facilement aux événements qui les passionnent et aux organisateurs de gérer leur audience.

## Fonctionnalités clés

- **Exploration d'événements :** Parcourez les événements disponibles, filtrez par catégorie ou par statut (à venir/passés).
- **Création d'événements :** Interface fluide pour publier un nouvel événement (avec prise en charge d'images de couverture via URL).
- **Gestion des inscriptions :** Inscrivez-vous en un clic, consultez vos événements à venir, ou annulez votre participation.
- **Tableau de bord et Profil :** Suivi en temps réel de votre activité, de vos statistiques et de vos événements créés.
- **Sécurité :** Authentification par JWT et mots de passe cryptés.

---

## 🛠️ Stack Technique

### Frontend
- **Framework :** React 19 (via Vite)
- **Langage :** TypeScript
- **Styling :** TailwindCSS
- **State Management :** Zustand
- **Routing :** React Router DOM
- **Icônes :** Lucide React
- **Requêtes HTTP :** Axios

### Backend
- **Serveur :** Node.js avec Express.js
- **Langage :** TypeScript
- **Base de données :** MongoDB (via Mongoose)
- **Validation :** Zod
- **Authentification :** JSON Web Token (JWT) & bcrypt

---

## 🚀 Comment lancer le projet en local

Suivez ces étapes pour exécuter EventSphere sur votre machine.

### 1. Prérequis
Assurez-vous d'avoir installé sur votre ordinateur :
- **[Node.js](https://nodejs.org/)** (version 18 ou supérieure recommandée)
- **[MongoDB](https://www.mongodb.com/try/download/community)** (installé localement ou un cluster distant sur MongoDB Atlas)
- **Git** (pour cloner le projet)

### 2. Cloner le projet
Ouvrez votre terminal et clonez ce dépôt :
```bash
git clone <URL_DU_DEPOT_GITHUB>
cd eventsphere
```

### 3. Configuration du Backend

1. Naviguez dans le dossier backend :
   ```bash
   cd backend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Configurez les variables d'environnement :
   Créez un fichier `.env` à la racine du dossier `backend` et ajoutez-y les informations suivantes :
   ```env
   # Port d'écoute du serveur
   PORT=5000

   # URL de connexion à MongoDB (à adapter si vous utilisez MongoDB Atlas)
   MONGODB_URI=mongodb://127.0.0.1:27017/eventsphere

   # Clé secrète pour générer les tokens (mettez une chaîne de caractères aléatoire sécurisée)
   JWT_SECRET=super_secret_jwt_key_a_changer_en_production

   # URL du frontend pour autoriser les requêtes CORS
   CORS_ORIGIN=http://localhost:5173
   ```
4. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
   *Le backend devrait maintenant tourner sur `http://localhost:5000`.*

### 4. Configuration du Frontend

1. Ouvrez un **nouveau terminal**, puis naviguez dans le dossier frontend depuis la racine du projet :
   ```bash
   cd frontend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Configurez les variables d'environnement :
   Créez un fichier `.env` à la racine du dossier `frontend` et ajoutez :
   ```env
   # URL de l'API backend
   VITE_API_URL=http://localhost:5000/api
   ```
4. Lancez le serveur frontend :
   ```bash
   npm run dev
   ```
   *Le frontend sera accessible sur `http://localhost:5173`.*

---

## 🎯 Utilisation

1. Ouvrez votre navigateur sur `http://localhost:5173`.
2. Créez un compte via la page d'inscription.
3. Explorez les événements, créez-en de nouveaux et testez les flux d'inscription !

## Contribution
Les contributions sont les bienvenues. N'hésitez pas à ouvrir une *Issue* ou à soumettre une *Pull Request*.

##  Licence
Ce projet est sous licence MIT.
