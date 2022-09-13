import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainScreen from '../main-screen/main-screen';
import SignIn from '../sign-in/sign-in';
import NotFoundScreen from './../not-found-screen/not-found-screen';
import PrivatRoute from './../private-route/private-route';
// import { RoomsDescription } from '../../types/room-card.model';
import RoomDetails from './../room-details/room-details';
import { Reviews } from '../../types/reviews.model';
import FavoriteScreen from '../favorite-screen/favorite-screen';
import { useAppSelector } from '../../hooks/dispatch-selector';
import { CSSProperties, useEffect } from 'react';
import { SpinnerDotted } from 'spinners-react';
import { useAppDispatch } from './../../hooks/dispatch-selector';
import { fetchRoomsAction } from './../../store/citiesSlice';

type AppScreenProps = {
  reviews: Reviews;
};

function App({ reviews }: AppScreenProps): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(()=> {
    dispatch(fetchRoomsAction());
  }, [dispatch]);


  const isDataLoaded = useAppSelector((state) => state.cities.isDataLoaded);
  if (!isDataLoaded) {
    const spinnerStyles: CSSProperties = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };

    return (
      <SpinnerDotted color='#4481c3' style={spinnerStyles} size={100}/>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen />} />
        <Route path={AppRoute.SignIn} element={<SignIn />} />
        <Route
          path={AppRoute.Room}
          element={<RoomDetails reviews={reviews} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivatRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoriteScreen />
            </PrivatRoute>
          }
        />
        <Route path="*" element={<NotFoundScreen />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
