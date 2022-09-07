import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomDescription } from '../types/room-card.model';
import { InitialState } from '../types/state.model';
import { rooms } from './../mocks/offers';

const initialCity = 'Amsterdam';

const initialRooms = rooms.filter((room) => room.city.name === initialCity);

const initialState: InitialState = {
  city: initialCity,
  rooms: initialRooms
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {state.city = action.payload;},
    fillListRooms: (state, action: PayloadAction<RoomDescription[]>) => {state.rooms = action.payload;}
  }
});

export const { changeCity } = citiesSlice.actions;
export default citiesSlice.reducer;
