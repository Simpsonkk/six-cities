import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomDescription } from '../types/room-card.model';
import { InitialState } from '../types/state.model';
// import { selectListRoom } from '../util';

const initialCity = 'Amsterdam';

const initialState: InitialState = {
  currrentCity: initialCity,
  currentRoomList: []
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {state.currrentCity = action.payload;},
    fillListRooms: (state, action: PayloadAction<RoomDescription[]>) => {state.currentRoomList = action.payload;}
  }
});

export const { changeCity, fillListRooms } = citiesSlice.actions;
export default citiesSlice.reducer;
