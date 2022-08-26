import { RoomDescription } from '../../types/room-card.model';
import { countPercentRating } from './../../util';

type RoomCardProps = {
  roomCard: RoomDescription,
  activeCard: (id: number) => void;
};

function RoomCard({ roomCard, activeCard }: RoomCardProps): JSX.Element {


  return (
    <article onMouseOver={() => activeCard(roomCard.roomCardId)} className="cities__place-card place-card">
      {roomCard.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={roomCard.img}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{roomCard.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
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
            <span style={{ width: `${countPercentRating(roomCard.raiting)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">Beautiful &amp;{roomCard.description}</a>
        </h2>
        <p className="place-card__type">{roomCard.type}</p>
      </div>
    </article>
  );
}

export default RoomCard;
