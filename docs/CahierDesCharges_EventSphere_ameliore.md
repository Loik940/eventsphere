# Cahier des charges - EventSphere


**Projet :** EventSphere

**Sous-titre :** Plateforme de gestion d'événements d'apprentissage communautaires

**Type de projet :** Projet de fin de formation

**Formation :** React.js / Node.js 



## 2. Contexte et problème identifié

### 2.1 Contexte général

Dans les écoles, centres de formation et communautés d'apprentissage en Afrique, les événements pédagogiques jouent un rôle important dans la progression des apprenants. Ateliers, hackathons, conférences, séminaires, formations courtes et rencontres communautaires permettent aux étudiants de pratiquer, réseauter, découvrir des opportunités et renforcer leurs compétences.

Cependant, la gestion de ces événements reste souvent dispersée. Les annonces passent par des groupes WhatsApp, des affiches papier, des messages privés ou des communications orales. Ces canaux sont utiles pour diffuser rapidement une information, mais ils ne permettent pas de suivre correctement les inscriptions, la participation réelle et l'historique des apprenants.

### 2.2 Problème principal

Les étudiants et apprenants ne disposent pas d'un outil numérique centralisé pour découvrir, rechercher, s'inscrire et suivre les événements pédagogiques de leur communauté. De leur côté, les organisateurs manquent d'un espace simple pour publier leurs événements, gérer les inscriptions et connaître le nombre réel de participants.

### 2.3 Problèmes spécifiques

- Les informations d'événements se perdent rapidement dans les conversations WhatsApp.
- Les apprenants ne peuvent pas facilement filtrer les événements selon leur catégorie, leur date ou leur pertinence.
- Les organisateurs n'ont pas toujours une liste fiable des personnes inscrites.
- Les inscriptions sont souvent informelles, sans statut clair ni confirmation.
- Les participants n'ont pas d'historique centralisé de leurs participations.
- Les événements complets ou annulés sont parfois encore relayés sans mise à jour claire.
- Les communautés locales manquent d'un outil léger, accessible et adapté à leur réalité numérique.

### 2.4 Public touché

- Étudiants en formation technique, numérique ou professionnelle.
- Apprenants en autoformation recherchant des ateliers, conférences ou opportunités de networking.
- Clubs universitaires, communautés tech, associations étudiantes et centres de formation.
- Formateurs et organisateurs souhaitant gérer leurs événements plus efficacement.

### 2.5 Conséquences du problème

- Baisse du taux de participation à certains événements par manque de visibilité.
- Difficulté à prévoir la logistique : salle, places, supports, encadrement.
- Perte d'opportunités pour les apprenants intéressés.
- Absence de données fiables pour mesurer l'engagement de la communauté.
- Expérience utilisateur peu structurée pour les étudiants comme pour les organisateurs.

---

## 3. Objectifs du projet

### 3.1 Objectif général

Développer une application web full-stack permettant aux communautés d'apprentissage de publier, découvrir, gérer et suivre des événements pédagogiques de manière centralisée, simple et accessible.

### 3.2 Objectifs spécifiques

- Permettre à un utilisateur de créer un compte et de se connecter de façon sécurisée.
- Permettre à un organisateur de créer, modifier et supprimer ses propres événements.
- Permettre aux apprenants de consulter les événements disponibles et de s'y inscrire.
- Empêcher les inscriptions en double à un même événement.
- Gérer la capacité maximale des événements.
- Permettre la recherche et le filtrage par mot-clé, catégorie et date.
- Fournir à chaque utilisateur un tableau de bord avec ses événements créés et ses inscriptions.
- Afficher un historique clair des participations passées.
- Construire une interface responsive, utilisable sur ordinateur et mobile.
- Déployer le frontend et le backend sur des plateformes accessibles gratuitement.

### 3.3 Indicateurs de réussite

Le projet sera considéré comme réussi si :

- Un utilisateur peut créer un compte, se connecter et gérer son profil.
- Un événement peut être créé, affiché, modifié et supprimé par son organisateur.
- Un apprenant peut s'inscrire à un événement puis annuler sa participation.
- Le système bloque les inscriptions en double.
- Le nombre de participants affiché correspond aux inscriptions actives.
- Les filtres et la recherche retournent des résultats cohérents.
- Le tableau de bord affiche correctement les événements créés et les inscriptions de l'utilisateur.
- L'application fonctionne correctement sur mobile et desktop.
- Le projet est documenté et déployable.

---

## 4. Description de la solution

### 4.1 Nom de la solution

**EventSphere** - Plateforme de gestion d'événements d'apprentissage communautaires.

### 4.2 Présentation synthétique

EventSphere est une application web permettant à des étudiants, apprenants, formateurs et communautés éducatives de centraliser leurs événements d'apprentissage. La plateforme permet de publier des événements, consulter les détails, filtrer les résultats, s'inscrire, annuler une participation et suivre son historique depuis un tableau de bord personnel.

### 4.3 Valeur ajoutée

Contrairement aux outils généralistes comme Facebook Events ou Eventbrite, EventSphere est pensé pour les communautés apprenantes locales. L'application met l'accent sur la simplicité, la légèreté, la clarté des inscriptions et la continuité du parcours pédagogique de l'apprenant.

### 4.4 Bénéfices attendus

Pour les apprenants :

- Accès centralisé aux événements utiles pour leur progression.
- Inscription simple et rapide.
- Historique personnel des participations.
- Meilleure visibilité sur les événements à venir.

Pour les organisateurs :

- Création et gestion simplifiées des événements.
- Liste fiable des participants.
- Suivi du nombre d'inscrits.
- Meilleure anticipation logistique.

Pour les communautés :

- Meilleure circulation de l'information.
- Valorisation des initiatives locales.
- Données utiles pour améliorer l'organisation des activités pédagogiques.

---

## 5. Périmètre du projet

### 5.1 Fonctionnalités incluses dans la version 1

- Authentification par email et mot de passe.
- Gestion du profil utilisateur.
- Création, modification, suppression et consultation des événements.
- Système d'inscription et d'annulation de participation.
- Vérification de la capacité maximale d'un événement.
- Recherche par titre ou mot-clé.
- Filtrage par catégorie et par date.
- Pagination de la liste des événements.
- Tableau de bord utilisateur.
- Historique des participations.
- Interface responsive.
- Validation des données côté backend.
- Gestion centralisée des erreurs API.
- Déploiement frontend et backend.

### 5.2 Fonctionnalités hors périmètre pour la version 1

Ces fonctionnalités sont importantes, mais ne seront pas obligatoires dans la première version afin de garder un périmètre réaliste :

- Paiement en ligne.
- Application mobile native.
- Messagerie instantanée entre participants.
- Notifications email automatiques.
- Upload d'images de couverture.
- QR code de présence.
- Système de certification ou badges.
- Intelligence artificielle de recommandation.
- Administration avancée multi-rôles.

---

## 6. Utilisateurs, rôles et permissions

### 6.1 Types d'utilisateurs

| Rôle | Description |
|---|---|
| Visiteur | Utilisateur non connecté pouvant consulter la liste publique et le détail des événements. |
| Utilisateur connecté | Apprenant pouvant s'inscrire aux événements, annuler une participation et consulter son historique. |
| Organisateur | Utilisateur connecté qui crée un événement. Il peut gérer uniquement ses propres événements. |
| Administrateur | Rôle prévu pour une évolution future, non prioritaire en version 1. |

### 6.2 Permissions principales

| Action | Visiteur | Utilisateur connecté | Organisateur |
|---|---:|---:|---:|
| Voir la liste des événements | Oui | Oui | Oui |
| Voir le détail d'un événement | Oui | Oui | Oui |
| Créer un compte | Oui | Non | Non |
| Se connecter | Oui | Non | Non |
| Créer un événement | Non | Oui | Oui |
| Modifier son événement | Non | Non | Oui |
| Supprimer son événement | Non | Non | Oui |
| S'inscrire à un événement | Non | Oui | Oui |
| Annuler sa participation | Non | Oui | Oui |
| Voir son dashboard | Non | Oui | Oui |

### 6.3 Règle de rôle retenue pour le MVP

Dans la version 1, il n'est pas nécessaire de créer un rôle séparé `organisateur`. Tout utilisateur connecté peut créer un événement. Il devient automatiquement organisateur des événements qu'il crée et ne peut modifier ou supprimer que ces événements.

---

## 7. Exigences fonctionnelles détaillées

### 7.1 Authentification et sécurité du compte

| ID | Fonctionnalité | Priorité | Critère d'acceptation |
|---|---|---|---|
| AUTH-01 | Inscription avec nom, email et mot de passe | Obligatoire | Un compte est créé si les données sont valides et si l'email n'existe pas déjà. |
| AUTH-02 | Hachage du mot de passe | Obligatoire | Aucun mot de passe en clair n'est stocké en base de données. |
| AUTH-03 | Connexion utilisateur | Obligatoire | L'utilisateur reçoit un token JWT après une connexion réussie. |
| AUTH-04 | Protection des routes privées | Obligatoire | Les routes protégées refusent les requêtes sans token valide. |
| AUTH-05 | Déconnexion côté client | Obligatoire | Le token est supprimé et l'utilisateur revient à un état non connecté. |
| AUTH-06 | Affichage du profil | Obligatoire | L'utilisateur connecté peut voir ses informations de base. |

### 7.2 Gestion du profil utilisateur

| ID | Fonctionnalité | Priorité | Critère d'acceptation |
|---|---|---|---|
| PROF-01 | Consulter son profil | Obligatoire | Le nom, l'email et l'avatar éventuel sont affichés. |
| PROF-02 | Historique des participations | Obligatoire | Les événements passés ou annulés liés à l'utilisateur sont listés. |
| PROF-03 | Modification simple du profil | Optionnel v1 | L'utilisateur peut modifier son nom et son avatar si la fonctionnalité est disponible. |

### 7.3 Gestion des événements

| ID | Fonctionnalité | Priorité | Critère d'acceptation |
|---|---|---|---|
| EVT-01 | Créer un événement | Obligatoire | Un utilisateur connecté peut créer un événement avec les champs requis. |
| EVT-02 | Lister les événements | Obligatoire | La liste affiche les événements avec titre, date, lieu, catégorie et nombre d'inscrits. |
| EVT-03 | Voir le détail d'un événement | Obligatoire | La page détail affiche toutes les informations utiles et l'état d'inscription de l'utilisateur. |
| EVT-04 | Modifier un événement | Obligatoire | Seul l'organisateur de l'événement peut le modifier. |
| EVT-05 | Supprimer un événement | Obligatoire | Seul l'organisateur de l'événement peut le supprimer. |
| EVT-06 | Gérer la capacité maximale | Obligatoire | Le système bloque une inscription si la capacité active est atteinte. |
| EVT-07 | Statut temporel | Obligatoire | Un événement est identifié comme à venir ou passé selon sa date. |

Champs obligatoires d'un événement :

- Titre.
- Description.
- Date et heure.
- Lieu ou indication en ligne.
- Catégorie.
- Capacité maximale.
- Organisateur.

Catégories proposées :

- Atelier.
- Conférence.
- Hackathon.
- Séminaire.
- Formation.
- Networking.
- Autre.

### 7.4 Système d'inscription

| ID | Fonctionnalité | Priorité | Critère d'acceptation |
|---|---|---|---|
| REG-01 | S'inscrire à un événement | Obligatoire | Un utilisateur connecté peut s'inscrire si l'événement existe, n'est pas passé et n'est pas complet. |
| REG-02 | Empêcher les doublons | Obligatoire | Un utilisateur ne peut pas avoir deux inscriptions actives au même événement. |
| REG-03 | Annuler sa participation | Obligatoire | Le statut de l'inscription passe à `annulé`. |
| REG-04 | Se réinscrire après annulation | Recommandé | Une inscription annulée peut redevenir active si l'événement n'est pas complet. |
| REG-05 | Compter les participants | Obligatoire | Le compteur inclut uniquement les inscriptions avec le statut `participe`. |
| REG-06 | Voir la liste des inscrits | Recommandé | L'organisateur peut consulter les inscrits à son événement. |

Statuts d'inscription :

- `participe` : l'utilisateur est inscrit.
- `annulé` : l'utilisateur a annulé sa participation.

### 7.5 Recherche, filtres et pagination

| ID | Fonctionnalité | Priorité | Critère d'acceptation |
|---|---|---|---|
| SRCH-01 | Recherche par mot-clé | Obligatoire | La recherche filtre les événements selon le titre et éventuellement la description. |
| SRCH-02 | Filtre par catégorie | Obligatoire | L'utilisateur peut afficher uniquement une catégorie donnée. |
| SRCH-03 | Filtre par date | Obligatoire | L'utilisateur peut afficher les événements à venir ou passés. |
| SRCH-04 | Pagination | Obligatoire | Les résultats sont paginés pour éviter une liste trop longue. |
| SRCH-05 | État vide | Obligatoire | Un message clair est affiché si aucun événement ne correspond aux filtres. |

### 7.6 Dashboard utilisateur

| ID | Fonctionnalité | Priorité | Critère d'acceptation |
|---|---|---|---|
| DASH-01 | Vue des événements créés | Obligatoire | L'utilisateur voit les événements dont il est l'organisateur. |
| DASH-02 | Vue des inscriptions | Obligatoire | L'utilisateur voit ses inscriptions actives et passées. |
| DASH-03 | Actions rapides | Obligatoire | L'utilisateur peut modifier ou supprimer ses événements depuis le dashboard. |
| DASH-04 | Statistiques simples | Recommandé | Le dashboard affiche le nombre d'événements créés et d'inscriptions actives. |

### 7.7 Gestion des erreurs et retours utilisateur

| ID | Fonctionnalité | Priorité | Critère d'acceptation |
|---|---|---|---|
| ERR-01 | Messages de validation | Obligatoire | Les champs invalides affichent un message compréhensible. |
| ERR-02 | Erreurs API centralisées | Obligatoire | Les erreurs backend retournent un format JSON cohérent. |
| ERR-03 | États de chargement | Obligatoire | Les actions longues affichent un indicateur de chargement. |
| ERR-04 | États de succès | Recommandé | Les actions réussies affichent une confirmation discrète. |

---

## 8. Règles métier

- Un email ne peut être associé qu'à un seul compte utilisateur.
- Un événement appartient à un seul organisateur.
- Seul l'organisateur peut modifier ou supprimer son événement.
- Un utilisateur ne peut pas s'inscrire deux fois activement au même événement.
- Une inscription annulée ne doit pas être comptée comme une participation active.
- Un événement passé ne devrait plus accepter de nouvelles inscriptions.
- Un événement complet ne doit plus accepter de nouvelles inscriptions.
- La capacité maximale doit être un nombre positif.
- La date d'un événement doit être valide.
- Les données envoyées à l'API doivent être validées avant tout traitement.
- Les routes de création, modification, suppression et inscription doivent être protégées par authentification.

---

## 9. Exigences non fonctionnelles

### 9.1 Performance

- La liste des événements doit se charger rapidement pour un volume raisonnable de données.
- La pagination doit limiter le nombre d'éléments renvoyés par requête.
- Les requêtes fréquentes doivent être simples et indexées côté base de données.

### 9.2 Sécurité

- Les mots de passe doivent être hachés avec bcrypt.
- Le JWT doit contenir uniquement les informations nécessaires.
- Les routes privées doivent vérifier l'identité de l'utilisateur.
- Les permissions doivent être contrôlées côté backend, pas uniquement côté frontend.
- Les entrées utilisateur doivent être validées avec Zod.
- Les messages d'erreur ne doivent pas exposer d'informations sensibles.

### 9.3 Accessibilité et ergonomie

- L'interface doit être responsive mobile-first.
- Les boutons importants doivent être visibles et compréhensibles.
- Les contrastes doivent être suffisants.
- Les formulaires doivent avoir des labels clairs.
- Les états vide, chargement et erreur doivent être pris en compte.

### 9.4 Maintenabilité

- Le code doit être organisé en modules clairs.
- Le backend doit respecter une architecture en couches : routes, controllers, services, models.
- Les types TypeScript doivent être explicites.
- Les validations doivent être centralisées autant que possible.
- Les variables sensibles doivent être stockées dans des fichiers `.env` non versionnés.

### 9.5 Compatibilité

- L'application doit fonctionner sur les navigateurs modernes : Chrome, Edge, Firefox.
- L'interface doit être utilisable sur mobile, tablette et ordinateur.

---

## 10. Architecture technique

### 10.1 Architecture générale

EventSphere suit une architecture client-serveur en trois couches :

- **Frontend :** application React.js + TypeScript servie par Vercel.
- **Backend :** API REST Node.js + Express + TypeScript servie par Render.
- **Base de données :** MongoDB Atlas.

### 10.2 Architecture backend

Structure recommandée :

```text
backend/
  src/
    config/
      db.ts
      env.ts
    controllers/
      auth.controller.ts
      event.controller.ts
      registration.controller.ts
      user.controller.ts
    middlewares/
      auth.middleware.ts
      error.middleware.ts
      validate.middleware.ts
    models/
      user.model.ts
      event.model.ts
      registration.model.ts
    routes/
      auth.routes.ts
      event.routes.ts
      registration.routes.ts
      user.routes.ts
    schemas/
      auth.schema.ts
      event.schema.ts
      registration.schema.ts
    services/
      auth.service.ts
      event.service.ts
      registration.service.ts
      user.service.ts
    types/
      express.d.ts
    app.ts
    server.ts
```

### 10.3 Architecture frontend

Structure recommandée :

```text
frontend/
  src/
    api/
      client.ts
      auth.api.ts
      events.api.ts
      registrations.api.ts
    components/
      layout/
      events/
      forms/
      ui/
    pages/
      HomePage.tsx
      LoginPage.tsx
      RegisterPage.tsx
      EventsPage.tsx
      EventDetailPage.tsx
      EventFormPage.tsx
      DashboardPage.tsx
      ProfilePage.tsx
      NotFoundPage.tsx
    routes/
      AppRouter.tsx
      ProtectedRoute.tsx
    store/
      auth.store.ts
      filters.store.ts
    types/
      auth.types.ts
      event.types.ts
      registration.types.ts
    utils/
      formatDate.ts
    main.tsx
```

### 10.4 Flux général

1. L'utilisateur crée un compte ou se connecte.
2. Le backend valide les données et retourne un JWT.
3. Le frontend stocke le JWT de manière contrôlée côté client.
4. Les requêtes privées envoient le token dans le header `Authorization`.
5. Le middleware d'authentification vérifie le token.
6. Les controllers délèguent la logique métier aux services.
7. Les services interagissent avec les modèles Mongoose.
8. Les réponses sont retournées au frontend au format JSON.

---

## 11. Modélisation des données

### 11.1 Collection `users`

| Champ | Type | Obligatoire | Description |
|---|---|---:|---|
| `_id` | ObjectId | Oui | Identifiant unique. |
| `name` | String | Oui | Nom affiché de l'utilisateur. |
| `email` | String | Oui | Email unique. |
| `password` | String | Oui | Mot de passe haché. |
| `avatar` | String | Non | URL ou chemin de l'avatar. |
| `createdAt` | Date | Oui | Date de création. |
| `updatedAt` | Date | Oui | Date de mise à jour. |

Contraintes :

- Index unique sur `email`.
- Mot de passe jamais retourné dans les réponses API.

### 11.2 Collection `events`

| Champ | Type | Obligatoire | Description |
|---|---|---:|---|
| `_id` | ObjectId | Oui | Identifiant unique. |
| `title` | String | Oui | Titre de l'événement. |
| `description` | String | Oui | Description détaillée. |
| `date` | Date | Oui | Date et heure de l'événement. |
| `location` | String | Oui | Lieu physique ou lien en ligne. |
| `category` | String | Oui | Catégorie de l'événement. |
| `capacity` | Number | Oui | Nombre maximal de participants. |
| `organizer` | ObjectId | Oui | Référence vers `users`. |
| `createdAt` | Date | Oui | Date de création. |
| `updatedAt` | Date | Oui | Date de mise à jour. |

Contraintes :

- `capacity` doit être supérieur à 0.
- `organizer` doit référencer un utilisateur existant.

### 11.3 Collection `registrations`

| Champ | Type | Obligatoire | Description |
|---|---|---:|---|
| `_id` | ObjectId | Oui | Identifiant unique. |
| `user` | ObjectId | Oui | Référence vers `users`. |
| `event` | ObjectId | Oui | Référence vers `events`. |
| `status` | String | Oui | `participe` ou `annulé`. |
| `registeredAt` | Date | Oui | Date d'inscription. |
| `cancelledAt` | Date | Non | Date d'annulation. |
| `createdAt` | Date | Oui | Date de création. |
| `updatedAt` | Date | Oui | Date de mise à jour. |

Contraintes :

- Index unique recommandé sur `{ user, event }`.
- Le compteur de participants prend seulement en compte `status = participe`.

---

## 12. API REST attendue

### 12.1 Authentification

| Méthode | Endpoint | Protégé | Description |
|---|---|---:|---|
| POST | `/api/auth/register` | Non | Créer un compte. |
| POST | `/api/auth/login` | Non | Connecter un utilisateur. |
| GET | `/api/auth/me` | Oui | Récupérer l'utilisateur connecté. |

### 12.2 Utilisateurs

| Méthode | Endpoint | Protégé | Description |
|---|---|---:|---|
| GET | `/api/users/me` | Oui | Récupérer son profil. |
| PATCH | `/api/users/me` | Oui | Modifier son profil, optionnel en v1. |
| GET | `/api/users/me/history` | Oui | Récupérer l'historique de participation. |

### 12.3 Événements

| Méthode | Endpoint | Protégé | Description |
|---|---|---:|---|
| GET | `/api/events` | Non | Lister les événements avec filtres et pagination. |
| GET | `/api/events/:id` | Non | Voir le détail d'un événement. |
| POST | `/api/events` | Oui | Créer un événement. |
| PATCH | `/api/events/:id` | Oui | Modifier son événement. |
| DELETE | `/api/events/:id` | Oui | Supprimer son événement. |
| GET | `/api/events/mine` | Oui | Lister les événements créés par l'utilisateur. |

Paramètres possibles pour `GET /api/events` :

- `q` : recherche textuelle.
- `category` : catégorie.
- `period` : `upcoming` ou `past`.
- `page` : numéro de page.
- `limit` : nombre d'éléments par page.

### 12.4 Inscriptions

| Méthode | Endpoint | Protégé | Description |
|---|---|---:|---|
| POST | `/api/events/:id/register` | Oui | S'inscrire à un événement. |
| PATCH | `/api/events/:id/cancel` | Oui | Annuler sa participation. |
| GET | `/api/registrations/me` | Oui | Lister ses inscriptions. |
| GET | `/api/events/:id/participants` | Oui | Voir les participants de son événement. |

### 12.5 Format de réponse recommandé

Réponse de succès :

```json
{
  "success": true,
  "message": "Opération réussie",
  "data": {}
}
```

Réponse d'erreur :

```json
{
  "success": false,
  "message": "Message d'erreur lisible",
  "errors": []
}
```

---

## 13. Pages et parcours utilisateur

### 13.1 Pages principales

| Page | Route frontend | Description |
|---|---|---|
| Liste des événements | `/` ou `/events` | Affiche les événements, la recherche, les filtres et la pagination. |
| Détail événement | `/events/:id` | Affiche les détails, le compteur d'inscrits et l'action d'inscription. |
| Connexion | `/login` | Formulaire de connexion. |
| Inscription | `/register` | Formulaire de création de compte. |
| Création événement | `/events/new` | Formulaire protégé de création. |
| Modification événement | `/events/:id/edit` | Formulaire protégé réservé à l'organisateur. |
| Dashboard | `/dashboard` | Vue des événements créés et inscriptions. |
| Profil | `/profile` | Informations utilisateur et historique. |
| Page 404 | `*` | Page d'erreur pour route inconnue. |

### 13.2 Parcours apprenant

1. L'apprenant arrive sur la liste des événements.
2. Il recherche ou filtre selon ses besoins.
3. Il ouvre le détail d'un événement.
4. Il se connecte ou crée un compte si nécessaire.
5. Il clique sur `Participer`.
6. Il retrouve l'événement dans son dashboard.
7. Il peut annuler sa participation si besoin.

### 13.3 Parcours organisateur

1. L'organisateur se connecte.
2. Il ouvre le formulaire de création d'événement.
3. Il renseigne les informations obligatoires.
4. Il publie l'événement.
5. Il suit le nombre d'inscrits depuis le dashboard.
6. Il peut modifier ou supprimer son événement.
7. Il peut consulter la liste des participants.

---

## 14. Maquettes fonctionnelles

Ces maquettes textuelles servent de base pour l'interface. Elles peuvent être transformées ensuite en maquettes Figma ou directement en composants React.

### 14.1 Page liste des événements - Desktop

```text
┌──────────────────────────────────────────────────────────────────────┐
│ EventSphere                         Connexion | Inscription | Profil │
├──────────────────────────────────────────────────────────────────────┤
│ Trouver un événement d'apprentissage                                 │
│ [ Rechercher un événement...             ] [Catégorie v] [Date v]    │
├──────────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────┐ ┌──────────────────────┐ ┌───────────────┐ │
│ │ Atelier React        │ │ Hackathon IA         │ │ Conférence UX │ │
│ │ 12 juin 2026         │ │ 18 juin 2026         │ │ 21 juin 2026  │ │
│ │ IFRI, Cotonou        │ │ En ligne             │ │ Campus A      │ │
│ │ 18 / 40 inscrits     │ │ 30 / 50 inscrits     │ │ 70 / 100      │ │
│ │ [Voir détails]       │ │ [Voir détails]       │ │ [Voir détails]│ │
│ └──────────────────────┘ └──────────────────────┘ └───────────────┘ │
├──────────────────────────────────────────────────────────────────────┤
│                      < Précédent      1 2 3      Suivant >           │
└──────────────────────────────────────────────────────────────────────┘
```

### 14.2 Page détail d'un événement

```text
┌──────────────────────────────────────────────────────────────────────┐
│ EventSphere                                      Dashboard | Profil   │
├──────────────────────────────────────────────────────────────────────┤
│ Atelier React avancé                                                 │
│ Catégorie : Atelier                                                  │
│ Date : 12 juin 2026 à 09:00                                          │
│ Lieu : IFRI, Cotonou                                                 │
│ Places : 18 / 40                                                     │
│                                                                      │
│ Description                                                          │
│ Atelier pratique pour apprendre à structurer une application React   │
│ avec TypeScript, routes protégées et appels API.                     │
│                                                                      │
│ [Participer]   ou   [Annuler ma participation]                       │
│                                                                      │
│ Organisateur : [Nom organisateur]                                    │
└──────────────────────────────────────────────────────────────────────┘
```

### 14.3 Page création ou modification d'événement

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Créer un événement                                                   │
├──────────────────────────────────────────────────────────────────────┤
│ Titre                                                                │
│ [ Atelier React avancé                                      ]         │
│                                                                      │
│ Catégorie                         Capacité                           │
│ [Atelier v]                       [40]                               │
│                                                                      │
│ Date et heure                     Lieu                               │
│ [12/06/2026 09:00]                [IFRI, Cotonou]                    │
│                                                                      │
│ Description                                                          │
│ [ Texte descriptif de l'événement...                       ]         │
│                                                                      │
│                              [Annuler]  [Publier]                    │
└──────────────────────────────────────────────────────────────────────┘
```

### 14.4 Dashboard utilisateur

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Dashboard                                                            │
├──────────────────────────────────────────────────────────────────────┤
│ [Événements créés : 4] [Inscriptions actives : 3] [Passés : 6]       │
├──────────────────────────────────────────────────────────────────────┤
│ Mes événements créés                                                 │
│ -------------------------------------------------------------------- │
│ Titre              Date          Inscrits       Actions              │
│ Atelier React      12/06/2026    18 / 40        Modifier Supprimer   │
│ Hackathon IA       18/06/2026    30 / 50        Modifier Supprimer   │
├──────────────────────────────────────────────────────────────────────┤
│ Mes inscriptions                                                      │
│ -------------------------------------------------------------------- │
│ Événement          Date          Statut         Action               │
│ Conférence UX      21/06/2026    Participe      Annuler              │
│ Séminaire Cloud    02/05/2026    Passé          Voir détails         │
└──────────────────────────────────────────────────────────────────────┘
```

### 14.5 Version mobile - Liste des événements

```text
┌──────────────────────────────┐
│ EventSphere            Menu  │
├──────────────────────────────┤
│ [Rechercher...]              │
│ [Catégorie v] [Date v]       │
├──────────────────────────────┤
│ ┌──────────────────────────┐ │
│ │ Atelier React            │ │
│ │ 12 juin 2026             │ │
│ │ IFRI, Cotonou            │ │
│ │ 18 / 40 inscrits         │ │
│ │ [Voir détails]           │ │
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │ Hackathon IA             │ │
│ │ 18 juin 2026             │ │
│ │ En ligne                 │ │
│ │ 30 / 50 inscrits         │ │
│ │ [Voir détails]           │ │
│ └──────────────────────────┘ │
└──────────────────────────────┘
```

---

## 15. Technologies utilisées

| Technologie | Catégorie | Justification |
|---|---|---|
| React.js + TypeScript | Frontend | Création d'une interface dynamique, typée et maintenable. |
| Vite | Frontend | Démarrage rapide du projet et expérience de développement fluide. |
| Tailwind CSS | Frontend | Mise en page responsive rapide et cohérente. |
| Zustand ou Context API | État global | Gestion simple de l'authentification, des filtres et de l'état utilisateur. |
| React Router | Navigation | Gestion des routes publiques, privées et dynamiques. |
| Axios | HTTP client | Communication entre le frontend et l'API backend. |
| Node.js + Express | Backend | API REST légère et adaptée à l'écosystème JavaScript. |
| TypeScript strict | Frontend / Backend | Réduction des erreurs et meilleure maintenabilité. |
| MongoDB Atlas | Base de données | Base NoSQL flexible avec offre gratuite adaptée au projet. |
| Mongoose | ODM | Modélisation des collections et relations MongoDB. |
| Zod | Validation | Validation robuste des données reçues par l'API. |
| JWT | Authentification | Authentification stateless adaptée aux API REST. |
| bcryptjs | Sécurité | Hachage sécurisé des mots de passe. |
| Vercel | Déploiement frontend | Déploiement gratuit et simple depuis GitHub. |
| Render | Déploiement backend | Hébergement Node.js gratuit pour API backend. |

---

## 16. Plan de développement prévisionnel

| Période | Objectifs | Livrables attendus |
|---|---|---|
| Semaine 1 - Jours 1 à 2 | Initialisation du projet, structure backend/frontend, configuration TypeScript, connexion MongoDB | Projet structuré, serveur backend lancé, frontend lancé |
| Semaine 1 - Jours 3 à 4 | Authentification : register, login, JWT, middleware, profil connecté | API auth fonctionnelle et testée |
| Semaine 1 - Jours 5 à 7 | CRUD événements, validations Zod, droits organisateur | API événements fonctionnelle |
| Semaine 2 - Jours 8 à 9 | Système d'inscription, annulation, capacité maximale, anti-doublon | API inscriptions fonctionnelle |
| Semaine 2 - Jours 10 à 11 | Pages frontend : liste, détail, formulaires, auth | Parcours utilisateur principal opérationnel |
| Semaine 2 - Jour 12 | Dashboard, historique, filtres, pagination | Interface complète MVP |
| Semaine 2 - Jour 13 | Responsive, correction bugs, états d'erreur et chargement | Application stable sur mobile et desktop |
| Semaine 2 - Jour 14 | Déploiement, README, tests finaux, préparation soutenance | Version déployée et documentée |

---

## 17. Tests et validation

### 17.1 Tests fonctionnels manuels

- Créer un compte avec des données valides.
- Refuser une inscription avec email déjà utilisé.
- Se connecter avec un compte existant.
- Refuser une connexion avec mauvais mot de passe.
- Créer un événement complet.
- Refuser un événement avec capacité invalide.
- Modifier uniquement ses propres événements.
- Supprimer uniquement ses propres événements.
- S'inscrire à un événement disponible.
- Refuser une double inscription active.
- Annuler une participation.
- Bloquer l'inscription si l'événement est complet.
- Vérifier que les filtres retournent les bons événements.
- Vérifier que le dashboard affiche les bonnes données.

### 17.2 Tests techniques recommandés

- Tester les services backend critiques.
- Tester les middlewares d'authentification et d'autorisation.
- Tester la validation Zod.
- Tester les réponses d'erreur API.
- Vérifier le build frontend.
- Vérifier le build backend TypeScript.

### 17.3 Critères de recette finale

Avant livraison, les points suivants doivent être validés :

- Le frontend démarre sans erreur.
- Le backend démarre sans erreur.
- La connexion à MongoDB fonctionne.
- Les variables d'environnement sont documentées.
- Les principales routes API répondent correctement.
- Le parcours inscription utilisateur fonctionne de bout en bout.
- Le parcours création événement fonctionne de bout en bout.
- Le parcours inscription à un événement fonctionne de bout en bout.
- L'application est lisible sur mobile.
- Le README explique l'installation, le lancement et le déploiement.

---

## 18. Déploiement

### 18.1 Frontend

- Plateforme : Vercel.
- Commande de build : `npm run build`.
- Dossier de sortie : selon la configuration Vite, généralement `dist`.
- Variable d'environnement : URL de l'API backend.

### 18.2 Backend

- Plateforme : Render.
- Commande de build : `npm install && npm run build`.
- Commande de démarrage : `npm start`.
- Variables d'environnement :

```text
PORT=5000
MONGODB_URI=...
JWT_SECRET=...
JWT_EXPIRES_IN=7d
CLIENT_URL=...
```

### 18.3 Base de données

- Plateforme : MongoDB Atlas.
- Prévoir un utilisateur de base de données dédié.
- Restreindre l'accès réseau selon les besoins du déploiement.

### 18.4 Limite connue

Sur Render gratuit, le backend peut se mettre en veille après une période d'inactivité. Le premier appel peut donc être plus lent. Cette limite doit être mentionnée dans le README.

---

## 19. Contraintes et risques

| Contrainte ou risque | Impact | Mesure de mitigation |
|---|---|---|
| Délai court de 2 semaines | Risque d'inachevé | Prioriser le MVP et reporter les fonctionnalités secondaires. |
| Développement seul | Charge élevée | Travailler par modules simples et tester progressivement. |
| TypeScript strict | Temps de développement plus long | Définir les types dès le départ. |
| Gestion many-to-many | Risque d'erreur sur les inscriptions | Utiliser une collection `registrations` avec index unique. |
| Backend Render gratuit en veille | Premier chargement lent | Documenter la limite dans le README. |
| Données invalides côté client | Bugs ou incohérences | Valider toutes les données côté backend avec Zod. |
| Autorisations mal contrôlées | Risque de modification non autorisée | Vérifier les droits dans les services backend. |

---

## 20. Évolutions futures

### 20.1 Version 1.1

- Upload d'image de couverture pour les événements.
- Notifications email lors d'une inscription ou annulation.
- Commentaires ou questions sur la page d'un événement.
- Système de rappel avant l'événement.

### 20.2 Version 2

- Calendrier visuel des événements.
- Mode PWA pour un accès partiel hors ligne.
- Tableau de bord analytique pour les organisateurs.
- QR code pour valider la présence sur place.
- Rôle administrateur pour modérer les événements.

### 20.3 Version 3

- Recommandations d'événements selon le profil de l'apprenant.
- Badges et certifications de participation.
- API publique pour intégration à des plateformes éducatives.
- Application mobile React Native.

---

## 21. Livrables attendus

- Code source frontend React + TypeScript.
- Code source backend Node.js + Express + TypeScript.
- Base MongoDB Atlas configurée.
- Documentation README complète.
- Fichier `.env.example` pour le backend et le frontend si nécessaire.
- Version déployée du frontend.
- Version déployée du backend.
- Cahier des charges finalisé.
- Captures d'écran ou maquettes de l'application.
- Présentation courte pour la soutenance.

---

## 22. Conclusion

EventSphere propose une réponse simple, utile et réaliste à un problème fréquent dans les communautés d'apprentissage : la dispersion des informations et la difficulté à gérer les participations aux événements pédagogiques. Le projet est techniquement faisable avec les technologies de la formation et possède un périmètre suffisamment clair pour être développé en version MVP dans un délai court.

La solution peut ensuite évoluer vers une plateforme plus complète intégrant notifications, présence par QR code, statistiques, badges et recommandations. Pour la première version, la priorité reste la fiabilité du parcours principal : créer un compte, publier un événement, découvrir les événements, s'inscrire et suivre ses participations.

---

Document réalisé dans le cadre du projet de fin de formation.

Formation React.js / Node.js - Année 2025-2026.
