import { UserData } from './../../types/user-data.model';
import { AuthData } from './../../types/auth-data.model';
import { FavoriteRoom } from './../../types/favorite-status.model';
import { errorHandler } from './../../services/error-hadler';
import { APIRoute, AppRoute, AuthorizationStatus } from './../../consts';
import { RoomDescription } from './../../types/room-card.model';
import { AppDispatch } from './../../types/state.model';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadCurrentRoom, loadFavoriteRooms, loadListRooms, loadNearbyRooms, loadReviews, updateRooms } from '../slices/room-data/room-data';
import { saveToken, removeToken } from '../../services/token';
import { saveUserAvatarUrl, removeUserAvatarUrl } from '../../services/user-avatar-url';
import { saveUserEmail, removeUserEmail } from '../../services/user-email';
import { Review, NewReview } from '../../types/reviews.model';
import { loadAuthorizationStatus } from '../slices/user-process/user-process';
import { redirectToRoute } from './action';

export const setListRoomAction = createAsyncThunk<
  void,
  undefined,
  {
    extra: {
      api: AxiosInstance;
    };
    dispatch: AppDispatch;
  }
>('roomData/setListRoom', async (_, { extra: {api}, dispatch }) => {
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
>('roomData/setFavoriteRooms', async (_, { extra: {api}, dispatch }) => {
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
  'roomData/changeFavoriteRoom',
  async ({ roomId, newFavoriteStatus }, { extra: {api}, dispatch }) => {
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
>('userProcess/login', async ({ login: email, password }, { extra: {api}, dispatch }) => {
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
>('userProcess/logout', async (_, { extra: {api}, dispatch }) => {
  try {
    await api.delete(APIRoute.Logout);
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
>('userProcess/checkAuthStatus', async (_, { extra: {api}, dispatch }) => {
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
>('roomData/setCurrentRoom', async (roomId, { extra: {api}, dispatch }) => {
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
>('roomData/setNearbyRooms', async (roomId: string | undefined, { extra: {api}, dispatch }) => {
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
>('roomData/setReviews', async (roomId: string | undefined, { extra: {api}, dispatch }) => {
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
>('roomData/addReview', async ({ comment, rating, roomId }, { extra: {api}, dispatch }) => {
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
