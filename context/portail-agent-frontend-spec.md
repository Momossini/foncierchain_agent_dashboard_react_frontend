# Portail Agent FoncierChain — Spécification Frontend

## 1. Objectif

Développer le frontend du **portail agent** de FoncierChain, destiné aux agents fonciers et administrateurs habilités.

Le portail agent doit permettre de démontrer, de manière claire et fiable, le cœur métier du projet :
- authentification sécurisée des agents ;
- enregistrement d’une parcelle ;
- consultation du registre ;
- détection immédiate d’une tentative de double attribution ;
- transfert de propriété ;
- consultation de l’historique complet d’une parcelle ;
- visualisation de la preuve blockchain/mock blockchain liée aux opérations critiques. [file:78][file:76]

Le frontend doit rester strictement aligné avec le backend existant : JWT, rôles `ADMIN | AGENT | VIEWER`, enveloppe de réponse standardisée, endpoints FastAPI déjà spécifiés et logique métier portée côté API. [file:78][file:77]

---

## 2. Finalité du portail agent

Le portail agent n’est pas un simple back-office CRUD.

Il doit servir à montrer, dans une démo ou en exploitation MVP :
- qu’un agent habilité peut créer une parcelle avec un identifiant unique ;
- qu’une parcelle déjà enregistrée est bloquée immédiatement si une nouvelle tentative d’immatriculation est faite ;
- qu’un transfert de propriété met à jour le propriétaire courant et crée une trace historique ;
- que toutes les opérations critiques sont auditées ;
- qu’un statut de transaction blockchain/mock est visible dans l’interface. [file:78][file:76]

---

## 3. Stack imposée

### 3.1 Technologies

- **React 18**
- **TypeScript** strict
- **Vite**
- **React Router**
- **TanStack Query** pour les appels API et le cache
- **React Hook Form + Zod** pour les formulaires
- **Tailwind CSS** ou CSS modulaire aligné avec le design system global
- **Axios** ou fetch wrapper centralisé pour le client HTTP

### 3.2 Contraintes techniques

- L’authentification se fait par JWT fourni par l’API. [file:78]
- Toutes les routes protégées doivent vérifier l’existence du token et gérer proprement le cas `401/403`. [file:77]
- Le frontend ne doit **jamais** reproduire la logique métier backend : il consomme, affiche et orchestre. La validation critique reste côté API. [file:77][file:78]
- Toutes les réponses API doivent être lues via l’enveloppe standard du backend : `success`, `data`, `message`, `error`. [file:77]

---

## 4. Rôles à prendre en charge

Le portail doit supporter au minimum les rôles suivants :

- `ADMIN`
- `AGENT`
- `VIEWER`

### 4.1 Comportement attendu par rôle

| Rôle | Accès attendu |
|---|---|
| `ADMIN` | Accès complet au portail agent, y compris consultation large, gestion opérationnelle et vues d’administration si elles existent plus tard. [file:78] |
| `AGENT` | Création de parcelle, consultation, transfert, historique, validation et recherche. [file:78] |
| `VIEWER` | Lecture seule sur les fiches, listes et historiques, sans action critique. [file:78][file:77] |

Le contrôle d’autorisation réel est fait par le backend, mais le frontend doit masquer ou désactiver les actions interdites pour éviter une UX confuse. [file:77]

---

## 5. Parcours utilisateur à couvrir

Le portail agent doit couvrir les parcours suivants.

### 5.1 Authentification agent

- Page de login
- Saisie email + mot de passe
- Soumission vers `POST /auth/login` ou endpoint équivalent selon l’implémentation finale. [file:78]
- Stockage en mémoire ou mécanisme compatible avec le shell du projet
- Chargement du profil via `GET /auth/me` après login. [file:78]
- Redirection vers le dashboard agent après succès
- Affichage d’erreurs propres en cas d’identifiants invalides ou d’utilisateur inactif. [file:77]

### 5.2 Dashboard agent

Le dashboard est une page d’entrée simple mais utile.

Il doit afficher :
- raccourcis vers **Créer une parcelle**, **Rechercher une parcelle**, **Transférer une propriété** ;
- quelques indicateurs simples si disponibles (nombre de parcelles créées récemment, transferts récents, anomalies rejetées) ;
- une liste courte des dernières opérations ou dernières parcelles consultées ;
- l’état du système si l’API remonte un statut de service/blockchain mock.

Le dashboard ne doit pas devenir un projet d’analytics complexe. L’objectif est l’orchestration métier, pas la BI.

### 5.3 Création d’une parcelle

Ce flux est prioritaire pour la démo.

Le portail doit fournir un formulaire de création contenant au minimum :
- identifiant parcelle `parcel_uid`
- adresse
- district
- ville
- statut initial
- propriétaire courant
- identifiant propriétaire si applicable
- géométrie ou GeoJSON simplifié selon la capacité du backend MVP. [file:78]

Le flux attendu :
1. l’agent saisit les informations ;
2. le frontend peut appeler un endpoint de pré-validation (`POST /parcels/validate` ou équivalent) avant soumission finale ; [file:78][file:76]
3. si la parcelle existe déjà, afficher immédiatement l’erreur métier backend `PARCEL_ALREADY_EXISTS` ou code réel retourné ; [file:78]
4. si la création réussit, rediriger vers la fiche détail de la parcelle ;
5. afficher la référence de transaction applicative et, si disponible, le `txHash` blockchain/mock. [file:78]

### 5.4 Recherche et liste des parcelles

L’agent doit pouvoir :
- rechercher par `parcel_uid` ;
- rechercher par adresse ;
- lister les parcelles ;
- filtrer par statut, ville, district ;
- paginer les résultats si nécessaire. [file:78]

Les résultats doivent être clairs, rapides à scanner et conçus pour une consultation métier.

Chaque ligne ou carte de résultat doit montrer au minimum :
- identifiant parcelle ;
- adresse ;
- statut ;
- propriétaire actuel ;
- date de mise à jour ;
- bouton vers la fiche complète.

### 5.5 Détail d’une parcelle

La fiche détail est une page centrale.

Elle doit afficher :
- identifiant parcelle ;
- adresse, district, ville ;
- statut foncier ;
- propriétaire actuel ;
- identifiant du propriétaire si autorisé ;
- agent créateur si exposé ;
- dates de création / mise à jour ;
- géométrie simplifiée ou bloc cartographique léger si la donnée existe ;
- encart “preuve numérique” contenant le statut d’écriture blockchain/mock, le `txHash`, éventuellement le réseau ou le dernier bloc si exposés. [file:78]

Depuis cette page, un agent autorisé doit pouvoir :
- ouvrir l’historique ;
- initier un transfert ;
- revenir à la recherche.

### 5.6 Transfert de propriété

Le portail doit proposer un flux de mutation clair.

Le formulaire minimal doit comporter :
- référence de la parcelle ;
- ancien propriétaire (prérempli depuis le backend) ;
- nouveau propriétaire ;
- identifiant du nouveau propriétaire ;
- type ou motif de mutation si prévu ;
- détails complémentaires facultatifs.

Le frontend doit :
- précharger la parcelle ;
- empêcher la soumission si la fiche n’est pas dans un état transférable côté UI ;
- mais laisser la validation finale au backend ;
- afficher proprement les refus métier : propriétaire source invalide, parcelle introuvable, statut non transférable, droits insuffisants. [file:78][file:76]

Après succès, l’UI doit :
- mettre à jour la fiche ;
- afficher un message de succès explicite ;
- rendre visible la nouvelle ligne d’historique ;
- afficher la référence blockchain/mock si disponible. [file:78]

### 5.7 Historique d’une parcelle

Le portail doit permettre la consultation de l’historique complet d’une parcelle via `GET /parcels/{id}/history` ou route équivalente. [file:78]

Chaque entrée d’historique doit exposer au minimum :
- date/heure ;
- type d’action (`CREATED`, `TRANSFERRED`, `REJECTED_DUPLICATE`, `UPDATED`, etc.) ;
- acteur ou agent ;
- propriétaire précédent ;
- nouveau propriétaire ;
- détails de l’événement ;
- statut blockchain/mock si disponible.

L’affichage recommandé est une **timeline verticale** ou une liste chronologique descendante.

---

## 6. Pages à développer

Le frontend doit contenir au minimum les pages suivantes.

### 6.1 Pages obligatoires MVP

1. **Login**
2. **Dashboard agent**
3. **Liste / recherche des parcelles**
4. **Créer une parcelle**
5. **Détail d’une parcelle**
6. **Transférer une propriété**
7. **Historique d’une parcelle** (page ou section dans le détail)
8. **Page 403 / accès interdit**
9. **Page 404**

### 6.2 Pages facultatives si temps disponible

- Vue “opérations récentes”
- Vue “tentatives de doublons rejetées”
- Vue “transactions blockchain”
- Vue “profil agent”

---

## 7. Architecture frontend recommandée

```txt
src/
  app/
    router/
    providers/
  api/
    client.ts
    auth.ts
    parcels.ts
    history.ts
  components/
    layout/
    forms/
    parcels/
    feedback/
    blockchain/
  features/
    auth/
    dashboard/
    parcels/
    transfer/
    history/
  pages/
    LoginPage.tsx
    DashboardPage.tsx
    ParcelsListPage.tsx
    ParcelCreatePage.tsx
    ParcelDetailPage.tsx
    ParcelTransferPage.tsx
    ForbiddenPage.tsx
    NotFoundPage.tsx
  hooks/
    useAuth.ts
    useCurrentUser.ts
    useParcels.ts
    useParcel.ts
    useParcelHistory.ts
    useTransferParcel.ts
  lib/
    constants.ts
    utils.ts
    errors.ts
  types/
    api.ts
    auth.ts
    parcel.ts
```

### 7.1 Principes d’architecture

- Séparer clairement : **pages**, **features**, **components**, **api**, **types**.
- Centraliser la configuration API et l’injection du token.
- Créer un interceptor ou wrapper pour gérer automatiquement `401`, `403`, `500`.
- Utiliser TanStack Query pour toutes les lectures réseau.
- Utiliser des mutations dédiées pour login, création de parcelle et transfert.

---

## 8. Contrat API à respecter

Le frontend doit se brancher sur les routes backend déjà cadrées.

### 8.1 Auth

- `POST /auth/login` ou route équivalente finale [file:78]
- `GET /auth/me` [file:78]
- `POST /auth/refresh` [file:78]

### 8.2 Parcelles

- `POST /parcels` [file:78]
- `GET /parcels` [file:78]
- `GET /parcels/{id}` [file:78]
- `GET /parcels/by-uid/{parcel_uid}` ou endpoint équivalent [file:78]
- `GET /parcels/search?q=` [file:78]
- `POST /parcels/validate` [file:78][file:76]

### 8.3 Transfert

- `POST /parcels/{id}/transfer` [file:78][file:76]

### 8.4 Historique

- `GET /parcels/{id}/history` [file:78][file:76]

### 8.5 Format des réponses

Le frontend doit supposer une enveloppe uniforme :

```ts
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message?: string | null;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  } | null;
}
```

Ce format doit être respecté dans le parsing et dans les composants d’erreur. [file:77]

---

## 9. Types TypeScript minimum

```ts
export type UserRole = 'ADMIN' | 'AGENT' | 'VIEWER';

export type ParcelStatus =
  | 'ACTIVE'
  | 'PENDING'
  | 'UNDER_REVIEW'
  | 'TRANSFERRED'
  | 'REJECTED_DUPLICATE';

export interface AuthUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export interface Parcel {
  id: string;
  parcelUid: string;
  address: string;
  district: string;
  city: string;
  status: ParcelStatus;
  currentOwnerName: string;
  currentOwnerIdentifier?: string | null;
  geometry?: unknown;
  txHash?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ParcelHistoryItem {
  id: string;
  parcelId: string;
  actionType: string;
  previousOwner?: string | null;
  newOwner?: string | null;
  performedBy?: string | null;
  details?: string | null;
  txHash?: string | null;
  createdAt: string;
}
```

Les noms exacts devront être ajustés à la sortie JSON réelle du backend, mais le modèle d’ensemble doit rester cohérent avec les entités décrites côté API. [file:78]

---

## 10. Composants UI à livrer

### 10.1 Layout

- `AgentAppShell`
- `Topbar`
- `Sidebar`
- `ProtectedRoute`
- `RoleGuard`

### 10.2 Auth

- `LoginForm`
- `CurrentUserBadge`
- `LogoutButton`

### 10.3 Parcelles

- `ParcelSearchBar`
- `ParcelFilters`
- `ParcelTable` ou `ParcelCardList`
- `ParcelStatusBadge`
- `ParcelCreateForm`
- `ParcelSummaryCard`
- `ParcelDetailCard`

### 10.4 Mutation / historique

- `TransferOwnershipForm`
- `HistoryTimeline`
- `BlockchainProofCard`
- `AuditInfoBlock` si exposé plus tard

### 10.5 Feedback

- `LoadingState`
- `EmptyState`
- `ErrorState`
- `SuccessAlert`
- `ConfirmDialog`

---

## 11. Règles UX impératives

### 11.1 Principes

- L’agent doit toujours comprendre **ce qu’il fait**, **sur quelle parcelle**, **avec quel statut**, **et quel est le risque métier**.
- Les actions critiques doivent être visuellement distinctes : création, transfert, validation.
- Toute erreur métier backend doit être transformée en message lisible pour un humain.

### 11.2 Cas UX obligatoires

- **Tentative de doublon** : afficher une erreur claire et bloquante, avec éventuel lien vers la parcelle déjà existante si le backend la renvoie. [file:78]
- **Parcelle introuvable** : état vide propre, sans crash.
- **Refus de transfert** : afficher la raison métier retournée par l’API. [file:78]
- **Token expiré** : redirection contrôlée vers login.
- **Utilisateur sans droit** : page 403, pas seulement une erreur toast.

### 11.3 Détail de démo

Pour la démonstration, chaque action critique réussie doit produire un retour visuel fort :
- toast ou bannière de succès ;
- mise à jour immédiate de l’UI ;
- affichage du statut blockchain/mock ;
- possibilité de naviguer vers l’historique généré.

---

## 12. Gestion des états réseau

Chaque page de lecture doit gérer explicitement :
- `loading`
- `empty`
- `error`
- `success`

Chaque mutation doit gérer explicitement :
- `idle`
- `pending`
- `success`
- `error`

Aucune page ne doit afficher un écran blanc ou des erreurs JSON brutes.

---

## 13. Sécurité côté frontend

Le frontend doit respecter les règles suivantes :

- ne jamais hardcoder de secret ;
- ne jamais exposer des champs sensibles qui ne viennent pas dans les schémas de sortie ; [file:77]
- purger la session côté UI si `401` répété ;
- bloquer les routes protégées si l’utilisateur n’est pas authentifié ;
- masquer les actions non autorisées selon le rôle.

Le frontend n’est pas la source de vérité de sécurité, mais il doit être cohérent avec la politique du backend. [file:77][file:78]

---

## 14. Priorité de livraison

### 14.1 Priorité absolue

1. Login agent
2. Dashboard simple
3. Recherche/liste des parcelles
4. Création de parcelle
5. Détail parcelle
6. Transfert de propriété
7. Historique de parcelle

### 14.2 Priorité secondaire

8. Indicateurs dashboard
9. Statut blockchain/mock enrichi
10. Vue incidents / doublons
11. Responsive avancé tablette/mobile

Si le temps manque, la priorité est de garantir un scénario de démo complet de bout en bout. [file:76][file:78]

---

## 15. Critères de validation

Le portail agent est considéré comme prêt si :

- un agent peut se connecter ;
- il peut consulter son profil ;
- il peut créer une parcelle ;
- une tentative de doublon est rejetée et bien affichée ;
- il peut rechercher une parcelle existante ;
- il peut consulter son détail ;
- il peut lancer un transfert valide ;
- l’historique reflète l’opération ;
- le statut blockchain/mock est visible ;
- les rôles et erreurs 401/403 sont correctement gérés. [file:78][file:76][file:77]

---

## 16. Scénario de démo cible

Le frontend doit permettre ce scénario sans bricolage manuel :

1. Un agent se connecte.
2. Il crée une nouvelle parcelle.
3. Le système confirme l’enregistrement et affiche la preuve numérique/mock.
4. Il tente une seconde création avec le même `parcel_uid`.
5. Le système bloque immédiatement l’opération avec une erreur explicite.
6. L’agent ouvre la fiche de la parcelle existante.
7. Il lance un transfert vers un nouveau propriétaire.
8. Le système confirme le transfert.
9. L’historique montre successivement la création puis la mutation. [file:78][file:76]

---

## 17. Ce que l’agent frontend ne doit pas faire

- Ne pas inventer des endpoints hors contrat.
- Ne pas coder de logique métier contradictoire avec le backend.
- Ne pas créer un portail admin complet à la place du portail agent.
- Ne pas surcharger le dashboard avec des graphiques inutiles.
- Ne pas bloquer le projet sur une carte avancée si la géométrie n’est pas encore stabilisée.
- Ne pas attendre la blockchain finale pour afficher un statut mock prévu par le backend MVP. [file:78]

---

## 18. Livrable attendu

Le livrable attendu est un projet frontend exécutable localement, connecté au backend FastAPI, avec :

- routes protégées ;
- login fonctionnel ;
- parcours métier complet ;
- composants réutilisables ;
- structure de code propre ;
- gestion correcte des états et erreurs ;
- design suffisamment propre pour une démo institutionnelle.

Le but n’est pas de produire un produit final parfait, mais un **portail agent crédible, démontrable, robuste et directement aligné sur le backend FoncierChain existant**. [file:78][file:76][file:77]
