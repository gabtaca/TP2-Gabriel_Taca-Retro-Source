import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { HEADER_MENU, SHOP } from '../data/navigation';
import { useCart } from '../context/CartContext';

// Maps nav item id → colour-specific CSS class for the pulsing active glow
const NAV_COLOR = { '1': 'nav-home', '2': 'nav-products' };

export default function Header({ onSearchOpen }) {
  const { totalQuantity, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Detect if any MENU child route is currently active
  const menuChildren = HEADER_MENU.find((i) => i.items)?.items ?? [];
  const menuActive = menuChildren.some((c) => location.pathname.startsWith(c.url));

  const allMobileLinks = HEADER_MENU.flatMap((item) =>
    item.items
      ? [{ id: item.id, title: item.title, url: item.url }, ...item.items]
      : [item],
  );

  return (
    <>
      <header className="header">
        <div className="header__border-1">
          <div className="header__border-2">
            <div className="header__border-3">
              {/* Mobile burger — leftmost on mobile, hidden on desktop */}
              <button
                className="header__mobile-toggle reset"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <span className="header__mobile-lines" aria-hidden="true">
                  <span className="header__mobile-line" />
                  <span className="header__mobile-line" />
                  <span className="header__mobile-line" />
                </span>
              </button>

              {/* Brand — centered on mobile, left on desktop */}
              <NavLink to="/" className="header__brand">
                <img src={SHOP.logo} alt={`${SHOP.name} Logo`} />
                <strong>{SHOP.name}</strong>
              </NavLink>

              {/* Desktop nav */}
              <nav className="header__nav" aria-label="Main navigation">
                {HEADER_MENU.map((item) =>
                  item.items ? (
                    <div className="header__nav-item" key={item.id}>
                      <button
                        className={`header__nav-link nav-menu${menuActive ? ' active' : ''}`}
                      >
                        {item.title}
                      </button>
                      <ul className="header__submenu">
                        {item.items.map((child) => (
                          <li key={child.id}>
                            <Link
                              to={child.url}
                              className="header__submenu-item"
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <NavLink
                      key={item.id}
                      to={item.url}
                      className={({ isActive }) =>
                        `header__nav-link ${NAV_COLOR[item.id] ?? ''}${isActive ? ' active' : ''}`
                      }
                      end={item.url === '/'}
                    >
                      {item.title}
                    </NavLink>
                  ),
                )}
              </nav>

              {/* CTAs — search + cart only (toggle moved out) */}
              <nav className="header__ctas" aria-label="Utilities">
                <button
                  className="header__search-btn reset"
                  onClick={onSearchOpen}
                  aria-label="Search"
                >
                  <span className="header__search-label">SEARCH</span>
                  <img src="/images/search.svg" alt="" />
                </button>

                <button
                  className="header__cart-btn reset"
                  onClick={openCart}
                  aria-label={`Cart, ${totalQuantity} items`}
                >
                  <span className="header__cart-label">CART</span>
                  <span className="header__cart-count">
                    {totalQuantity > 0 ? totalQuantity : ''}
                  </span>
                  <img src="/images/cart.svg" alt="" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <nav
        className={`header__mobile-nav${mobileOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
      >
        <button
          className="header__mobile-close"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        {allMobileLinks.map((item) =>
          item.url ? (
            <Link
              key={item.id}
              to={item.url}
              className="header__mobile-link"
              onClick={() => setMobileOpen(false)}
            >
              {item.title}
            </Link>
          ) : null,
        )}
      </nav>
    </>
  );
}
