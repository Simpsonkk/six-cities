import { rooms } from './mocks/offers';

export const countPercentRating = (rating) => rating * 20;

export const selectListRoom = (city) => rooms.filter((room) => room.city.name === city);
