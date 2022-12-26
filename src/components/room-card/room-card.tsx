import { RoomDescription } from '../../types/room-card.model';
import { countPercentRating } from './../../util';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { FavoriteRoom } from '../../types/favorite-status.model';
import { APIRoute } from '../../consts';
import { memo } from 'react';
import { changeFavoriteRoomAction } from '../../store/actions/api-actions';

type RoomCardProps = {
  roomCard: RoomDescription;
  onPlaceHover: (id: number) => void;
  onPlaceLeave: () => void;
};

function RoomCard({
  roomCard,
  onPlaceHover,
  onPlaceLeave,
}: RoomCardProps): JSX.Element {
  const dispatch = useAppDispatch();

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
        <Link to={`${APIRoute.Offer}/${roomCard.id}`}>
          <img
            className="place-card__image"
            src={roomCard.previewImage}
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
            onClick={() => {
              changeFavoriteStatus({
                roomId: roomCard.id,
                newFavoriteStatus: Number(!roomCard.isFavorite),
              });
            }}
            className={`place-card__bookmark-button ${
              roomCard.isFavorite && 'place-card__bookmark-button--active'
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
            <span
              style={{ width: `${countPercentRating(roomCard.rating)}%` }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${APIRoute.Offer}/${roomCard.id}`}>{roomCard.title}</Link>
        </h2>
        <p className="place-card__type">{roomCard.type}</p>
      </div>
    </article>
  );
}

export default memo(RoomCard);
