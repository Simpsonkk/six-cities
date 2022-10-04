import { RoomDescription } from './types/room-card.model';

export const countPercentRating = (rating: number) => rating * 20;

export const filterRoomList = (city: string, roomList: RoomDescription[] ) => roomList.filter((room: RoomDescription) => room.city.name === city);

export const sortRoomList = (field: keyof RoomDescription) => (a: RoomDescription, b: RoomDescription) => +a[field] - +b[field];

export function selectSortingOption(currentSortingOption: string | undefined, roomList: RoomDescription[]) {
  switch (currentSortingOption) {
    case 'Popular':
      return roomList;
    case 'Price: low to high':
      return roomList.sort(sortRoomList('price'));
    case 'Price: high to low':
      return roomList.sort(sortRoomList('price')).reverse();
    case 'Top rated first':
      return roomList.sort(sortRoomList('rating')).reverse();
    default:
      return roomList;
  }
}

export const updateRoomsArray = (roomList: RoomDescription[], update: RoomDescription, index: number) => [
  ...roomList.slice(0, index),
  update,
  ...roomList.slice(index + 1),
];
