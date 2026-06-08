# 🎮 Retro Source - État Actuel & Recommandations

**Date:** 22 décembre 2025  
**Problème:** Le projet Shopify Hydrogen original ne fonctionne pas sans API Shopify

## ❌ Problèmes Actuels

### 1. **Erreurs 500 constantes**
- Toutes les routes appellent `getShopAnalytics()` qui contacte l'API Shopify
- Les loaders des routes `/collections`, `/pages`, etc. crashent sans Shopify
- Le composant ArcadeBody (écran CRT) disparaît sur certaines pages

### 2. **Mock incomplet**
- ✅ Mocké: `root.jsx`, `($locale)._index.jsx`
- ❌ Pas mocké: Toutes les autres routes (collections, pages, produits, cart, etc.)
- **Il faudrait mocker ~25 fichiers de routes** pour que tout fonctionne

### 3. **Architecture problématique**
- Le projet est **fortement couplé** à Shopify (Hydrogen/Oxygen)
- Dépendances: `@shopify/hydrogen`, `@shopify/remix-oxygen`, GraphQL Shopify
- Chaque route dépend du `storefront.query()` qui contacte Shopify

## ✅ Solution Recommandée: MIGRER vers retro-source-portfolio

### Pourquoi la migration est la meilleure option:

1. **Architecture propre**
   - Vite + React → Pas de dépendances Shopify
   - SCSS Modules → Pas de Tailwind runtime
   - React Router v6 → Plus simple que Remix

2. **Contrôle total**
   - Données mockées facilement
   - Pas de serveur Oxygen/Hydrogen requis
   - Build statique possible (deploy facile)

3. **Déjà préparé**
   - ✅ Structure 7-1 SCSS en place
   - ✅ Variables & mixins extraits
   - ✅ Guide Tailwind→SCSS complet (TAILWIND-TO-SCSS-REFERENCE.md)
   - ✅ Assets copiés (fonts, images, sounds)

## 📋 Plan de Migration (avec Conductor)

### Phase 1: Structure & Layout ✅ DÉJÀ FAIT
- Vite + React configuré
- SCSS architecture prête
- Variables et mixins disponibles

### Phase 2: Composants Core (2-3 heures avec Conductor)

**Utiliser le guide:** `TAILWIND-TO-SCSS-REFERENCE.md`

#### 2.1 Layout Components
1. **Header** (app/components/Header.jsx → src/components/Header/)
   - Nested borders (4 niveaux)
   - Menu avec sous-menus
   - Search + Cart icons
   - Responsive mobile toggle

2. **Footer** (app/components/Footer.jsx → src/components/Footer/)
   - Footer menu
   - Copyright
   - Simple layout

3. **PageLayout** (app/components/PageLayout.jsx → src/components/PageLayout/)
   - Wrapper principal
   - ArcadeBody integration

#### 2.2 Feature Components
4. **ArcadeBody** (app/components/ArcadeBody.jsx → src/components/ArcadeBody/)
   - Écran CRT avec effet
   - Boutons arcade (A, B, Left, Right)
   - Event listeners pour navigation
   - Gradients top/bottom

5. **Carousel** (app/components/Carousel.jsx → src/components/Carousel/)
   - Slide show avec navigation
   - Responsive mobile/desktop controls
   - Indicators
   - Auto-play & swipe

6. **Contact** (app/components/Contact.jsx → src/components/Contact/)
   - Formulaire de contact
   - Validation

7. **FAQs** (app/components/FAQs.jsx → src/components/FAQs/)
   - Accordion FAQ
   - Expand/collapse animation

### Phase 3: Pages & Routes (1-2 heures)

#### 3.1 Page d'accueil
```
src/routes/Home.jsx
├── <Header />
├── <ArcadeBody>
│   ├── <h1>Welcome to Our Shop!</h1>
│   ├── <Carousel items={newsData} />
│   ├── <FeaturedProducts />
│   └── <RecommendedProducts />
└── <Footer />
```

#### 3.2 Autres pages
- `/collections` - Grille de produits
- `/about` - Page About
- `/contact` - Formulaire Contact
- `/faqs` - Page FAQs

### Phase 4: Données Mock (30 min)
```javascript
// src/data/products.js
export const products = [
  {
    id: 1,
    title: 'Game Boy Color',
    price: 89.99,
    image: '/images/gameboy.png',
    // ...
  },
  // ...
];
```

## 🎯 Instructions pour le Conductor

### Prompt pour le Conductor:

```
Je veux migrer le projet Retro-Source (Shopify Hydrogen) vers retro-source-portfolio (Vite + React).

CONTEXTE:
- Projet source: f:\school\session 4\integration\Retro-Source
- Projet destination: f:\school\session 4\integration\retro-source-portfolio
- Guide de conversion: TAILWIND-TO-SCSS-REFERENCE.md

OBJECTIF:
Créer un site web portfolio fonctionnel avec:
1. Design arcade/retro identique à l'original
2. Tous les composants visuels (Header, Footer, ArcadeBody, Carousel, Contact, FAQs)
3. Pages: Home, Collections, About, Contact, FAQs
4. Données mockées (pas de Shopify)
5. Styles en SCSS Modules (pas de Tailwind)

CONTRAINTES:
- Utiliser React + React Router v6
- Convertir TOUTES les classes Tailwind en SCSS selon le guide
- Ne PAS toucher au projet source (Retro-Source)
- Créer des CSS Modules pour chaque composant

PLAN:
Phase 1: Migrer Header + Footer
Phase 2: Migrer ArcadeBody + PageLayout
Phase 3: Migrer Carousel + Contact + FAQs
Phase 4: Créer les pages et routes
Phase 5: Ajouter données mock et images

Commence par la Phase 1. Pour chaque composant:
1. Lire le composant original dans Retro-Source
2. Identifier toutes les classes Tailwind
3. Convertir en SCSS selon TAILWIND-TO-SCSS-REFERENCE.md
4. Créer ComponentName.jsx + ComponentName.module.scss
5. Tester que ça compile

Prêt à commencer?
```

## 📊 Estimation

| Phase | Temps | Complexité |
|-------|-------|------------|
| Phase 1: Header + Footer | 45 min | Medium |
| Phase 2: ArcadeBody + Layout | 30 min | Medium |
| Phase 3: Feature Components | 1h | Medium |
| Phase 4: Pages & Routes | 45 min | Easy |
| Phase 5: Data & Polish | 30 min | Easy |
| **TOTAL** | **~3.5h** | |

## 🚀 Avantages de cette Approche

1. **Pas de dépendances Shopify** → Fonctionne immédiatement
2. **Build statique possible** → Deploy sur Netlify/Vercel facile
3. **Code propre** → SCSS Modules bien organisés
4. **Maintenable** → Architecture claire et documentée
5. **Performance** → Pas de runtime Tailwind, CSS optimisé

## ⚠️ Alternative (Non Recommandée)

Continuer à mocker toutes les routes Shopify:
- ❌ Nécessite de mocker ~25 fichiers
- ❌ Reste couplé à Shopify/Hydrogen
- ❌ Build complexe (Oxygen required)
- ❌ Deploy difficile
- ❌ Maintenance cauchemardesque

---

**CONCLUSION:** Utilisez le Conductor avec `retro-source-portfolio` pour reconstruire proprement. Le guide Tailwind→SCSS est déjà prêt, l'architecture est en place, il ne reste qu'à migrer les composants un par un. C'est la solution la plus efficace et maintenable.

**Prochaine étape:** Lancez le Conductor et donnez-lui le prompt ci-dessus! 🎮
