import { RoomDataState } from './../../../types/state.model';
import { NameSpace } from '../../../consts';
import { Review } from '../../../types/reviews.model';
import { RoomDescription } from '../../../types/room-card.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateRoomsArray } from '../../../util';

const initialState: RoomDataState = {
  roomList: [],
  isDataLoaded: false,
  favoriteRooms: [],
  currentRoom: null,
  nearbyRooms: [],
  reviews: [],
};

export const roomData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadListRooms: (state, action: PayloadAction<RoomDescription[]>) => {
      state.roomList = action.payload;
      state.isDataLoaded = true;
    },
    loadFavoriteRooms: (state, action: PayloadAction<RoomDescription[]>) => {
      state.favoriteRooms = action.payload;
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
  loadListRooms,
  loadFavoriteRooms,
  loadCurrentRoom,
  loadNearbyRooms,
  loadReviews,
  updateRooms,
} = roomData.actions;
