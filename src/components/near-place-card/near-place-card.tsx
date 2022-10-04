import { Link } from 'react-router-dom';
import { APIRoute } from '../../const';
import { useAppDispatch } from '../../hooks/useDispatch-useSelector';
import { changeFavoriteRoomAction } from '../../store/citiesSlice';
import { FavoriteRoom } from '../../types/favorite-status.model';
import { RoomDescription } from '../../types/room-card.model';
import { countPercentRating } from '../../util';

type NearPlaceCardProps = {
  nearbyRoom: RoomDescription;
};

function NearPlaceCard({ nearbyRoom }: NearPlaceCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const changeFavoriteStatus = ({roomId, newFavoriteStatus}: FavoriteRoom) => {
    dispatch(changeFavoriteRoomAction({
      roomId,
      newFavoriteStatus
    }));
  };

  return (
    <article className="near-places__card place-card">
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <Link to={`${APIRoute.Offer}/${nearbyRoom.id}`}>
          <img
            className="place-card__image"
            src={nearbyRoom.previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{nearbyRoom.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={() => changeFavoriteStatus({roomId: nearbyRoom.id, newFavoriteStatus: Number(!nearbyRoom.isFavorite)})}
            className={`place-card__bookmark-button ${
              nearbyRoom.isFavorite && 'place-card__bookmark-button--active'
            } button`}
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
              style={{ width: `${countPercentRating(nearbyRoom?.rating)}%` }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{nearbyRoom.title}</a>
        </h2>
        <p className="place-card__type">{nearbyRoom.type}</p>
      </div>
    </article>
  );
}

export default NearPlaceCard;
