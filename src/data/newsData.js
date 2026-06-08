export class News {
  constructor(title, source, date, imageUrl, link, description = '') {
    this.title = title;
    this.source = source;
    this.date = date;
    this.imageUrl = imageUrl;
    this.link = link;
    this.description = description;
  }
}

export const newsList = [
  new News(
    'Nitro Deck Nintendo Switch Controllers',
    'GameSpot',
    '2024-07-11',
    'https://assets-prd.ignimgs.com/2023/09/18/img-1061-1695010900496.jpg',
    'https://www.gamespot.com/articles/nitro-deck-nintendo-switch-controllers-receive-big-price-cuts-before-prime-day-2024/1100-6519892/',
    'Nintendo Switch controllers receive major price cuts just before Prime Day 2024.',
  ),
  new News(
    'Every Major Video Game Release',
    'Gameranx',
    '2024-07-10',
    'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/05/upcoming-xbox-games-assassin-s-creed-shadows-indiana-jones-stalker-2.jpg?q=49&fit=crop&w=1100&h=618&dpr=2',
    'https://gamerant.com/xbox-series-x-game-release-dates/',
    'Complete list of every major video game releasing on Xbox this year.',
  ),
  new News(
    'Peanut Butter the Dog',
    'PC Gamer',
    '2024-07-07',
    'https://cdn.mos.cms.futurecdn.net/oeTGpZrqENGozYn6ZNHhZC-970-80.jpg.webp',
    'https://www.pcgamer.com/gaming-industry/events-conferences/peanut-butter-the-dog-finishes-ken-griffey-jr-speedrun-at-sgdq-with-a-walk-off-home-run-in-extra-innings/',
    'Peanut Butter the dog finishes Ken Griffey Jr. speedrun at SGDQ with a walk-off home run.',
  ),
  new News(
    'Rick and Morty: The Anime Trailer',
    'IGN',
    '2024-07-11',
    'https://assets-prd.ignimgs.com/2024/07/11/1-1720710683475.png?crop=16%3A9&width=888&dpr=2',
    'https://www.ign.com/articles/rick-and-morty-the-anime-trailer-multiversal-madness-august-debut',
    'Rick and Morty: The Anime trailer reveals multiversal madness ahead of August debut.',
  ),
  new News(
    'Rockstar Considers Bully Super Popular',
    'The Gamer',
    '2024-07-11',
    'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2024/07/bullyjimmyhopkins.jpg?q=70&fit=crop&w=1100&h=618&dpr=1',
    'https://www.thegamer.com/rockstar-games-thinks-bully-canis-canem-edit-is-one-of-its-most-popular-series-franchises-on-pc/',
    'Rockstar Games considers Bully one of its most popular franchise series on PC.',
  ),
  new News(
    'Zelda: Echoes Of Wisdom Trailer',
    'Kotaku',
    '2024-06-20',
    'https://i.kinja-img.com/image/upload/c_fit,q_60,w_1315/08753c398a8ddcb227853d4019ce3f04.jpg',
    'https://kotaku.com/legend-of-zelda-echoes-of-wisdom-timeline-link-to-past-1851551343',
    'New Zelda: Echoes of Wisdom trailer connects to A Link to the Past timeline.',
  ),
  new News(
    'Elden Ring: Shadow of the Erdtree DLC Review',
    'N4G',
    '2024-07-06',
    'https://newsboilerstorage.blob.core.windows.net/news/2609467_0_lg.jpg',
    'https://n4g.com/news/2609467/elden-ring-shadow-of-the-erdtree-review-capsule-computers',
    'Elden Ring Shadow of the Erdtree DLC receives rave reviews from critics.',
  ),
];
