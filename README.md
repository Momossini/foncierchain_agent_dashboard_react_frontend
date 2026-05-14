# Portail Agent FoncierChain

Ce projet est le tableau de bord frontal pour les agents de la plateforme FoncierChain, une solution de gestion du registre foncier basée sur la technologie blockchain.

## 🚀 Technologies

- **Vite 8** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (Design System & Styling)
- **TanStack Query (React Query) v5** (Gestion d'état serveur & Cache)
- **React Router v7** (Navigation)
- **React Hook Form** + **Zod** (Formulaires & Validation)
- **Axios** (Client HTTP)
- **Lucide React** (Icônes)
- **Playwright** (Tests E2E)

## 📁 Structure du Projet

```
src/
  api/        # Modules de communication avec le backend (FastAPI)
  app/        # Configuration globale (Router, Providers)
  components/ # Composants UI réutilisables (layout, feedback, forms)
  hooks/      # Hooks personnalisés (auth, data fetching)
  lib/        # Utilitaires et configuration (axios, errors)
  pages/      # Composants de pages de haut niveau
  types/      # Définitions de types TypeScript
```

## 🛠 Installation et Développement

### Prérequis
- Node.js (v18+)
- pnpm (recommandé) ou npm

### Installation
```bash
pnpm install
```

### Lancement du serveur de développement
```bash
pnpm dev
```
Le serveur sera accessible sur `http://localhost:5173`. Le proxy est configuré pour rediriger les appels `/api` vers `http://localhost:8000`.

### Build de production
```bash
pnpm build
```

## 🌐 Variables d'Environnement

Créez un fichier `.env.local` à la racine :
```env
VITE_API_BASE_URL=http://localhost:8000
```

## 🧪 Tests

Le projet utilise Playwright pour les tests de bout en bout.

```bash
# Lancer tous les tests
npx playwright test

# Lancer un test spécifique
npx playwright test tests/e2e/demo_scenario.spec.ts

# Ouvrir l'interface Playwright
npx playwright test --ui
```

## 🔐 Gestion des Rôles (RBAC)

L'application gère trois rôles principaux :
- **ADMIN** : Accès complet à toutes les fonctionnalités.
- **AGENT** : Création, consultation et transfert de parcelles.
- **VIEWER** : Consultation uniquement (lecture seule).

## 📄 Licence
Propriété de FoncierChain. Tous droits réservés.
