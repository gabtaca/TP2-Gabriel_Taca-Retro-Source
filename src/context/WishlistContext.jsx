import { createContext, useContext, useState } from 'react';

const WishlistContext = createContext(null);

function readStorage() {
  try {
    return JSON.parse(localStorage.getItem('retrosource-wishlist') || '{}');
  } catch {
    return {};
  }
}

function writeStorage(data) {
  localStorage.setItem('retrosource-wishlist', JSON.stringify(data));
  // Also mirror to cookie as per original feature
  try {
    document.cookie = `retrosource-wishlist=${encodeURIComponent(JSON.stringify(data))}; max-age=${7 * 24 * 3600}; SameSite=Strict; path=/`;
  } catch {
    // cookie write failed, localStorage still works
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(readStorage);

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const next = { ...prev };
      if (next[productId]) {
        delete next[productId];
      } else {
        next[productId] = true;
      }
      writeStorage(next);
      return next;
    });
  };

  const isWishlisted = (productId) => !!wishlist[productId];

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
