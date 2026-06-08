export const HEADER_MENU = [
  { id: '1', title: 'HOME', url: '/' },
  { id: '2', title: 'OUR PRODUCTS', url: '/products' },
  {
    id: '3',
    title: 'MENU',
    url: null,
    items: [
      { id: '3-1', title: 'CONTACT', url: '/contact' },
      { id: '3-2', title: 'OUR PARTNERS', url: '/partners' },
      { id: '3-3', title: 'POLICIES', url: '/policies' },
      { id: '3-4', title: 'FAQ', url: '/faq' },
    ],
  },
];

export const FOOTER_MENU = [
  { id: '1', title: 'Privacy Policy', url: '/policies/privacy' },
  { id: '2', title: 'Refund Policy', url: '/policies/refund' },
  { id: '3', title: 'Shipping Policy', url: '/policies/shipping' },
  { id: '4', title: 'Terms of Service', url: '/policies/terms' },
];

export const SHOP = {
  name: 'RETRO-SOURCE',
  logo: '/images/logo_arcade.png',
};
