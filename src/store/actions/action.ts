import { createAction } from '@reduxjs/toolkit';

export const redirectToRoute = createAction('redirectToRoute', (value) => ({
  payload: value,
}));
