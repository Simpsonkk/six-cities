import { RoomDescription } from '../../types/room-card.model';
import { countPercentRating } from './../../util';
import { Link } from 'react-router-dom';
// import { MouseEvent } from 'react';


type RoomCardProps = {
  roomCard: RoomDescription,
  onPlaceHover: (id: number) => void,
  onPlaceLeave: () => void,
};

function RoomCard({ roomCard, onPlaceHover, onPlaceLeave }: RoomCardProps): JSX.Element {
  // function getSelectedProductIds(): number[] {
  //   const roomIds = localStorage.getItem('roomIds');
  //   if (roomIds) {
  //     return JSON.parse(roomIds);
  //   }
  //   return [];
  // }

  // function setSelectedRoomIds(roomId: number): void {
  //   const roomIds = getSelectedProductIds();
  //   roomIds.push(roomId);
  //   localStorage.setItem('roomIds', JSON.stringify(roomIds));
  // }

  return (
    <article
      onMouseEnter={() => onPlaceHover(roomCard.id)}
      onMouseLeave={() => onPlaceLeave()}
      className="cities__place-card place-card"
    >
      {roomCard.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${roomCard.id}`}>
          <img
            className="place-card__image"
            src={roomCard.images[0]}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{roomCard.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            // onClick={() => setSelectedRoomIds(roomCard.roomCardId)}
            className={`place-card__bookmark-button ${
              roomCard.isFavorite ? 'place-card__bookmark-button--active' : ''
            }  button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${countPercentRating(roomCard.rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${roomCard.id}`}>{roomCard.title}</Link>
        </h2>
        <p className="place-card__type">{roomCard.type}</p>
      </div>
    </article>
  );
}

export default RoomCard;
