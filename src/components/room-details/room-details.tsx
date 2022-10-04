import { useParams } from 'react-router-dom';
import Header from '../header/header';
import { countPercentRating } from '../../util';
import { useAppDispatch, useAppSelector } from '../../hooks/useDispatch-useSelector';
import { useEffect } from 'react';
import {
  changeFavoriteRoomAction,
  setCurrentRoomAction,
  setNearbyRoomsAction,
  setReviewsAction,
} from '../../store/citiesSlice';
import NearPlacesList from '../near-places-list/near-places-list';
import Reviews from '../reviews/reviews';
import Map from '../map/map';
import { APIRoute, MapClasses } from '../../const';
import browserHistory from '../../browser-history';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { FavoriteRoom } from '../../types/favorite-status.model';

function RoomDetails(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();

  const { currentRoom, nearbyRooms, reviews, authorizationStatus } =
  useAppSelector((state) => state);

  useEffect(() => {
    dispatch(setCurrentRoomAction(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    dispatch(setNearbyRoomsAction(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    dispatch(setReviewsAction(params.id));
  }, [dispatch, params.id]);

  const changeFavoriteStatus = ({
    roomId,
    newFavoriteStatus,
  }: FavoriteRoom) => {
    dispatch(
      changeFavoriteRoomAction({
        roomId,
        newFavoriteStatus,
      })
    );
  };

  if (!currentRoom) {
    return <NotFoundScreen />;
  }

  const mapStyle = { width: '1000px', height: '500px', margin: '0 auto 50px' };

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {currentRoom.images.slice(0, 6).map((image) => (
                <div key={image} className="property__image-wrapper">
                  <img
                    className="property__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {currentRoom.isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">{currentRoom.title}</h1>
                <button
                  onClick={() =>
                    changeFavoriteStatus({
                      roomId: currentRoom.id,
                      newFavoriteStatus: Number(!currentRoom.isFavorite),
                    })}
                  className={`property__bookmark-button ${
                    currentRoom.isFavorite &&
                    'property__bookmark-button--active'
                  } button`}
                  type="button"
                >
                  <svg
                    className="property__bookmark-icon"
                    width="31"
                    height="33"
                  >
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span
                    style={{
                      width: `${countPercentRating(currentRoom.rating)}%`,
                    }}
                  >
                  </span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                  {currentRoom.rating}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {currentRoom.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {currentRoom.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {currentRoom.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">
                  &euro;{currentRoom.price}
                </b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {currentRoom.goods.map((service) => (
                    <li className="property__inside-item" key={service}>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={currentRoom.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {currentRoom.host.name}
                  </span>
                  {currentRoom.host.isPro && (
                    <span className="property__user-status">Pro</span>
                  )}
                </div>
                <div className="property__description">
                  <p className="property__text">{currentRoom.description}</p>
                </div>
              </div>
              <Reviews
                reviews={reviews}
                authorizationStatus={authorizationStatus}
              />
            </div>
          </div>
          <Map
            activePointId={currentRoom.id}
            mapClassName={MapClasses.MainPage}
            roomList={nearbyRooms}
            selectedCity={currentRoom.city.location}
            onMarkerClick={(roomId) =>
              browserHistory.push(`${APIRoute.Offer}/${roomId}`)}
            mapStyle={mapStyle}
          />
        </section>
        <NearPlacesList nearbyRooms={nearbyRooms} />
      </main>
    </div>
  );
}

export default RoomDetails;
