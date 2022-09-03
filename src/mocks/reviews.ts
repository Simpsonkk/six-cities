import { Reviews } from '../types/reviews.model';

export const reviews: Reviews = [
  {
    userId: 1,
    cityId:1,
    cardId:1,
    avatar: 'img/avatar-max.jpg',
    name: 'Max',
    isPro: false,
    raiting: 5,
    comment: 'Bathed in the nature. Completely unplugged. Unforgettable.',
    data: '2022-01-05'
  },
  {
    userId: 2,
    cityId:2,
    cardId:3,
    avatar: 'img/avatar-max.jpg',
    name: 'Sam',
    isPro: true,
    raiting: 4,
    comment: 'What an amazing view! The house is stunning and in an amazing location.',
    data: '2022-06-08'
  },
];


