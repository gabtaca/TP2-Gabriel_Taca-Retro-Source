## Plan: Shopify Hydrogen to Vite React Migration

Complete migration of Retro-Source (Shopify Hydrogen) to retro-source-portfolio (Vite + React) with full Tailwind→SCSS conversion, preserving arcade/retro aesthetic and all interactive features.

**Phases: 5**

---

### 1. **Phase 1: Foundation & Layout Components**
   - **Objective:** Establish app shell with Header, Footer, and PageLayout components using React Router v6 and SCSS Modules
   - **Files/Functions to Modify/Create:**
     - Target: `retro-source-portfolio/src/App.jsx` (create BrowserRouter setup)
     - Target: `retro-source-portfolio/src/components/Header/Header.jsx` + `Header.module.scss`
     - Target: `retro-source-portfolio/src/components/Footer/Footer.jsx` + `Footer.module.scss`
     - Target: `retro-source-portfolio/src/components/PageLayout/PageLayout.jsx` + `PageLayout.module.scss`
     - Source (read-only): [app/components/Header.jsx](app/components/Header.jsx), [app/components/Footer.jsx](app/components/Footer.jsx), [app/components/PageLayout.jsx](app/components/PageLayout.jsx)
   - **Steps:**
     1. Read source Header.jsx and analyze nested border structure (4 layers: gray-400 → red-700 → gray-300 → red-700)
     2. Convert all Tailwind classes to SCSS using TAILWIND-TO-SCSS-REFERENCE.md
     3. Create Header.jsx with React Router's `<Link>` instead of Remix's `<NavLink>`
     4. Create Header.module.scss with nested border pattern using SCSS variables
     5. Read source Footer.jsx and extract copyright section + menu structure
     6. Create Footer.jsx without Suspense/Await (static implementation)
     7. Create Footer.module.scss converting all Tailwind utilities
     8. Create PageLayout wrapper component to include Header + {children} + Footer
     9. Create App.jsx with BrowserRouter and basic route structure
     10. Test: Run `npm run dev` in retro-source-portfolio, verify Header/Footer render correctly

---

### 2. **Phase 2: ArcadeBody Component (CRT Screen)**
   - **Objective:** Migrate the signature ArcadeBody component with CRT effect, arcade buttons (A/B), and navigation buttons (Left/Right)
   - **Files/Functions to Modify/Create:**
     - Target: `retro-source-portfolio/src/components/ArcadeBody/ArcadeBody.jsx` + `ArcadeBody.module.scss`
     - Source (read-only): [app/components/ArcadeBody.jsx](app/components/ArcadeBody.jsx)
   - **Steps:**
     1. Read entire ArcadeBody.jsx source (lines 1-184)
     2. Identify all Tailwind classes and event handlers
     3. Convert gradient backgrounds (zinc-100 to zinc-600)
     4. Convert arcade button styles (border-x-2, border-b-4, shadow effects, hover states)
     5. Convert navigation buttons (left/right) with rounded-full and border effects
     6. Preserve all event handlers (handleButtonAPress, handleButtonBPress, handleLeftButtonPress, handleRightButtonPress)
     7. Keep sound playback functionality with `/sounds/` paths
     8. Maintain pressed state tracking with useState hooks
     9. Create SCSS module with responsive breakpoints (@include respond-to(md))
     10. Test: Verify buttons trigger events, sounds play, visual states change correctly

---

### 3. **Phase 3: Interactive Feature Components**
   - **Objective:** Migrate Carousel (news display), Contact form, and FAQs accordion components
   - **Files/Functions to Modify/Create:**
     - Target: `retro-source-portfolio/src/components/Carousel/Carousel.jsx` + `Carousel.module.scss`
     - Target: `retro-source-portfolio/src/components/NewsCarousel/NewsCarousel.jsx` + `NewsCarousel.module.scss`
     - Target: `retro-source-portfolio/src/components/Contact/Contact.jsx` + `Contact.module.scss`
     - Target: `retro-source-portfolio/src/components/FAQs/FAQs.jsx` + `FAQs.module.scss`
     - Target: `retro-source-portfolio/src/data/newsData.js` (copy from source)
     - Source (read-only): [app/components/Carousel.jsx](app/components/Carousel.jsx), [app/components/NewsCarousel.jsx](app/components/NewsCarousel.jsx), [app/components/Contact.jsx](app/components/Contact.jsx), [app/components/FAQs.jsx](app/components/FAQs.jsx), [app/data/newsData.js](app/data/newsData.js)
   - **Steps:**
     1. Copy newsData.js to target project (news articles data)
     2. Read Carousel.jsx and identify carousel logic (state, navigation, autoplay)
     3. Convert carousel Tailwind classes to SCSS (flex layouts, transitions)
     4. Integrate arcade button events (listen to 'arcadeButtonPress' and 'arcadeNavigation' events from ArcadeBody)
     5. Create NewsCarousel wrapper that uses Carousel with newsData
     6. Read Contact.jsx form structure and validation logic
     7. Convert form Tailwind classes to SCSS (input styles, button styles, focus states)
     8. Implement form submission handler (console.log for now, no backend)
     9. Read FAQs.jsx accordion structure with expand/collapse
     10. Convert FAQ Tailwind classes to SCSS (borders, padding, hover states)
     11. Implement accordion toggle logic with useState
     12. Test: Carousel auto-advances, arcade buttons control navigation, contact form validates, FAQs expand/collapse

---

### 4. **Phase 4: Pages & Routing**
   - **Objective:** Create all pages (Home, Collections, About, Contact) with React Router v6 routing and integrate all components
   - **Files/Functions to Modify/Create:**
     - Target: `retro-source-portfolio/src/pages/Home/Home.jsx` + `Home.module.scss`
     - Target: `retro-source-portfolio/src/pages/Collections/Collections.jsx` + `Collections.module.scss`
     - Target: `retro-source-portfolio/src/pages/About/About.jsx` + `About.module.scss`
     - Target: `retro-source-portfolio/src/pages/Contact/ContactPage.jsx` + `ContactPage.module.scss`
     - Target: `retro-source-portfolio/src/App.jsx` (update with all routes)
     - Source (read-only): [app/routes/($locale)._index.jsx](app/routes/($locale)._index.jsx), [app/routes/($locale).collections.all.jsx](app/routes/($locale).collections.all.jsx)
   - **Steps:**
     1. Create Home.jsx with PageLayout wrapper
     2. Add ArcadeBody component to Home (CRT screen showcase)
     3. Add NewsCarousel to Home below ArcadeBody
     4. Add hero section with arcade logo and tagline
     5. Create Collections.jsx with grid of mock products
     6. Create mock products data (6-8 products with name, price, image, description)
     7. Add product cards with arcade-themed styling
     8. Create About.jsx with company story and arcade theme explanation
     9. Create ContactPage.jsx importing Contact component
     10. Update App.jsx with Routes: '/' → Home, '/collections' → Collections, '/about' → About, '/contact' → ContactPage
     11. Add navigation links to Header menu
     12. Test: All routes accessible, components render on correct pages, navigation works

---

### 5. **Phase 5: Data, Polish & Final Testing**
   - **Objective:** Create all mock data, add final polish (animations, sounds, responsive), and perform comprehensive testing
   - **Files/Functions to Modify/Create:**
     - Target: `retro-source-portfolio/src/data/productsData.js` (create mock products)
     - Target: `retro-source-portfolio/src/data/faqData.js` (create FAQ data)
     - Target: All SCSS modules (add animations, transitions, final polish)
     - Target: `retro-source-portfolio/src/styles/main.scss` (ensure all imports correct)
   - **Steps:**
     1. Create productsData.js with 8 mock products (arcade game themed: retro controllers, pixel art prints, arcade cabinets, etc.)
     2. Create faqData.js with 5-6 FAQs about the shop/products
     3. Add Framer Motion animations to page transitions
     4. Add hover animations to all interactive elements (buttons, cards, links)
     5. Test responsive design on mobile (320px), tablet (768px), desktop (1024px+)
     6. Verify all sounds play correctly (click, key-punch)
     7. Test arcade button events control carousel navigation
     8. Verify CRT gradient effect displays correctly
     9. Check all SCSS variables are used consistently
     10. Run final build test: `npm run build` in retro-source-portfolio
     11. Test production build: `npm run preview`
     12. Document any known issues or future enhancements

---

**Open Questions:**
1. Should the navigation menu be responsive with mobile hamburger menu, or simplified mobile-only menu?
2. For Collections page, should products be filterable/sortable, or simple static grid?
3. Should we add a 404 page with arcade theme, or redirect to Home?
4. Do you want the CRT screen effect on all pages or just Home page?
5. Should contact form have validation messages styled with arcade theme?
