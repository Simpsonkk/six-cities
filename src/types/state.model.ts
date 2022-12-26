import { Review } from './reviews.model';
import { AuthorizationStatus } from '../consts';
import { store } from '../store/store';
import { RoomDescription } from './room-card.model';

export type RoomDataState = {
  roomList: RoomDescription[];
  isDataLoaded: boolean;
  favoriteRooms: RoomDescription[];
  currentRoom: null | RoomDescription;
  nearbyRooms: RoomDescription[];
  reviews: Review[];
};

export type CitiesState = {
  currrentCity: string,
}

export type UserProcessState = {
  authorizationStatus: AuthorizationStatus,
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
