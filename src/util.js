export const countPercentRating = (rating) => rating * 20;

export const filterRoomList = (city, roomList) => roomList.filter((room) => room.city.name === city);

export const sortRoomList = (field) => (a, b) => a[field] - b[field];

export function selectSortingOption(currentSortingOption, roomList) {
  switch (currentSortingOption) {
    case 'Popular':
      return roomList;
    case 'Price: low to high':
      return [...roomList].sort(sortRoomList('price'));
    case 'Price: high to low':
      return [...roomList].sort(sortRoomList('price')).reverse();
    case 'Top rated first':
      return [...roomList].sort(sortRoomList('rating')).reverse();
    default:
      return roomList;
  }
}
