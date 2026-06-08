/**
 * Mock Data pour remplacer les appels Shopify API
 * Permet de tester le site sans connexion Shopify
 */

export const MOCK_SHOP = {
  id: 'gid://shopify/Shop/1',
  name: 'Retro Source',
  description: 'Retro Gaming Store',
  primaryDomain: {
    url: 'http://localhost:3004',
  },
  brand: {
    logo: {
      image: {
        url: '/images/logo_arcade.png',
      },
    },
  },
};

export const MOCK_HEADER_MENU = {
  id: 'gid://shopify/Menu/main',
  items: [
    {
      id: 'gid://shopify/MenuItem/1',
      resourceId: null,
      tags: [],
      title: 'Home',
      type: 'FRONTPAGE',
      url: '/',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/2',
      resourceId: 'gid://shopify/Collection/all',
      tags: [],
      title: 'Collections',
      type: 'COLLECTION',
      url: '/collections',
      items: [
        {
          id: 'gid://shopify/MenuItem/2-1',
          resourceId: 'gid://shopify/Collection/consoles',
          tags: [],
          title: 'Consoles',
          type: 'COLLECTION',
          url: '/collections/consoles',
        },
        {
          id: 'gid://shopify/MenuItem/2-2',
          resourceId: 'gid://shopify/Collection/games',
          tags: [],
          title: 'Games',
          type: 'COLLECTION',
          url: '/collections/games',
        },
        {
          id: 'gid://shopify/MenuItem/2-3',
          resourceId: 'gid://shopify/Collection/accessories',
          tags: [],
          title: 'Accessories',
          type: 'COLLECTION',
          url: '/collections/accessories',
        },
      ],
    },
    {
      id: 'gid://shopify/MenuItem/3',
      resourceId: null,
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/4',
      resourceId: null,
      tags: [],
      title: 'Contact',
      type: 'PAGE',
      url: '/pages/contact',
      items: [],
    },
  ],
};

export const MOCK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/footer',
  items: [
    {
      id: 'gid://shopify/MenuItem/f1',
      resourceId: 'gid://shopify/ShopPolicy/privacy',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/f2',
      resourceId: 'gid://shopify/ShopPolicy/refund',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/f3',
      resourceId: 'gid://shopify/ShopPolicy/shipping',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/f4',
      resourceId: 'gid://shopify/ShopPolicy/terms',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

export const MOCK_PRODUCTS = {
  nodes: [
    {
      id: 'gid://shopify/Product/1',
      title: 'Nintendo Game Boy Color - Atomic Purple',
      handle: 'game-boy-color-atomic-purple',
      priceRange: {
        minVariantPrice: {
          amount: '89.99',
          currencyCode: 'USD',
        },
      },
      images: {
        nodes: [
          {
            id: 'gid://shopify/ProductImage/1',
            url: '/images/logo_arcade.png', // Using existing local image as placeholder
            altText: 'Game Boy Color Atomic Purple',
            width: 500,
            height: 500,
          },
        ],
      },
    },
    {
      id: 'gid://shopify/Product/2',
      title: 'Super Nintendo Entertainment System (SNES)',
      handle: 'super-nintendo-snes',
      priceRange: {
        minVariantPrice: {
          amount: '149.99',
          currencyCode: 'USD',
        },
      },
      images: {
        nodes: [
          {
            id: 'gid://shopify/ProductImage/2',
            url: '/images/logo_arcade.png', // Using existing local image as placeholder
            altText: 'Super Nintendo SNES Console',
            width: 500,
            height: 500,
          },
        ],
      },
    },
    {
      id: 'gid://shopify/Product/3',
      title: 'Sega Genesis Model 1',
      handle: 'sega-genesis-model-1',
      priceRange: {
        minVariantPrice: {
          amount: '129.99',
          currencyCode: 'USD',
        },
      },
      images: {
        nodes: [
          {
            id: 'gid://shopify/ProductImage/3',
            url: '/images/logo_arcade.png', // Using existing local image as placeholder
            altText: 'Sega Genesis Console',
            width: 500,
            height: 500,
          },
        ],
      },
    },
    {
      id: 'gid://shopify/Product/4',
      title: 'Nintendo 64 - Jungle Green',
      handle: 'nintendo-64-jungle-green',
      priceRange: {
        minVariantPrice: {
          amount: '179.99',
          currencyCode: 'USD',
        },
      },
      images: {
        nodes: [
          {
            id: 'gid://shopify/ProductImage/4',
            url: '/images/logo_arcade.png', // Using existing local image as placeholder
            altText: 'Nintendo 64 Jungle Green',
            width: 500,
            height: 500,
          },
        ],
      },
    },
  ],
};

export const MOCK_CART = {
  id: 'gid://shopify/Cart/1',
  checkoutUrl: '/checkout',
  totalQuantity: 0,
  lines: {
    nodes: [],
  },
  cost: {
    subtotalAmount: {
      amount: '0.00',
      currencyCode: 'USD',
    },
    totalAmount: {
      amount: '0.00',
      currencyCode: 'USD',
    },
    totalTaxAmount: null,
  },
};

/**
 * Simule une réponse Shopify réussie
 */
export function mockShopifyResponse(data) {
  return Promise.resolve(data);
}

/**
 * Active/désactive le mode mock
 * Mettre à true pour utiliser les données mock
 */
export const USE_MOCK_DATA = true;
