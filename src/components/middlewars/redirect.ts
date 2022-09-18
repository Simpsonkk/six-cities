import { Middleware } from 'redux';
import citiesSlice from '../../store/citiesSlice';
import browserHistory from '../../browser-history';

type Reducer = ReturnType<typeof citiesSlice>;

export const redirect: Middleware<unknown, Reducer> =
(_store) => (next) => (action) => {
  if (action.type === 'redirectToRoute') {
    browserHistory.push(action.payload);
  }

  return next(action);
};
