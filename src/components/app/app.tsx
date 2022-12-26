import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { AppRoute } from '../../consts';
import MainScreen from '../main-screen/main-screen';
import SignIn from '../sign-in/sign-in';
import NotFoundScreen from './../not-found-screen/not-found-screen';
import PrivatRoute from './../private-route/private-route';
import RoomDetails from './../room-details/room-details';
import FavoriteScreen from '../favorite-screen/favorite-screen';
import { useAppSelector } from '../../hooks';
import { useAppDispatch } from '../../hooks';
import Loader from './../loader/loader';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import {
  checkAuthStatusAction,
  setListRoomAction,
} from '../../store/actions/api-actions';
import { getLoadedDataStatus } from '../../store/slices/room-data/selectors';
import { getAuthStatus } from '../../store/slices/user-process/selector';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setListRoomAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkAuthStatusAction());
  }, [dispatch]);

  const isDataLoaded = useAppSelector(getLoadedDataStatus);

  const authStatus = useAppSelector(getAuthStatus);

  if (!isDataLoaded) {
    return <Loader />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <ToastContainer />
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen />} />
        <Route path={AppRoute.SignIn} element={<SignIn />} />
        <Route path={AppRoute.Room} element={<RoomDetails />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivatRoute authStatus={authStatus}>
              <FavoriteScreen />
            </PrivatRoute>
          }
        />
        <Route path="*" element={<NotFoundScreen />}></Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
