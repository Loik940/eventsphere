# Reference design EventSphere

Ce document resume les choix visuels observes dans les 4 maquettes officielles fournies : connexion, exploration, detail evenement et tableau de bord.

## Direction generale

- Interface mobile-first, claire, premium et tres aeree.
- Fond principal proche du blanc casse : `surface #F9F8F6`.
- Texte principal noir ou `dark #0F172A`.
- Accent principal violet : `primary #4F46E5`.
- Style sobre : cartes blanches, bordures fines, ombres legeres, coins arrondis moderes.
- Contraste fort entre CTA principaux noirs ou violets et fond clair.

## Typographie

- Logo et grands titres editoriaux : police serif `Instrument Serif`.
- Texte courant, boutons, labels, navigation : `Plus Jakarta Sans`.
- Titres de section : sans-serif gras, lisibles et compacts.
- Le logo `EventSphere` doit garder une presence forte, souvent en serif.

## Navigation

- Header mobile avec logo a gauche, icones notification/profil a droite.
- Barre de navigation basse sur mobile avec 4 entrees : Explorer, Creer, Inscriptions, Profil.
- Etat actif en violet.

## Cartes et composants

- Cartes evenement blanches avec bordure fine `border #ECEAE4`.
- Rayon de bordure autour de 12px pour les grandes cartes mobiles.
- Badges categorie en fond pastel avec texte colore.
- Boutons primaires : violet pour actions principales d'accueil/connexion, noir pour participation.
- Inputs grands, arrondis, bordure claire, placeholder gris.

## Categories

- Hackathon : fond `#EEF2FF`, texte `#3730A3`, accent `#4F46E5`.
- Atelier/Workshop : fond `#ECFDF5`, texte `#065F46`, accent `#10B981`.
- Conference : fond `#FFF7ED`, texte `#9A3412`, accent `#F97316`.
- Seminaire : fond `#FAF5FF`, texte `#6B21A8`, accent `#9333EA`.
- Culturel : fond `#FFF1F2`, texte `#9F1239`, accent `#F43F5E`.
- Sport : fond `#FFFBEB`, texte `#92400E`, accent `#F59E0B`.

## Pages de reference

### Connexion

- Logo centré en serif.
- Titre large : `Bienvenue sur EventSphere`.
- Formulaire dans une carte blanche avec bordure fine.
- Bouton principal violet pleine largeur.
- Lien secondaire violet.

### Explorer

- Header compact avec logo + icone circulaire.
- Hero textuel fort avec grand titre serif.
- Pills de filtre horizontales.
- Cartes evenement empilees, accent colore en bord haut.
- CTA `Participer` noir pleine largeur.

### Detail evenement

- Image hero pleine largeur avec bouton retour en surimpression.
- Titre serif superpose ou proche du hero.
- Metadata avec icones : date, heure, lieu.
- Bloc organisateur dans une carte.
- Section description claire et longue.
- Bloc points forts en cartes.
- CTA fixe ou en bas avec prix et bouton `S'inscrire`.

### Dashboard

- Header serif `EventSphere`.
- Grille de statistiques 2 colonnes.
- Cartes prochaines inscriptions compactes avec image miniature.
- Section evenements crees avec grande image et badge `EN DIRECT`.
- Navigation basse active sur `Inscriptions` dans la maquette.

## Regles d'application

- Toutes les pages futures doivent suivre cette direction visuelle.
- Eviter les interfaces trop generiques type template Vite.
- Garder les textes visibles en francais.
- Favoriser les vrais composants reutilisables : Header, BottomNav, EventCard, CategoryBadge, StatCard, Button, Input.
