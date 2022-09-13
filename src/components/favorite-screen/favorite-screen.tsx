// import { RoomDescription, RoomsDescription } from '../../types/room-card.model';
import Header from '../header/header';
// import FavoriteCities from './../favorite-cities/favorite-cities';
// import FavoriteRoomCard from './../favorite-room-card/favorite-room-card';
import { Link } from 'react-router-dom';

// type FavoriteScreenProps = {
//   // roomList: RoomsDescription
// }

function FavoriteScreen(): JSX.Element {
  // const favoriteRooms: RoomsDescription = roomList.filter((room: RoomDescription) =>
  //   room.isFavorite
  // );
  // const uniqueCities = Array.from(
  //   new Set(favoriteRooms.map((room: RoomDescription) => room.city.name))
  // );

  // function getFavoriteRooms(): any { // исправить тип функции, когда доделаешь тело ф
  //   return uniqueCities.map((city) => (
  //     <FavoriteCities key={city} city={city}>
  //       <>
  //         {favoriteRooms.filter((favoriteRoom: RoomDescription) => (
  //           favoriteRoom.city.name === city)).map((favoriteRoom: RoomDescription) => (
  //           <FavoriteRoomCard key={favoriteRoom.id} favoriteRoom={favoriteRoom}/>
  //         ))}
  //       </>
  //     </FavoriteCities>
  //   ));
  // }

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={'/'}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoriteScreen;
