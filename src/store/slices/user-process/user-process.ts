import { UserProcessState } from './../../../types/state.model';
import { NameSpace, AuthorizationStatus } from './../../../consts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserProcessState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    loadAuthorizationStatus: (
      state,
      action: PayloadAction<AuthorizationStatus>
    ) => {
      state.authorizationStatus = action.payload;
    },
  },
});

export const { loadAuthorizationStatus } = userProcess.actions;

