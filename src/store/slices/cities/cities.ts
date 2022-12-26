import { CitiesState } from './../../../types/state.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, INITIAL_CITY } from './../../../consts';

const initialState: CitiesState = {
  currrentCity: INITIAL_CITY,
};

export const cities = createSlice({
  name: NameSpace.Cities,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.currrentCity = action.payload;
    },
  },
});

export const { changeCity } = cities.actions;
