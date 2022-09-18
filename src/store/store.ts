import { configureStore } from '@reduxjs/toolkit';
import citiesSlice from './citiesSlice';
import { createAPI } from './../services/api';
import { redirect } from './../components/middlewars/redirect';

export const api = createAPI();

export const store = configureStore({
  reducer: citiesSlice,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {api}
      }
    }).concat(redirect)
});
