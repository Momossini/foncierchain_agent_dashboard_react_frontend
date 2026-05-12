# Plan de Développement - Portail Agent FoncierChain

## Vue d'ensemble

Ce plan organise le développement du frontend du portail agent FoncierChain en phases logiques, du setup initial à la livraison. Chaque phase regroupe des tâches cohérentes qui peuvent être réalisées ensemble.

---

## Phase 1 : Setup et Initialisation du Projet

### Objectif
Mise en place de l'environnement de développement et de la structure de base du projet.

### Tâches groupées

#### 1.1 Initialisation du projet
- [ ] Créer le projet Vite avec React 18 et TypeScript
- [ ] Configurer TypeScript en mode strict
- [ ] Installer les dépendances core :
  - React Router
  - TanStack Query
  - React Hook Form
  - Zod
  - Tailwind CSS
  - Axios
- [ ] Configurer les scripts de développement (dev, build, lint, test)

#### 1.2 Configuration de l'environnement
- [ ] Créer les fichiers de configuration (.env.example, .env.local)
- [ ] Définir les variables d'environnement (API_URL, etc.)
- [ ] Configurer le proxy de développement vers le backend FastAPI
- [ ] Mettre en place ESLint et Prettier
- [ ] Configurer les aliases d'import (@/components, @/api, etc.)

#### 1.3 Structure du projet
- [ ] Créer la structure de dossiers selon l'architecture recommandée :
  ```
  src/
    app/
    api/
    components/
    features/
    pages/
    hooks/
    lib/
    types/
  ```
- [ ] Créer les fichiers index.ts pour les exports
- [ ] Documenter la structure dans un README interne

---

## Phase 2 : Fondations Techniques et Architecture

### Objectif
Mise en place des fondations techniques : client API, gestion d'auth, routing, types.

### Tâches groupées

#### 2.1 Types TypeScript
- [ ] Définir les types core dans `src/types/` :
  - `api.ts` : ApiResponse enveloppe
  - `auth.ts` : UserRole, AuthUser
  - `parcel.ts` : Parcel, ParcelStatus, ParcelHistoryItem
- [ ] Créer les types pour les formulaires (Zod schemas)
- [ ] Documenter les types avec JSDoc

#### 2.2 Client API et HTTP
- [ ] Créer le client Axios dans `src/api/client.ts`
- [ ] Configurer l'interceptor pour injecter le JWT
- [ ] Configurer l'interceptor pour gérer 401/403/500
- [ ] Créer le wrapper de réponse standardisé
- [ ] Créer les modules API :
  - `src/api/auth.ts` : login, me, refresh
  - `src/api/parcels.ts` : CRUD, search, validate
  - `src/api/history.ts` : getHistory
  - `src/api/transfer.ts` : transferParcel

#### 2.3 Gestion de l'état et Cache
- [ ] Configurer TanStack Query Provider
- [ ] Créer les hooks personnalisés dans `src/hooks/` :
  - `useAuth.ts` : login, logout, refresh
  - `useCurrentUser.ts` : profil utilisateur
  - `useParcels.ts` : liste, recherche
  - `useParcel.ts` : détail parcelle
  - `useParcelHistory.ts` : historique
  - `useTransferParcel.ts` : mutation transfert
- [ ] Configurer le cache et les stratégies de revalidation

#### 2.4 Routing et Navigation
- [ ] Configurer React Router
- [ ] Définir les routes :
  - `/login`
  - `/dashboard`
  - `/parcels`
  - `/parcels/new`
  - `/parcels/:id`
  - `/parcels/:id/transfer`
  - `/parcels/:id/history`
  - `/403`
  - `/404`
- [ ] Créer le composant `ProtectedRoute`
- [ ] Créer le composant `RoleGuard`

---

## Phase 3 : Layout et Composants UI de Base

### Objectif
Création du layout principal et des composants UI réutilisables.

### Tâches groupées

#### 3.1 Layout Principal
- [ ] Créer `AgentAppShell` : structure de l'application
- [ ] Créer `Topbar` : navigation, profil utilisateur, logout
- [ ] Créer `Sidebar` : menu de navigation principal
- [ ] Implémenter le responsive du layout

#### 3.2 Composants de Feedback
- [ ] Créer `LoadingState` : skeletons et spinners
- [ ] Créer `EmptyState` : états vides
- [ ] Créer `ErrorState` : gestion d'erreurs
- [ ] Créer `SuccessAlert` : notifications de succès
- [ ] Créer `ConfirmDialog` : modales de confirmation
- [ ] Configurer un système de toast (react-hot-toast ou similaire)

#### 3.3 Composants Auth
- [ ] Créer `LoginForm` : formulaire de connexion
- [ ] Créer `CurrentUserBadge` : affichage du profil
- [ ] Créer `LogoutButton` : déconnexion

#### 3.4 Pages d'Erreur
- [ ] Créer `ForbiddenPage` (403)
- [ ] Créer `NotFoundPage` (404)

---

## Phase 4 : Authentification

### Objectif
Implémentation complète du flux d'authentification.

### Tâches groupées

#### 4.1 Page de Login
- [ ] Créer `LoginPage.tsx`
- [ ] Intégrer `LoginForm` avec React Hook Form + Zod
- [ ] Implémenter la mutation de login via `useAuth`
- [ ] Gérer le stockage du token (localStorage ou sessionStorage)
- [ ] Redirection vers le dashboard après succès
- [ ] Affichage des erreurs (identifiants invalides, utilisateur inactif)

#### 4.2 Gestion de Session
- [ ] Implémenter la vérification du token au chargement
- [ ] Gérer le rafraîchissement automatique du token
- [ ] Redirection automatique vers login sur 401
- [ ] Purge de la session sur logout

#### 4.3 Profil Utilisateur
- [ ] Charger le profil via `GET /auth/me`
- [ ] Afficher les informations utilisateur dans le layout
- [ ] Afficher le rôle de l'utilisateur

---

## Phase 5 : Dashboard Agent

### Objectif
Création du dashboard point d'entrée du portail.

### Tâches groupées

#### 5.1 Page Dashboard
- [ ] Créer `DashboardPage.tsx`
- [ ] Ajouter les raccourcis vers les actions principales :
  - Créer une parcelle
  - Rechercher une parcelle
  - Transférer une propriété
- [ ] Afficher les indicateurs simples :
  - Nombre de parcelles créées récemment
  - Transferts récents
  - Anomalies rejetées
- [ ] Afficher la liste des dernières opérations
- [ ] Afficher l'état du système (statut blockchain/mock)

#### 5.2 Navigation
- [ ] Lier les raccourcis aux routes correspondantes
- [ ] Tester la navigation complète

---

## Phase 6 : Liste et Recherche de Parcelles

### Objectif
Implémentation de la liste et recherche de parcelles.

### Tâches groupées

#### 6.1 Composants de Liste
- [ ] Créer `ParcelSearchBar` : barre de recherche
- [ ] Créer `ParcelFilters` : filtres (statut, ville, district)
- [ ] Créer `ParcelTable` ou `ParcelCardList` : affichage des résultats
- [ ] Créer `ParcelStatusBadge` : badge de statut coloré

#### 6.2 Page Liste
- [ ] Créer `ParcelsListPage.tsx`
- [ ] Intégrer la recherche via `GET /parcels/search`
- [ ] Intégrer la liste via `GET /parcels`
- [ ] Implémenter les filtres
- [ ] Implémenter la pagination
- [ ] Gérer les états : loading, empty, error

#### 6.3 Navigation vers Détail
- [ ] Lier chaque résultat vers la page détail
- [ ] Passer l'ID de la parcelle dans l'URL

---

## Phase 7 : Création de Parcelle

### Objectif
Implémentation du formulaire de création de parcelle (priorité démo).

### Tâches groupées

#### 7.1 Formulaire de Création
- [ ] Créer `ParcelCreateForm` avec React Hook Form + Zod
- [ ] Champs du formulaire :
  - parcel_uid
  - adresse
  - district
  - ville
  - statut initial
  - propriétaire courant
  - identifiant propriétaire
  - géométrie (si disponible)
- [ ] Validation frontend des champs
- [ ] Intégrer la pré-validation via `POST /parcels/validate`

#### 7.2 Page de Création
- [ ] Créer `ParcelCreatePage.tsx`
- [ ] Intégrer `ParcelCreateForm`
- [ ] Implémenter la mutation de création via `POST /parcels`
- [ ] Gérer l'erreur `PARCEL_ALREADY_EXISTS`
- [ ] Redirection vers la fiche détail après succès
- [ ] Afficher la référence transaction et txHash

#### 7.3 UX de Doublon
- [ ] Afficher une erreur claire et bloquante sur doublon
- [ ] Lien vers la parcelle existante si disponible

---

## Phase 8 : Détail de Parcelle

### Objectif
Création de la fiche détail de parcelle.

### Tâches groupées

#### 8.1 Composants de Détail
- [ ] Créer `ParcelSummaryCard` : résumé de la parcelle
- [ ] Créer `ParcelDetailCard` : informations complètes
- [ ] Créer `BlockchainProofCard` : preuve numérique (txHash, statut)

#### 8.2 Page Détail
- [ ] Créer `ParcelDetailPage.tsx`
- [ ] Charger les données via `GET /parcels/{id}`
- [ ] Afficher toutes les informations de la parcelle
- [ ] Afficher le bloc "preuve numérique"
- [ ] Boutons d'action :
  - Voir l'historique
  - Initier un transfert
  - Retour à la recherche
- [ ] Gérer les états : loading, not found, error

#### 8.3 Géométrie (optionnel)
- [ ] Intégrer un affichage simplifié de la géométrie si disponible
- [ ] Ne pas bloquer sur une carte avancée

---

## Phase 9 : Transfert de Propriété

### Objectif
Implémentation du flux de transfert de propriété.

### Tâches groupées

#### 9.1 Formulaire de Transfert
- [ ] Créer `TransferOwnershipForm` avec React Hook Form + Zod
- [ ] Champs du formulaire :
  - référence parcelle (pré-rempli)
  - ancien propriétaire (pré-rempli)
  - nouveau propriétaire
  - identifiant nouveau propriétaire
  - type/motif de mutation
  - détails complémentaires
- [ ] Validation frontend
- [ ] Précharger les données de la parcelle

#### 9.2 Page de Transfert
- [ ] Créer `ParcelTransferPage.tsx`
- [ ] Intégrer `TransferOwnershipForm`
- [ ] Vérifier l'état transférable côté UI
- [ ] Implémenter la mutation via `POST /parcels/{id}/transfer`
- [ ] Gérer les erreurs métier :
  - propriétaire source invalide
  - parcelle introuvable
  - statut non transférable
  - droits insuffisants
- [ ] Redirection vers la fiche détail après succès
- [ ] Afficher le message de succès et le txHash

#### 9.3 Mise à jour de l'UI
- [ ] Rafraîchir les données de la parcelle après transfert
- [ ] Afficher la nouvelle ligne d'historique

---

## Phase 10 : Historique de Parcelle

### Objectif
Implémentation de la consultation de l'historique.

### Tâches groupées

#### 10.1 Composant d'Historique
- [ ] Créer `HistoryTimeline` : timeline verticale
- [ ] Style chronologique descendant
- [ ] Afficher pour chaque entrée :
  - date/heure
  - type d'action
  - acteur/agent
  - propriétaire précédent/nouveau
  - détails
  - statut blockchain/mock

#### 10.2 Page Historique
- [ ] Créer `ParcelHistoryPage.tsx` (ou section dans détail)
- [ ] Charger l'historique via `GET /parcels/{id}/history`
- [ ] Intégrer `HistoryTimeline`
- [ ] Gérer les états : loading, empty, error

---

## Phase 11 : Contrôle des Rôles et Autorisations

### Objectif
Implémentation du contrôle d'accès basé sur les rôles.

### Tâches groupées

#### 11.1 Guards de Rôle
- [ ] Compléter `RoleGuard` pour vérifier les rôles
- [ ] Masquer/désactiver les actions par rôle :
  - ADMIN : accès complet
  - AGENT : création, consultation, transfert
  - VIEWER : lecture seule

#### 11.2 Protection des Routes
- [ ] Appliquer `ProtectedRoute` sur toutes les routes privées
- [ ] Appliquer `RoleGuard` sur les routes sensibles
- [ ] Tester les scénarios 401 et 403

---

## Phase 12 : UX et Feedback Utilisateur

### Objectif
Polissage de l'expérience utilisateur et gestion des erreurs.

### Tâches groupées

#### 12.1 Gestion des Erreurs
- [ ] Transformer toutes les erreurs backend en messages lisibles
- [ ] Cas spécifiques :
  - Tentative de doublon
  - Parcelle introuvable
  - Refus de transfert
  - Token expiré
  - Utilisateur sans droit
- [ ] Tests des scénarios d'erreur

#### 12.2 États de Chargement
- [ ] Skeletons pour les listes
- [ ] Spinners pour les mutations
- [ ] Indicateurs de progression

#### 12.3 Feedback de Succès
- [ ] Toasts/bannières pour les actions critiques
- [ ] Mise à jour immédiate de l'UI
- [ ] Affichage du statut blockchain/mock

---

## Phase 13 : Design et Styling

### Objectif
Finalisation du design et alignement avec le design system.

### Tâches groupées

#### 13.1 Tailwind CSS
- [ ] Configurer Tailwind selon le design system global
- [ ] Créer les couleurs personnalisées (statuts, rôles)
- [ ] Créer les composants UI cohérents

#### 13.2 Responsive
- [ ] Adapter le layout pour tablette
- [ ] Adapter le layout pour mobile (priorité secondaire)
- [ ] Tests sur différentes tailles d'écran

#### 13.3 Accessibilité
- [ ] Labels ARIA
- [ ] Navigation clavier
- [ ] Contrastes de couleurs

---

## Phase 14 : Intégration Backend et Tests E2E

### Objectif
Connexion complète au backend et validation du scénario de démo.

### Tâches groupées

#### 14.1 Intégration API
- [ ] Connecter tous les endpoints au backend FastAPI
- [ ] Vérifier le format des réponses API
- [ ] Ajuster les types TypeScript selon les réponses réelles

#### 14.2 Scénario de Démo Complet
- [ ] Test du scénario complet :
  1. Connexion agent
  2. Création parcelle
  3. Confirmation + preuve numérique
  4. Tentative de doublon → blocage
  5. Ouverture fiche parcelle
  6. Transfert vers nouveau propriétaire
  7. Confirmation transfert
  8. Vérification historique (création + mutation)
- [ ] Validation de tous les critères de succès

#### 14.3 Tests Manuels
- [ ] Tests de tous les parcours utilisateur
- [ ] Tests des rôles (ADMIN, AGENT, VIEWER)
- [ ] Tests des erreurs (401, 403, 500)
- [ ] Tests du responsive

---

## Phase 15 : Livraison et Documentation

### Objectif
Préparation du livrable final.

### Tâches groupées

#### 15.1 Build et Optimisation
- [ ] Build de production
- [ ] Optimisation des assets
- [ ] Vérification des performances

#### 15.2 Documentation
- [ ] README du projet :
  - Setup du projet
  - Installation des dépendances
  - Lancement du dev server
  - Variables d'environnement
  - Structure du projet
- [ ] Documentation des composants
- [ ] Guide de contribution

#### 15.3 Checklist de Livraison
- [ ] Projet exécutable localement
- [ ] Connecté au backend FastAPI
- [ ] Routes protégées fonctionnelles
- [ ] Login fonctionnel
- [ ] Parcours métier complet
- [ ] Composants réutilisables
- [ ] Structure de code propre
- [ ] Gestion correcte des états et erreurs
- [ ] Design propre pour démo institutionnelle

---

## Phase 16 : Améliorations Optionnelles (Si Temps)

### Objectif
Fonctionnalités secondaires si le temps le permet.

### Tâches groupées

#### 16.1 Dashboard Avancé
- [ ] Indicateurs dashboard enrichis
- [ ] Graphiques simples

#### 16.2 Vues Supplémentaires
- [ ] Vue "opérations récentes"
- [ ] Vue "tentatives de doublons rejetées"
- [ ] Vue "transactions blockchain"
- [ ] Vue "profil agent"

#### 16.3 Statut Blockchain Enrichi
- [ ] Affichage du réseau
- [ ] Affichage du dernier bloc
- [ ] Lien vers l'explorateur blockchain

---

## Ordre de Priorité

### Priorité Absolue (MVP)
Phases 1 → 12 : Setup, fondations, auth, parcours métier complet

### Priorité Secondaire
Phases 13 → 15 : Design, tests, livraison

### Priorité Tertiaire
Phase 16 : Améliorations optionnelles

---

## Estimation

- **Phases 1-3** : Setup et fondations (2-3 jours)
- **Phases 4-6** : Auth et dashboard (2-3 jours)
- **Phases 7-10** : Fonctionnalités core parcelles (4-5 jours)
- **Phases 11-12** : Rôles et UX (2 jours)
- **Phases 13-15** : Design et livraison (2-3 jours)
- **Phase 16** : Optionnel (selon temps disponible)

**Total estimé MVP** : 12-16 jours
