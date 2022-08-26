import { RoomsDescription } from '../types/room-card.model';

export const rooms: RoomsDescription = [
  {
    roomCardId: 1,
    city: 'Amsterdam',
    isPremium: true,
    img: 'img/apartment-02.jpg',
    price: 132,
    isFavorite: true,
    raiting: 5,
    description: 'Canal View Prinsengracht',
    type: 'Apartment',
    bedrooms: 2,
    maxAdults: 4,
    services: ['Wi-Fi', 'Washing machine', 'Coffee machine'],
    host: {
      avatar: 'img/avatar-angelina.jpg',
      name: 'Angelina',
      isPro: true,
      comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    }
  },
  {
    roomCardId: 2,
    city: 'Amsterdam',
    isPremium: true,
    img: 'img/apartment-03.jpg',
    price: 180,
    isFavorite: false,
    raiting: 3,
    description: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    bedrooms: 1,
    maxAdults: 3,
    services: ['Washing machine', 'Towels', 'Heating'],
    host: {
      avatar: 'img/avatar-angelina.jpg',
      name: 'Angelina',
      isPro: true,
      comment: 'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    }
  },
  {
    roomCardId: 3,
    city: 'Hamburg',
    isPremium: true,
    img: 'img/apartment-01.jpg',
    price: 120,
    isFavorite: true,
    raiting: 4,
    description: 'luxurious apartment at great location',
    type: 'Apartment',
    bedrooms: 4,
    maxAdults: 6,
    services: ['Wi-Fi', 'Washing machine', 'fridge'],
    host: {
      avatar: 'img/avatar-angelina.jpg',
      name: 'Kate',
      isPro: true,
      comment: 'I am happy to welcome you to my apartment in the city center! Three words: location, cosy and chic!',
    }
  },
  {
    roomCardId: 4,
    city: 'Hamburg',
    isPremium: false,
    img: 'img/room.jpg',
    price: 80,
    isFavorite: false,
    raiting: 3,
    description: 'Wood and stone place',
    type: 'Private room',
    bedrooms: 1,
    maxAdults: 2,
    services: ['Wi-Fi', 'Towels', 'Heating'],
    host: {
      avatar: 'img/avatar-angelina.jpg',
      name: 'Kate',
      isPro: true,
      comment: 'This is a place for dreamers to reset, reflect, and create. Designed with a "slow" pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning.',
    }
  }
];

