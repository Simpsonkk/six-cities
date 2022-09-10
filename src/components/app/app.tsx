import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainScreen from '../main-screen/main-screen';
import SignIn from '../sign-in/sign-in';
import NotFoundScreen from './../not-found-screen/not-found-screen';
import PrivatRoute from './../private-route/private-route';
import {RoomsDescription} from '../../types/room-card.model';
import RoomDetails from './../room-details/room-details';
import { Reviews } from '../../types/reviews.model';
import FavoriteScreen from '../favorite-screen/favorite-screen';
import { useAppDispatch } from './../../hooks/dispatch-selector';
import { fillListRooms } from '../../store/citiesSlice';

type AppScreenProps = {
  roomList: RoomsDescription,
  reviews: Reviews
};


function App({ roomList, reviews }: AppScreenProps): JSX.Element {

  const dispatch = useAppDispatch();
  dispatch(fillListRooms(roomList));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen />}
        />
        <Route path={AppRoute.SignIn} element={<SignIn />} />
        <Route path={AppRoute.Room} element={<RoomDetails roomList={roomList} reviews={reviews}/>} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivatRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoriteScreen roomList={roomList} />
            </PrivatRoute>
          }
        />
        <Route path="*" element={<NotFoundScreen />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
