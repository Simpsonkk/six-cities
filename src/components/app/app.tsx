import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainScreen from '../main-screen/main-screen';
import SignIn from '../sign-in/sign-in';
import FavoriteRooms from '../favorite-rooms/favorite-rooms';
import RoomDescription from '../room-description/room-description';
import NotFoundScreen from './../not-found-screen/not-found-screen';
import PrivatRoute from './../private-route/private-route';

type AppScreenProps = {
  roomQuantity: number;
};

function App({ roomQuantity }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen roomQuantity={roomQuantity} />}
        />
        <Route path={AppRoute.SignIn} element={<SignIn />} />
        <Route path={AppRoute.Room} element={<RoomDescription />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivatRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoriteRooms />
            </PrivatRoute>
          }
        />
        <Route path="*" element={<NotFoundScreen />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
