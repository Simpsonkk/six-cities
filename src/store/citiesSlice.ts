import { errorHandler } from './../services/error-hadler';
import { saveUserAvatarUrl, removeUserAvatarUrl } from './../services/user-avatar-url';
import { saveUserEmail, removeUserEmail } from './../services/user-email';
import { saveToken, removeToken } from './../services/token';
import { UserData } from './../types/user-data.model';
import { AuthData } from '../types/auth-data.model';
import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppRoute, APIRoute, AuthorizationStatus } from '../const';
import { RoomDescription } from '../types/room-card.model';
import { InitialState } from '../types/state.model';
import { api, store } from './store';

const initialCity = 'Amsterdam';

const initialState: InitialState = {
  currrentCity: initialCity,
  roomList: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  favoriteRooms: [],
  // userEmail: '',
  // userAvatarUrl: '',
};

export const setListRoomAction = createAsyncThunk(
  'cities/setListRoomAction',
  async () => {
    const {data} = await api.get<RoomDescription[]>(APIRoute.ListRooms);
    store.dispatch(loadListRooms(data));
  }
);

export const setFavoriteRoomsAction = createAsyncThunk(
  'cities/setFavoriteRoomsAction',
  async () => {
    const {data} = await api.get<RoomDescription[]>(APIRoute.Favorite);
    store.dispatch(loadFavoriteRooms(data));
  },
);

export const loginAction = createAsyncThunk(
  'cities/loginAction',
  async ({login: email, password}: AuthData) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      store.dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      saveUserEmail(data.email);
      saveUserAvatarUrl(data.avatarUrl);
      store.dispatch(redirectToRoute(AppRoute.Main));
    } catch (error) {
      errorHandler(error);
      store.dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  }
);

export const logoutAction = createAsyncThunk(
  'cities/logoutAction',
  async () => {
    try {
      api.delete(APIRoute.Logout);
      removeToken();
      removeUserEmail();
      removeUserAvatarUrl();
      store.dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandler(error);
    }
  }
);

export const checkAuthStatusAction = createAsyncThunk(
  'cities/checkAuthStatusAction',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      store.dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const redirectToRoute = createAction('redirectToRoute', (value) => ({payload: value}));

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
      state.favoriteRooms = action.payload;},
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;},
    // setUserAvatarUrl: (state, action: PayloadAction<string>) => {
    //   state.userAvatarUrl = action.payload;},
    // setUserEmail: (state, action: PayloadAction<string>) => {
    //   state.userEmail = action.payload;}
  }
});

export const { changeCity, loadListRooms, loadFavoriteRooms,
  setAuthorizationStatus } = citiesSlice.actions;
export default citiesSlice.reducer;
