import { AppDispatch } from './../types/state.model';
import { AxiosInstance } from 'axios';
import { FavoriteRoom } from './../types/favorite-status.model';
import { Review, NewReview } from './../types/reviews.model';
import { RoomDescription } from './../types/room-card.model';
import { errorHandler } from './../services/error-hadler';
import {
  saveUserAvatarUrl,
  removeUserAvatarUrl,
} from './../services/user-avatar-url';
import { saveUserEmail, removeUserEmail } from './../services/user-email';
import { saveToken, removeToken } from './../services/token';
import { UserData } from './../types/user-data.model';
import { AuthData } from '../types/auth-data.model';
import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { AppRoute, APIRoute, AuthorizationStatus } from '../const';
import { InitialState } from '../types/state.model';
import { updateRoomsArray } from '../util';

const initialCity = 'Amsterdam';

const initialState: InitialState = {
  currrentCity: initialCity,
  roomList: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  favoriteRooms: [],
  currentRoom: null,
  nearbyRooms: [],
  reviews: [],
};

export const setListRoomAction = createAsyncThunk<
  void,
  undefined,
  {
    extra: {
      api: AxiosInstance;
    };
    dispatch: AppDispatch;
  }
>('setListRoom', async (_, { extra, dispatch }) => {
  const { api } = extra;
  try {
    const { data } = await api.get<RoomDescription[]>(APIRoute.ListRooms);
    dispatch(loadListRooms(data));
  } catch (error) {
    errorHandler(error);
  }
});

export const setFavoriteRoomsAction = createAsyncThunk<
  void,
  undefined,
  {
    extra: {
      api: AxiosInstance;
    };
    dispatch: AppDispatch;
  }
>('setFavoriteRooms', async (_, { extra, dispatch }) => {
  const { api } = extra;
  try {
    const { data } = await api.get<RoomDescription[]>(APIRoute.Favorite);
    dispatch(loadFavoriteRooms(data));
  } catch (error) {
    errorHandler(error);
  }
});

export const changeFavoriteRoomAction = createAsyncThunk<
  void,
  FavoriteRoom,
  {
    extra: {
      api: AxiosInstance;
    };
    dispatch: AppDispatch;
  }
>(
  'changeFavoriteRoom',
  async ({ roomId, newFavoriteStatus }, { extra, dispatch }) => {
    const { api } = extra;
    try {
      const { data } = await api.post<RoomDescription>(
        `${APIRoute.Favorite}/${roomId}/${newFavoriteStatus}`
      );
      dispatch(updateRooms(data));
      dispatch(loadCurrentRoom(data));
    } catch (error) {
      errorHandler(error);
    }
  }
);

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    extra: {
      api: AxiosInstance;
    };
    dispatch: AppDispatch;
  }
>('login', async ({ login: email, password }, { extra, dispatch }) => {
  const { api } = extra;
  try {
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });
    saveToken(data.token);
    dispatch(loadAuthorizationStatus(AuthorizationStatus.Auth));
    saveUserEmail(data.email);
    saveUserAvatarUrl(data.avatarUrl);
    dispatch(redirectToRoute(AppRoute.Main));
  } catch (error) {
    errorHandler(error);
    dispatch(loadAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    extra: {
      api: AxiosInstance;
    };
    dispatch: AppDispatch;
  }
>('logout', async (_, { extra, dispatch }) => {
  const { api } = extra;
  try {
    api.delete(APIRoute.Logout);
    removeToken();
    removeUserEmail();
    removeUserAvatarUrl();
    dispatch(loadAuthorizationStatus(AuthorizationStatus.NoAuth));
  } catch (error) {
    errorHandler(error);
  }
});

export const checkAuthStatusAction = createAsyncThunk<
  void,
  undefined,
  {
    extra: {
      api: AxiosInstance;
    };
    dispatch: AppDispatch;
  }
>('checkAuthStatus', async (_, { extra, dispatch }) => {
  const { api } = extra;
  try {
    await api.get(APIRoute.Login);
    dispatch(loadAuthorizationStatus(AuthorizationStatus.Auth));
  } catch {
    dispatch(loadAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
});

export const setCurrentRoomAction = createAsyncThunk<
  void,
  string | undefined,
  {
    extra: {
      api: AxiosInstance;
    };
    dispatch: AppDispatch;
  }
>('setCurrentRoom', async (roomId, { extra, dispatch }) => {
  const { api } = extra;
  try {
    const { data } = await api.get<RoomDescription>(
      `${APIRoute.ListRooms}/${roomId}`
    );
    dispatch(loadCurrentRoom(data));
  } catch (error) {
    dispatch(redirectToRoute(AppRoute.NotFound));
    errorHandler(error);
  }
});

export const setNearbyRoomsAction = createAsyncThunk<
  void,
  string | undefined,
  {
    extra: {
      api: AxiosInstance;
    };
    dispatch: AppDispatch;
  }
>('setNearbyRooms', async (roomId: string | undefined, { extra, dispatch }) => {
  const { api } = extra;
  try {
    const { data } = await api.get<RoomDescription[]>(
      `${APIRoute.ListRooms}/${roomId}${APIRoute.NearbyRooms}`
    );
    dispatch(loadNearbyRooms(data));
  } catch (error) {
    errorHandler(error);
  }
});

export const setReviewsAction = createAsyncThunk<
  void,
  string | undefined,
  {
    extra: {
      api: AxiosInstance;
    };
    dispatch: AppDispatch;
  }
>('setReviews', async (roomId: string | undefined, { extra, dispatch }) => {
  const { api } = extra;
  try {
    const { data } = await api.get<Review[]>(`${APIRoute.Reviews}/${roomId}`);
    dispatch(loadReviews(data));
  } catch (error) {
    errorHandler(error);
  }
});

export const addReviewAction = createAsyncThunk<
  void,
  NewReview,
  {
    extra: {
      api: AxiosInstance;
    };
    dispatch: AppDispatch;
  }
>('addReview', async ({ comment, rating, roomId }, { extra, dispatch }) => {
  const { api } = extra;
  try {
    const { data } = await api.post<Review[]>(`${APIRoute.Reviews}/${roomId}`, {
      comment,
      rating,
    });
    dispatch(loadReviews(data));
  } catch (error) {
    errorHandler(error);
  }
});

export const redirectToRoute = createAction('redirectToRoute', (value) => ({
  payload: value,
}));

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.currrentCity = action.payload;
    },
    loadListRooms: (state, action: PayloadAction<RoomDescription[]>) => {
      state.roomList = action.payload;
      state.isDataLoaded = true;
    },
    loadFavoriteRooms: (state, action: PayloadAction<RoomDescription[]>) => {
      state.favoriteRooms = action.payload;
    },
    loadAuthorizationStatus: (
      state,
      action: PayloadAction<AuthorizationStatus>
    ) => {
      state.authorizationStatus = action.payload;
    },
    loadCurrentRoom: (state, action: PayloadAction<RoomDescription>) => {
      state.currentRoom = action.payload;
    },
    loadNearbyRooms: (state, action: PayloadAction<RoomDescription[]>) => {
      state.nearbyRooms = action.payload;
    },
    loadReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },
    updateRooms: (state, action: PayloadAction<RoomDescription>) => {
      const nearbyRoomIndex = state.nearbyRooms.findIndex(
        (room: RoomDescription) => room.id === action.payload.id
      );

      if (nearbyRoomIndex >= 0) {
        state.nearbyRooms = updateRoomsArray(
          state.nearbyRooms,
          action.payload,
          nearbyRoomIndex
        );
      }

      if (!action.payload.isFavorite) {
        state.favoriteRooms = state.favoriteRooms.filter(
          (room) => room.id !== action.payload.id
        );
      }

      const roomIndex = state.roomList.findIndex(
        (room: RoomDescription) => room.id === action.payload.id
      );
      state.roomList = updateRoomsArray(
        state.roomList,
        action.payload,
        roomIndex
      );
    },
  },
});

export const {
  changeCity,
  loadListRooms,
  loadFavoriteRooms,
  loadAuthorizationStatus,
  loadCurrentRoom,
  loadNearbyRooms,
  loadReviews,
  updateRooms,
} = citiesSlice.actions;
export default citiesSlice.reducer;
