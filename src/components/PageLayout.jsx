import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import ArcadeBody from './ArcadeBody';
import CartAside from './CartAside';

export default function PageLayout({ children }) {
  const [searchOpen, setSearchOpen] = useState(false);

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
                  window.location.href = `/products?search=${encodeURIComponent(q)}`;
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
          <div className="page-crt">
            {children}
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
