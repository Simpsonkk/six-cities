import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainScreen from '../main-screen/main-screen';
import SignIn from '../sign-in/sign-in';
import NotFoundScreen from './../not-found-screen/not-found-screen';
import PrivatRoute from './../private-route/private-route';
import RoomDetails from './../room-details/room-details';
import FavoriteScreen from '../favorite-screen/favorite-screen';
import { useAppSelector } from '../../hooks/dispatch-selector';
import { useEffect } from 'react';
import { useAppDispatch } from './../../hooks/dispatch-selector';
import { checkAuthStatusAction, setListRoomAction } from './../../store/citiesSlice';
import Loader from './../loader/loader';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import { ToastContainer } from 'react-toastify';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setListRoomAction());
  }, [dispatch]);

  useEffect(()=> {
    dispatch(checkAuthStatusAction());
  }, [dispatch]);


  const { isDataLoaded, authorizationStatus } = useAppSelector((state) => state);
  if (!isDataLoaded) {
    return <Loader />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <ToastContainer />
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen />} />
        <Route path={AppRoute.SignIn} element={<SignIn />} />
        <Route
          path={AppRoute.Room}
          element={<RoomDetails />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivatRoute authorizationStatus={authorizationStatus}>
              <FavoriteScreen />
            </PrivatRoute>
          }
        />
        <Route path='*' element={<NotFoundScreen />}></Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
