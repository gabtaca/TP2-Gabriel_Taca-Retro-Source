## Plan: Vite + React + SCSS Migration

Migration complète de Shopify Hydrogen/Remix vers Vite + React avec conversion Tailwind → SCSS. Le projet devient un site portfolio autonome sans dépendances e-commerce, optimisé pour mettre en valeur le design.

**Phases: 3**

### 1. **Phase 1: Foundation Setup**
   - **Objective:** Créer la nouvelle structure Vite + React, configurer SCSS avec architecture 7-1, et établir les utilitaires de base pour remplacer Tailwind
   - **Files/Functions to Modify/Create:**
     - Nouveau projet Vite dans un dossier parallèle ou restructuration complète
     - [vite.config.js](vite.config.js) - Configuration Vite avec SCSS
     - [src/main.jsx](src/main.jsx) - Point d'entrée avec React Router
     - [src/styles/abstracts/_variables.scss](src/styles/abstracts/_variables.scss) - Variables SCSS (couleurs, breakpoints, spacing)
     - [src/styles/abstracts/_mixins.scss](src/styles/abstracts/_mixins.scss) - Mixins utilitaires (flex, responsive, spacing)
     - [src/styles/base/_reset.scss](src/styles/base/_reset.scss) - CSS reset
     - [src/styles/main.scss](src/styles/main.scss) - Fichier principal SCSS
     - [package.json](package.json) - Mise à jour des dépendances
   - **Steps:**
     1. Créer nouveau projet Vite avec template React: `npm create vite@latest`
     2. Installer dépendances: `sass`, `react-router-dom`
     3. Créer structure 7-1 SCSS (abstracts, base, components, layout, pages, themes, vendors)
     4. Extraire les CSS variables actuelles de [app.css](app/styles/app.css) et convertir en SCSS variables
     5. Créer mixins pour remplacer utilities Tailwind (flex, spacing, responsive breakpoints)
     6. Configurer React Router v6 avec routes de base
     7. Copier assets statiques ([public/](public/)) vers nouveau projet
     8. Tester le build: `npm run dev` et `npm run build`

### 2. **Phase 2: Component Migration + SCSS Conversion**
   - **Objective:** Migrer tous les composants réutilisables, convertir toutes les classes Tailwind en SCSS, et supprimer les dépendances Shopify
   - **Files/Functions to Modify/Create:**
     - **Easy Components (priorité):**
       - [app/components/Carousel.jsx](app/components/Carousel.jsx) → [src/components/Carousel/Carousel.jsx](src/components/Carousel/Carousel.jsx) + [_carousel.scss](src/styles/components/_carousel.scss)
       - [app/components/Contact.jsx](app/components/Contact.jsx) → [src/components/Contact/Contact.jsx](src/components/Contact/Contact.jsx) + [_contact.scss](src/styles/components/_contact.scss)
       - [app/components/FAQs.jsx](app/components/FAQs.jsx) → [src/components/FAQs/FAQs.jsx](src/components/FAQs/FAQs.jsx) + [_faqs.scss](src/styles/components/_faqs.scss)
       - [app/components/Header.jsx](app/components/Header.jsx) → [src/components/Header/Header.jsx](src/components/Header/Header.jsx) + [_header.scss](src/styles/components/_header.scss)
       - [app/components/Footer.jsx](app/components/Footer.jsx) → [src/components/Footer/Footer.jsx](src/components/Footer/Footer.jsx) + [_footer.scss](src/styles/components/_footer.scss)
       - [app/components/Aside.jsx](app/components/Aside.jsx) → [src/components/Aside/Aside.jsx](src/components/Aside/Aside.jsx) + [_aside.scss](src/styles/components/_aside.scss)
       - [app/components/ArcadeBody.jsx](app/components/ArcadeBody.jsx) → [src/components/ArcadeBody/ArcadeBody.jsx](src/components/ArcadeBody/ArcadeBody.jsx) + [_arcade-body.scss](src/styles/components/_arcade-body.scss)
       - [app/components/NewsCarousel.jsx](app/components/NewsCarousel.jsx) → [src/components/NewsCarousel/NewsCarousel.jsx](src/components/NewsCarousel/NewsCarousel.jsx)
     - **Medium Components:**
       - [app/components/Collection.jsx](app/components/Collection.jsx) - Adapter pour données mock
       - [app/components/ProductItem.jsx](app/components/ProductItem.jsx) - Simplifier sans Shopify Money/Image
       - [app/components/FilterSection.jsx](app/components/FilterSection.jsx), [app/components/PaginatedResourceSection.jsx](app/components/PaginatedResourceSection.jsx)
     - **Data Files:**
       - [app/data/newsData.js](app/data/newsData.js) → [src/data/newsData.js](src/data/newsData.js) (garder tel quel)
       - Créer [src/data/products.json](src/data/products.json) - Mock des produits pour showcase
       - Créer [src/data/collections.json](src/data/collections.json) - Mock des collections
   - **Steps:**
     1. Pour chaque composant, analyser les classes Tailwind utilisées
     2. Créer le fichier SCSS correspondant dans `src/styles/components/`
     3. Convertir classes Tailwind en SCSS sémantique:
        - `flex flex-col items-center` → `@include flex(column, flex-start, center)`
        - `w-[90%] max-w-4xl mx-auto` → `width: 90%; max-width: 64rem; margin: 0 auto;`
        - `sm:items-center` → `@include respond-to('sm') { align-items: center; }`
     4. Remplacer imports Shopify (`@shopify/hydrogen`, `@remix-run/react`) par équivalents standards
     5. Remplacer `<Money>`, `<Image>` Shopify par balises HTML standards
     6. Remplacer `Link` de Remix par `Link` de React Router
     7. Supprimer logique cart/checkout (pas nécessaire pour portfolio)
     8. Créer données mock JSON pour produits affichés en showcase
     9. Tester chaque composant individuellement après migration

### 3. **Phase 3: Routing, Data Integration & Polish**
   - **Objective:** Configurer toutes les routes, intégrer les données mock, finaliser les styles responsives, et optimiser pour production
   - **Files/Functions to Modify/Create:**
     - [src/App.jsx](src/App.jsx) - Component racine avec Router
     - Routes principales:
       - [src/routes/Home.jsx](src/routes/Home.jsx) (depuis [app/routes/($locale)._index.jsx](app/routes/($locale)._index.jsx))
       - [src/routes/Products.jsx](src/routes/Products.jsx) (liste produits showcase)
       - [src/routes/Product.jsx](src/routes/Product.jsx) (détail produit showcase)
       - [src/routes/Contact.jsx](src/routes/Contact.jsx)
       - [src/routes/About.jsx](src/routes/About.jsx)
     - [src/lib/mockData.js](src/lib/mockData.js) - Utilitaires pour charger données mock
     - [src/styles/pages/](src/styles/pages/) - Styles spécifiques aux pages
     - [src/styles/themes/_arcade.scss](src/styles/themes/_arcade.scss) - Thème arcade/retro
   - **Steps:**
     1. Configurer React Router avec routes imbriquées (`createBrowserRouter`)
     2. Créer layout racine avec Header/Footer persistants
     3. Implémenter chargement données mock dans composants
     4. Convertir toutes les routes Remix en routes React Router
     5. Finaliser conversion Tailwind responsive (`sm:`, `md:`, `lg:`) en mixins SCSS
     6. Tester navigation entre pages
     7. Vérifier responsive design sur tous breakpoints
     8. Optimiser animations CSS (remplacer Tailwind animate par keyframes SCSS)
     9. Tester performance: `npm run build` et analyser bundle size
     10. Nettoyer code mort et imports inutilisés
     11. Vérifier accessibilité (alt text, aria-labels, navigation clavier)
     12. Test final cross-browser (Chrome, Firefox, Safari)

**Decisions:**
1. ✅ **E-commerce UI:** Garder tous les composants e-commerce (ProductForm, AddToCart, Cart, Checkout) avec UI complète mais données mockées - site vitrine fonctionnel d'un vrai site de vente de jeux rétro
2. ✅ **Styling:** SCSS Modules (`.module.scss`) pour encapsulation et facilité de gestion
3. ✅ **Structure:** Nouveau projet `retro-source-portfolio/` en parallèle - garder `Retro-Source/` original comme référence
