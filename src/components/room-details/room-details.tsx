import { useParams } from 'react-router-dom';
import Header from '../header/header';
import { countPercentRating } from '../../util';
import { useAppDispatch, useAppSelector } from '../../hooks/dispatch-selector';
import { useEffect } from 'react';
import { setCurrentRoomAction, setNearbyRoomsAction, setReviewsAction } from '../../store/citiesSlice';
import NearPlacesList from '../near-places-list/near-places-list';
import Reviews from '../reviews/reviews';

function RoomDetails(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const {currentRoom, nearbyRooms, reviews, authorizationStatus} = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(setCurrentRoomAction(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    dispatch(setNearbyRoomsAction(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    dispatch(setReviewsAction(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {currentRoom?.images.map((image) => (
                <div key={image} className="property__image-wrapper">
                  <img className="property__image" src={image} alt="Photo studio"/>
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {currentRoom?.isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {currentRoom?.title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${countPercentRating(currentRoom?.rating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{currentRoom?.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {currentRoom?.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {currentRoom?.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {currentRoom?.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{currentRoom?.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {currentRoom?.goods.map((service) => (
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
                    <img className="property__avatar user__avatar" src={currentRoom?.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {currentRoom?.host.name}
                  </span>
                  {currentRoom?.host.isPro && (<span className="property__user-status">Pro</span>)}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {currentRoom?.description}
                  </p>
                </div>
              </div>
              <Reviews reviews={reviews} authorizationStatus={authorizationStatus}/>
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        <NearPlacesList nearbyRooms={nearbyRooms}/>
      </main>
    </div>
  );
}

export default RoomDetails;
