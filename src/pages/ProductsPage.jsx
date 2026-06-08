import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PRODUCTS, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import FilterSection from '../components/FilterSection';
import AnimatedArcadeButton from '../components/AnimatedArcadeButton';
import { StarParticles, CoinParticles } from '../components/Particles';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const navigate = useNavigate();

  // Filter state
  const [selectedTags, setSelectedTags] = useState([]);
  const [pendingTags, setPendingTags] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [pendingCollections, setPendingCollections] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  // View + list navigation
  const [view, setView] = useState('list');          // 'list' | 'card'
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [descriptionOpenId, setDescriptionOpenId] = useState(null);

  // Particle effects
  const [starParticles, setStarParticles] = useState(false);
  const [coinParticles, setCoinParticles] = useState(false);

  const { addToCart, openCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  // Build filtered list
  const filtered = PRODUCTS.filter((p) => {
    if (
      searchQuery &&
      !p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !p.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) return false;
    if (selectedTags.length > 0 && !p.tags.some((t) => selectedTags.includes(t))) return false;
    if (selectedCollections.length > 0 && !p.collections.some((c) => selectedCollections.includes(c))) return false;
    return true;
  });

  const selectedProduct = filtered[selectedIndex] || null;
  const wishlisted = selectedProduct ? isWishlisted(selectedProduct.id) : false;

  // Reset on filter change
  useEffect(() => {
    setSelectedIndex(0);
    setView('list');
    setDescriptionOpenId(null);
  }, [selectedTags, selectedCollections, searchQuery]);

  // Scroll selected list item into view
  const listItemRefs = useRef([]);
  useEffect(() => {
    if (view === 'list' && listItemRefs.current[selectedIndex]) {
      listItemRefs.current[selectedIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex, view]);

  // Refs so event handlers registered once stay current
  const viewRef = useRef('list');
  const selectedIndexRef = useRef(0);
  const filteredRef = useRef([]);
  const wishlistedRef = useRef(false);
  const actionsRef = useRef({});
  const searchQueryRef = useRef(searchQuery);

  useEffect(() => { viewRef.current = view; }, [view]);
  useEffect(() => { selectedIndexRef.current = selectedIndex; }, [selectedIndex]);
  useEffect(() => { filteredRef.current = filtered; });   // every render
  useEffect(() => { wishlistedRef.current = wishlisted; }, [wishlisted]);
  useEffect(() => { searchQueryRef.current = searchQuery; }, [searchQuery]);
  actionsRef.current = { toggleWishlist, addToCart, openCart };

  // If a search is active, "back to list" clears it; otherwise just flip the view
  const goBackToList = () => {
    if (searchQueryRef.current) {
      navigate('/products');
    } else {
      setView('list');
    }
  };

  // Arcade arrows — registered once
  useEffect(() => {
    const onNav = (e) => {
      if (viewRef.current === 'list') {
        const len = filteredRef.current.length;
        if (len === 0) return;
        if (e.detail === 'LEFT') setSelectedIndex((i) => (i === 0 ? len - 1 : i - 1));
        if (e.detail === 'RIGHT') setSelectedIndex((i) => (i === len - 1 ? 0 : i + 1));
      } else if (viewRef.current === 'card') {
        if (e.detail === 'LEFT') {
          if (searchQueryRef.current) navigate('/products');
          else setView('list');
        }
      }
    };
    window.addEventListener('arcadeNavigation', onNav);
    return () => window.removeEventListener('arcadeNavigation', onNav);
  }, []);

  // Arcade A / B buttons — registered once
  useEffect(() => {
    const onBtn = (e) => {
      const currentView = viewRef.current;
      const product = filteredRef.current[selectedIndexRef.current];

      if (currentView === 'list') {
        if (!product) return;
        if (e.detail === 'A') setView('card');
        if (e.detail === 'B') setDescriptionOpenId((prev) => (prev === product.id ? null : product.id));
      } else if (currentView === 'card') {
        if (!product) return;
        if (e.detail === 'A') {
          actionsRef.current.toggleWishlist(product.id);
          if (!wishlistedRef.current) {
            setStarParticles(true);
            setTimeout(() => setStarParticles(false), 1000);
          }
        }
        if (e.detail === 'B') {
          actionsRef.current.addToCart(product);
          actionsRef.current.openCart();
          setCoinParticles(true);
          setTimeout(() => setCoinParticles(false), 1000);
        }
      }
    };
    window.addEventListener('arcadeButtonPress', onBtn);
    return () => window.removeEventListener('arcadeButtonPress', onBtn);
  }, []);

  // Button handlers for mouse/touch (called from hints bar in card view)
  const doWishlist = () => {
    if (!selectedProduct) return;
    toggleWishlist(selectedProduct.id);
    if (!wishlisted) {
      setStarParticles(true);
      setTimeout(() => setStarParticles(false), 1000);
    }
  };

  const doCart = () => {
    if (!selectedProduct) return;
    addToCart(selectedProduct);
    openCart();
    setCoinParticles(true);
    setTimeout(() => setCoinParticles(false), 1000);
  };

  // Filter helpers
  const toggleTag = (tag) =>
    setPendingTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);

  const toggleCollection = (col) =>
    setPendingCollections((prev) => prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]);

  const applyFilters = () => {
    setSelectedTags(pendingTags);
    setSelectedCollections(pendingCollections);
    setFilterOpen(false);
  };

  const clearFilters = () => {
    setPendingTags([]);
    setPendingCollections([]);
    setSelectedTags([]);
    setSelectedCollections([]);
    setFilterOpen(false);
    setView('list');
  };

  const openFilters = () => {
    setPendingTags([...selectedTags]);
    setPendingCollections([...selectedCollections]);
    setFilterOpen(true);
  };

  return (
    <div className="products-page">

      {/* Search close button — only in list view so it disappears when a game is opened */}
      {searchQuery && view === 'list' && (
        <button
          className="products-page__search-close"
          onClick={() => navigate('/products')}
          aria-label="Clear search and return to full list"
        >
          ✕ {searchQuery}
        </button>
      )}

      {/* Page header — list view only */}
      {view === 'list' && (
        <div className="products-page__header">
          <h1 className="products-page__title">Products</h1>
          <button className="filter-toggle-btn" onClick={openFilters}>
            ☰ Filters
            {(selectedTags.length + selectedCollections.length > 0) && (
              <span> ({selectedTags.length + selectedCollections.length})</span>
            )}
          </button>
        </div>
      )}

      {/* Card hints — at top, replacing the header in card view */}
      {view === 'card' && (
        <div className="products-page__hints products-page__hints--card">
          <div className="arcade-nav-hint products-page__hint-btn" onClick={goBackToList}>
            <span className="arcade-nav-btn arcade-nav-btn--left" aria-hidden="true">
              <span className="arcade-nav-btn__inner"><img src="/images/left.svg" alt="" /></span>
            </span>
            <span className="arcade-nav-label">Back to list</span>
          </div>
          <div className="products-page__hints-actions">
            <div className="arcade-action-hint products-page__hint-btn" onClick={doWishlist}>
              <AnimatedArcadeButton letter="A" />
              <span className="arcade-action-hint__label">
                {wishlisted ? 'Remove wishlist' : 'Wishlist'}
              </span>
            </div>
            <div className="arcade-action-hint products-page__hint-btn" onClick={doCart}>
              <AnimatedArcadeButton letter="B" delay={400} />
              <span className="arcade-action-hint__label">Add to cart</span>
            </div>
          </div>
        </div>
      )}

      {/* List hints — at top, above the product list */}
      {view === 'list' && (
        <div className="products-page__hints products-page__hints--list">
          <div className="arcade-nav-hint">
            <span className="arcade-nav-btn arcade-nav-btn--left" aria-hidden="true">
              <span className="arcade-nav-btn__inner"><img src="/images/left.svg" alt="" /></span>
            </span>
            <span className="arcade-nav-label">Navigate</span>
            <span className="arcade-nav-btn arcade-nav-btn--right" aria-hidden="true">
              <span className="arcade-nav-btn__inner"><img src="/images/right.svg" alt="" /></span>
            </span>
          </div>
          <div className="products-page__hints-actions">
            <div className="arcade-action-hint">
              <AnimatedArcadeButton letter="A" />
              <span className="arcade-action-hint__label">Open game</span>
            </div>
            <div className="arcade-action-hint">
              <AnimatedArcadeButton letter="B" delay={400} />
              <span className="arcade-action-hint__label">Toggle details</span>
            </div>
          </div>
        </div>
      )}

      {/* Content area */}
      <div className={`products-page__content ${view === 'list' ? 'list-view' : 'card-view'}`}>

        {view === 'list' ? (
          /* ── LIST VIEW ── */
          filtered.length === 0 ? (
            <div className="products-page__empty">
              <p>No games match your filters.</p>
              <button className="filter-panel__clear" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className="product-list">
              {filtered.map((product, i) => (
                <div
                  key={product.id}
                  ref={(el) => { listItemRefs.current[i] = el; }}
                  className={`product-list__item${i === selectedIndex ? ' selected' : ''}`}
                >
                  <div
                    className="product-list__row"
                    onClick={() => setSelectedIndex(i)}
                    onDoubleClick={() => { setSelectedIndex(i); setView('card'); }}
                  >
                    <span className="product-list__cursor">
                      {i === selectedIndex ? '▶' : '  '}
                    </span>
                    {product.icon && (
                      <img className="product-list__icon" src={product.icon} alt="" aria-hidden="true" />
                    )}
                    <span className="product-list__name">{product.title}</span>
                    <span className="product-list__price">{formatPrice(product.price)}</span>
                  </div>

                  {descriptionOpenId === product.id && (
                    <div className="product-list__desc">{product.description}</div>
                  )}
                </div>
              ))}
            </div>
          )
        ) : (
          /* ── CARD VIEW ── */
          selectedProduct ? (
            <div className="product-display">
              {/* Top row: image + basic info */}
              <div className="product-display__row">
                <div className="product-display__image">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.imageAlt}
                    onError={(e) => { e.target.src = '/images/logo_arcade.png'; }}
                  />
                </div>
                <div className="product-display__info">
                  <h2 className="product-display__title">{selectedProduct.title}</h2>
                  <p className="product-display__price">{formatPrice(selectedProduct.price)}</p>
                </div>
              </div>

              {/* Full-width description */}
              <div className="product-display__description">
                <h3>Description</h3>
                <p>{selectedProduct.description}</p>
              </div>
            </div>
          ) : null
        )}
      </div>

      {/* Card view hints — at bottom */}
      {/* Tags — below card content */}
      {view === 'card' && selectedProduct && (
        <div className="product-display__tags">
          {[...selectedProduct.tags, ...selectedProduct.collections].map((t) => (
            <span key={t} className="product-display__tag">{t}</span>
          ))}
        </div>
      )}

      {/* Particles anchored to bottom of CRT */}
      <div className="products-page__particles">
        {starParticles && <StarParticles />}
        {coinParticles && <CoinParticles />}
      </div>

      <FilterSection
        selectedTags={pendingTags}
        selectedCollections={pendingCollections}
        onTagChange={toggleTag}
        onCollectionChange={toggleCollection}
        onApply={applyFilters}
        onClear={clearFilters}
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
      />
    </div>
  );
}
