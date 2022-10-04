import { Review } from './reviews.model';
import { AuthorizationStatus } from '../const';
import { store } from '../store/store';
import { RoomDescription } from './room-card.model';

export type InitialState = {
  currrentCity: string,
  authorizationStatus: AuthorizationStatus,
  roomList: RoomDescription[],
  isDataLoaded: boolean,
  favoriteRooms: RoomDescription[],
  currentRoom: null | RoomDescription
  nearbyRooms: RoomDescription[],
  reviews: Review[]
}
export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
