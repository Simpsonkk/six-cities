import { store } from '../store/store';
import { RoomDescription } from './room-card.model';

export type InitialState = {
  currrentCity: string,
  currentRoomList: RoomDescription[]
}
export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
