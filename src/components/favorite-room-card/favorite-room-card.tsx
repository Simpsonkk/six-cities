import { RoomDescription } from '../../types/room-card.model';
import { countPercentRating } from './../../util';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { FavoriteRoom } from '../../types/favorite-status.model';
import { APIRoute } from '../../consts';
import { changeFavoriteRoomAction } from '../../store/actions/api-actions';

type FavoriteRoomCardProps = {
  favoriteRoom: RoomDescription;
};

function FavoriteRoomCard({
  favoriteRoom,
}: FavoriteRoomCardProps): JSX.Element {
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
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${APIRoute.Offer}/${favoriteRoom.id}`}>
          <img
            className="place-card__image"
            src={favoriteRoom.previewImage}
            width="150"
            height="110"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">
              &euro;{favoriteRoom.price}
            </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={() =>
              changeFavoriteStatus({
                roomId: favoriteRoom.id,
                newFavoriteStatus: Number(!favoriteRoom.isFavorite),
              })}
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{ width: `${countPercentRating(favoriteRoom.rating)}%` }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${APIRoute.Offer}/${favoriteRoom.id}`}>
            {favoriteRoom.title}
          </Link>
        </h2>
        <p className="place-card__type">{favoriteRoom.type}</p>
      </div>
    </article>
  );
}

export default FavoriteRoomCard;
