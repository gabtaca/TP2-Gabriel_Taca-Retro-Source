export const COLLECTIONS = [
  'Sports',
  'Adventure',
  'Management',
  'Fighting',
  'Platformer',
  'RPG',
  'Stealth',
  'Social simulator',
  'Racing',
];

export const TAGS = ['1-player', '1-4 Player', '1-2 Players'];

export const PRODUCTS = [
  {
    id: '1',
    title: 'Fishing for compliments!',
    handle: 'fishing-for-compliments',
    price: 0.50,
    currency: 'CAD',
    description:
      'Take the time to relax and enjoy a good time fishing with good music! The fish will always be there for you!',
    tags: ['1-player'],
    collections: ['Adventure'],
    image: '/images/image_game-fishingforcompliments.png',
    imageAlt: 'Pixel art fishing game — Fishing for compliments!',
    icon: '/images/image_game-fishingforcompliments-list.png',
  },
  {
    id: '2',
    title: 'Tires Destroyers',
    handle: 'tires-destroyers',
    price: 0.75,
    currency: 'CAD',
    description:
      'Use your mouse wheel to destroy tires in this drift racing game!',
    tags: ['1-2 Players'],
    collections: ['Racing', 'Sports'],
    image: '/images/image_game-tiresdestroyers.png',
    imageAlt: 'Pixel art drift racing game — Tires Destroyers',
    icon: '/images/image_game-tiresdestroyers-list.png',
  },
  {
    id: '3',
    title: 'Mouses Fighting',
    handle: 'mouses-fighting',
    price: 0.85,
    currency: 'CAD',
    description:
      'Step into the ring and fight your way to the championship — with nothing but your mouse. Left click jabs, right click hooks, and sharp flicks land the knockouts. Read your opponent, time your dodges, and become the undisputed pixel boxing champion.',
    tags: ['1-2 Players'],
    collections: ['Fighting', 'Sports'],
    image: '/images/image_game-mousefighting.png',
    imageAlt: 'Pixel art mouse-controlled boxing game — Mouses Fighting',
    icon: '/images/image_game-mousefighting-list.png',
  },
  {
    id: '4',
    title: 'Mouse-atouilli',
    handle: 'mouse-atouilli',
    price: 0.90,
    currency: 'CAD',
    description:
      'Use the mouse to cook wonderful dishes while relaxing. Chop, stir, and plate your way to culinary bliss — no stress, just good vibes and great food.',
    tags: ['1-player'],
    collections: ['Management'],
    image: '/images/image_game-cookingpixels.png',
    imageAlt: 'Pixel art cooking game — Mouse-atouilli',
    icon: '/images/image_game-cookingpixels-list.png',
  },
  {
    id: '6',
    title: 'Shhh!adow ninja dad',
    handle: 'shhhadow-ninja-dad',
    price: 0.80,
    currency: 'CAD',
    description:
      'Goal of the game: get back in bed without waking up the whole house! Be one with the shadows!',
    tags: ['1-player'],
    collections: ['Stealth'],
    image: '/images/image_game-shhhadowninjadad.png',
    imageAlt: 'Pixel art stealth game — Shhh!adow ninja dad',
    icon: '/images/image_game-shhhadowninjadad-list.png',
  },
  {
    id: '8',
    title: 'Harvest Moon...shine',
    handle: 'harvest-moonshine',
    price: 0.70,
    currency: 'CAD',
    description:
      'Prohibition is on — but the still never stops. Run your secret moonshine operation under the noses of the feds, grow your crops by day and brew by night. One wrong move and the law comes knocking.',
    tags: ['1-player'],
    collections: ['Social simulator'],
    image: '/images/image_game-harvestmoon-shine.png',
    imageAlt: 'Pixel art social sim game — Harvest Moon...shine',
    icon: '/images/image_game-harvestmoon-shine-list.png',
  },
  {
    id: '9',
    title: 'SPACE BAR',
    handle: 'space-bar',
    price: 0.60,
    currency: 'CAD',
    description:
      'A cosmonaut\'s fate rests on your spacebar. Press it in rhythm with the story beats and your hero floats through triumph — miss the moment and the cosmos makes him pay. Every keystroke writes the next chapter.',
    tags: ['1-4 Player'],
    collections: ['Adventure'],
    image: '/images/image_game-spacebar.png',
    imageAlt: 'SPACE BAR — a story-driven cosmonaut game controlled entirely by the spacebar',
    icon: '/images/image_game-spacebar-list.png',
  },
];

export function formatPrice(price, currency = 'CAD') {
  return `CA$${price.toFixed(2)}`;
}
