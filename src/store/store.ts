import {configureStore} from '@reduxjs/toolkit';
import citiesSlice from './citiesSlice';

export const store = configureStore({
  reducer: {
    cities: citiesSlice
  },
});
