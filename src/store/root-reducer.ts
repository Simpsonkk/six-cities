import { userProcess } from './slices/user-process/user-process';
import { cities } from './slices/cities/cities';
import { roomData } from './slices/room-data/room-data';
import { NameSpace } from '../consts';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  [NameSpace.Data]: roomData.reducer,
  [NameSpace.Cities]: cities.reducer,
  [NameSpace.User]: userProcess.reducer,
});
