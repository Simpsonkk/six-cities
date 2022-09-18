import { Review, NewReview } from './../types/reviews.model';
import { RoomDescription } from './../types/room-card.model';
import { errorHandler } from './../services/error-hadler';
import { saveUserAvatarUrl, removeUserAvatarUrl } from './../services/user-avatar-url';
import { saveUserEmail, removeUserEmail } from './../services/user-email';
import { saveToken, removeToken } from './../services/token';
import { UserData } from './../types/user-data.model';
import { AuthData } from '../types/auth-data.model';
import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppRoute, APIRoute, AuthorizationStatus } from '../const';
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
  currentRoom: null,
  nearbyRooms: [],
  reviews: []
};

export const setListRoomAction = createAsyncThunk(
  'setListRoom',
  async () => {
    const {data} = await api.get<RoomDescription[]>(APIRoute.ListRooms);
    store.dispatch(loadListRooms(data));
  }
);

export const setFavoriteRoomsAction = createAsyncThunk(
  'setFavoriteRooms',
  async () => {
    const {data} = await api.get<RoomDescription[]>(APIRoute.Favorite);
    store.dispatch(loadFavoriteRooms(data));
  },
);

export const loginAction = createAsyncThunk(
  'login',
  async ({login: email, password}: AuthData) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      store.dispatch(loadAuthorizationStatus(AuthorizationStatus.Auth));
      saveUserEmail(data.email);
      saveUserAvatarUrl(data.avatarUrl);
      store.dispatch(redirectToRoute(AppRoute.Main));
    } catch (error) {
      errorHandler(error);
      store.dispatch(loadAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  }
);

export const logoutAction = createAsyncThunk(
  'logout',
  async () => {
    try {
      api.delete(APIRoute.Logout);
      removeToken();
      removeUserEmail();
      removeUserAvatarUrl();
      store.dispatch(loadAuthorizationStatus(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandler(error);
    }
  }
);

export const checkAuthStatusAction = createAsyncThunk(
  'checkAuthStatus',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(loadAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      store.dispatch(loadAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const setCurrentRoomAction = createAsyncThunk(
  'setCurrentRoom',
  async (roomId: string | undefined) => {
    try {
      const {data} = await api.get<RoomDescription>(`${APIRoute.ListRooms}/${roomId}`);
      store.dispatch(loadCurrentRoom(data));
    } catch (error) {
      errorHandler(error);
    }
  }
);

export const setNearbyRoomsAction = createAsyncThunk(
  'setNearbyRooms',
  async (roomId: string | undefined) => {
    try {
      const {data} = await api.get<RoomDescription[]>
      (`${APIRoute.ListRooms}/${roomId}${APIRoute.NearbyRooms}`);
      store.dispatch(loadNearbyRooms(data));
    } catch (error) {
      errorHandler(error);
    }
  }
);

export const setReviewsAction = createAsyncThunk(
  'setReviews',
  async (roomId: string | undefined) => {
    try {
      const {data} = await api.get<Review[]>
      (`${APIRoute.Reviews}/${roomId}`);
      store.dispatch(loadReviews(data));
    } catch (error) {
      errorHandler(error);
    }
  }
);

export const addReviewAction = createAsyncThunk(
  'addReview',
  async ({comment, rating, roomId}: NewReview) => {
    try {
      const {data} = await api.post<Review[]>(`${APIRoute.Reviews}/${roomId}`, {comment, rating});
      store.dispatch(loadReviews(data));
    } catch (error) {
      errorHandler(error);
    }
  }
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
    loadAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;},
    // setUserAvatarUrl: (state, action: PayloadAction<string>) => {
    //   state.userAvatarUrl = action.payload;},
    // setUserEmail: (state, action: PayloadAction<string>) => {
    //   state.userEmail = action.payload;}
    loadCurrentRoom: (state, action: PayloadAction<RoomDescription>) => {
      state.currentRoom = action.payload;},
    loadNearbyRooms: (state, action: PayloadAction<RoomDescription[]>) => {
      state.nearbyRooms = action.payload;},
    loadReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;},
  }
});

export const { changeCity, loadListRooms, loadFavoriteRooms,
  loadAuthorizationStatus,loadCurrentRoom, loadNearbyRooms, loadReviews } = citiesSlice.actions;
export default citiesSlice.reducer;
