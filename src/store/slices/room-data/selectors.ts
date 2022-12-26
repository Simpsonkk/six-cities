import { Review } from './../../../types/reviews.model';
import { NameSpace } from './../../../consts';
import { RoomDescription } from './../../../types/room-card.model';
import { State } from './../../../types/state.model';

export const getRoomList = (state: State): RoomDescription[] =>
  state[NameSpace.Data].roomList;
export const getLoadedDataStatus = (state: State): boolean =>
  state[NameSpace.Data].isDataLoaded;
export const getFavoriteRooms = (state: State): RoomDescription[] =>
  state[NameSpace.Data].favoriteRooms;
export const getCurrentRoom = (state: State): null | RoomDescription =>
  state[NameSpace.Data].currentRoom;
export const getNearbyRooms = (state: State): RoomDescription[] =>
  state[NameSpace.Data].nearbyRooms;
export const getReviews = (state: State): Review[] =>
  state[NameSpace.Data].reviews;
