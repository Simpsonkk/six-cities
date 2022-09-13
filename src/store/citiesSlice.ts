import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { APIRoute, AuthorizationStatus } from '../const';
import { RoomDescription } from '../types/room-card.model';
import { InitialState } from '../types/state.model';
import { api, store } from './store';

const initialCity = 'Amsterdam';

const initialState: InitialState = {
  currrentCity: initialCity,
  roomList: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  favoriteRooms: []
};

export const fetchRoomsAction = createAsyncThunk(
  'cities/fetchRoomsAction',
  async () => {
    const {data} = await api.get<RoomDescription[]>(APIRoute.ListRooms);
    store.dispatch(loadListRooms(data));
  }
);

export const fetchFavoriteRoomsAction = createAsyncThunk(
  'cities/fetchFavoriteRoomsAction',
  async () => {
    const {data} = await api.get<RoomDescription[]>(APIRoute.Favorite);
    store.dispatch(loadFavoriteRooms(data));
  },
);

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.currrentCity = action.payload;},
    loadListRooms: (state, action: PayloadAction<RoomDescription[]>) => {
      state.roomList = action.payload;
      state.isDataLoaded = true;},
    loadFavoriteRooms: (state, action: PayloadAction<RoomDescription[]>) => {
      state.favoriteRooms = action.payload;}
  }
});

export const { changeCity, loadListRooms, loadFavoriteRooms} = citiesSlice.actions;
export default citiesSlice.reducer;
