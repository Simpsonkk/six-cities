import { RoomDescription, RoomsDescription } from '../../types/room-card.model';
import Header from '../header/header';
import FavoriteCities from './../favorite-cities/favorite-cities';

type FavoriteScreenProps = {
  roomList: RoomsDescription
}

function FavoriteScreen({ roomList }: FavoriteScreenProps): JSX.Element {
  const favoriteRooms: RoomsDescription = roomList.filter((room: RoomDescription) =>
    room.isFavorite
  );
  const uniqueCities = Array.from(
    new Set(favoriteRooms.map((room: RoomDescription) => room.city))
  );

  function getFavoriteRooms(): any { // исправить тип функции, когда доделаешь тело ф
    return uniqueCities.map((city) => (
      <FavoriteCities key={city} city={city}>
        <>
          {favoriteRooms.filter((favoriteRoom: RoomDescription) => (
            favoriteRoom.city === city)).map((favoriteRoom: RoomDescription) => (
            <p key={favoriteRoom.roomCardId}>{favoriteRoom.description}</p>
          ))}
        </>
      </FavoriteCities>
    ));
  }

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {getFavoriteRooms()}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}

export default FavoriteScreen;
