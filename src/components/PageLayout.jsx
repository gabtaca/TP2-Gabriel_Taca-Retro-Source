import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ArcadeBody from './ArcadeBody';
import CartAside from './CartAside';

export default function PageLayout({ children }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  // ── CRT Scroll Indicator ────────────────────────────────────
  const crtRef = useRef(null);
  const [scrollState, setScrollState] = useState({ canScroll: false, atTop: true, atBottom: false });

  const updateScroll = useCallback(() => {
    const el = crtRef.current;
    if (!el) return;
    const canScroll = el.scrollHeight > el.clientHeight + 1; // +1 for sub-pixel rounding
    const atTop    = el.scrollTop <= 0;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
    // Functional update with equality guard — identical state returns same ref → no re-render
    setScrollState((prev) => {
      if (prev.canScroll === canScroll && prev.atTop === atTop && prev.atBottom === atBottom) {
        return prev;
      }
      return { canScroll, atTop, atBottom };
    });
  }, []);

  // Re-check after every render (catches children content changes on route nav).
  // The equality guard in setScrollState prevents infinite loops.
  useEffect(() => { updateScroll(); });

  // Scroll + resize listeners — registered once
  useEffect(() => {
    const el = crtRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, [updateScroll]);

  const { canScroll, atTop, atBottom } = scrollState;
  const showUp   = canScroll && !atTop;
  const showDown = canScroll && !atBottom;

  return (
    <>
      <CartAside />

      <Header onSearchOpen={() => setSearchOpen(true)} />

      {/* Simple search overlay */}
      {searchOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '80px',
          }}
          onClick={() => setSearchOpen(false)}
        >
          <div
            style={{
              background: '#d1d5db',
              border: '3px solid #b91c1c',
              borderRadius: '8px',
              padding: '1.5rem',
              width: '90%',
              maxWidth: '480px',
              fontFamily: 'Silkscreen, monospace',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p style={{ marginBottom: '0.75rem', fontWeight: 'bold' }}>
              Find the perfect game!
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const q = e.target.q.value.trim();
                if (q) {
                  navigate(`/products?search=${encodeURIComponent(q)}`);
                }
                setSearchOpen(false);
              }}
              style={{ display: 'flex', gap: '0.5rem' }}
            >
              <input
                name="q"
                type="search"
                placeholder="Search games…"
                autoFocus
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  border: '2px solid #b91c1c',
                  borderRadius: '4px',
                  background: '#f3f4f6',
                  fontFamily: 'inherit',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '0.5rem',
                  background: '#b91c1c',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                <img src="/images/search.svg" alt="Search" style={{ width: '20px', height: '20px', filter: 'invert(1)' }} />
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="page-stage">
        <main>
          <div className="page-crt-wrap">
            <div className="page-crt" ref={crtRef}>
              {children}
            </div>

            {/* Scroll position indicator — outside the overflow container */}
            {canScroll && (
              <div className="crt-scroll-indicator" aria-hidden="true">
                {showUp   && <span className="crt-scroll-indicator__arrow crt-scroll-indicator__arrow--up">&#9650;</span>}
                {showUp && showDown && <span className="crt-scroll-indicator__sep">-</span>}
                {showDown && <span className="crt-scroll-indicator__arrow crt-scroll-indicator__arrow--down">&#9660;</span>}
              </div>
            )}
          </div>

          <div className="page-live" aria-label="Live">
            <span className="page-live__label">Live</span>
            <div className="page-live__light" />
          </div>
        </main>

        <ArcadeBody />
      </div>

      <Footer />
    </>
  );
}
