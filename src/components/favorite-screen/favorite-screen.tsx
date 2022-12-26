import Header from '../header/header';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import FavoriteCardList from '../favorite-card-list/favorite-card-list';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RoomDescription } from '../../types/room-card.model';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import { getFavoriteRooms } from '../../store/slices/room-data/selectors';
import { setFavoriteRoomsAction } from '../../store/actions/api-actions';

function FavoriteScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setFavoriteRoomsAction());
  }, [dispatch]);

  const favoriteRooms = useAppSelector(getFavoriteRooms);

  const uniqueCities = Array.from(
    new Set(favoriteRooms.map((room: RoomDescription) => room.city.name))
  );

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favoriteRooms.length > 0 ? (
                <FavoriteCardList
                  uniqueCities={uniqueCities}
                  favoriteRooms={favoriteRooms}
                />
              ) : (
                <FavoritesEmpty />
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
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
