# Guide de Contribution - FoncierChain

## 🛠 Standards de Développement

### TypeScript
- Utilisez le mode strict de TypeScript.
- Préférez `import type` pour les imports de types uniquement (activé par `verbatimModuleSyntax`).
- Documentez les interfaces complexes avec JSDoc.

### Composants React
- Utilisez des composants fonctionnels avec des flèches (`const MyComponent = () => ...`).
- Décomposez les composants volumineux en sous-composants dans le dossier `components/`.
- Utilisez le helper `cn()` (combinaison de `clsx` et `tailwind-merge`) pour la gestion des classes CSS.

### Gestion d'État
- **État Serveur** : Utilisez TanStack Query via les hooks personnalisés dans `src/hooks/`.
- **État Global** : Privilégiez le contexte React ou TanStack Query.
- **Formulaires** : Utilisez `React Hook Form` avec les schémas de validation `Zod`.

### Architecture API
- Les appels API doivent être centralisés dans `src/api/`.
- Chaque module API doit retourner les données typées via `ApiResponse<T>`.

## 🎨 Design System (Tailwind v4)

- Utilisez les variables de thème définies dans `src/index.css` (`--color-brand-*`, `--color-status-*`).
- Suivez les classes utilitaires standardisées :
  - `.card` : Pour les conteneurs blancs avec ombre.
  - `.btn-primary` / `.btn-secondary` : Pour les boutons.
  - `.input` : Pour les champs de saisie.

## 🧪 Tests

- Tout nouveau workflow métier doit être couvert par un test E2E Playwright.
- Les tests doivent mocker les appels API pour garantir leur stabilité.
- Vérifiez toujours le responsive (mobile/desktop) dans vos tests.

## 🔄 Workflow de Git

1. Créez une branche descriptive : `feat/nom-de-la-feature` ou `fix/nom-du-bug`.
2. Assurez-vous que `npm run build` passe sans erreur.
3. Lancez les tests Playwright avant de soumettre.
