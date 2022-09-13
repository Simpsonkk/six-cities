import { configureStore } from '@reduxjs/toolkit';
import citiesSlice from './citiesSlice';
import { createAPI } from './../services/api';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    cities: citiesSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
});
