import { RoomDescription } from '../../types/room-card.model';
import { Reviews } from '../../types/reviews.model';
import { countPercentRating } from './../../util';
import ReviewForm from './../review-form/review-form';

type ReviewsProps = {
  room: RoomDescription,
  reviews: Reviews
}

function Review({ room, reviews}: ReviewsProps): JSX.Element {
  const review = reviews.find((currentReview) => currentReview.cardId === (room && room.roomCardId));

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
      <ul className="reviews__list">
        {(review && review.cardId) === (room && room.roomCardId) ? (
          <li className="reviews__item">
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar"/>
              </div>
              <span className="reviews__user-name">
                {review && review.name}
              </span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{ width: `${countPercentRating(review && review.raiting)}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">
                {review && review.comment}
              </p>
              <time className="reviews__time" dateTime="2019-04-24">{review && review.data}</time>
            </div>
          </li>) : ''}
      </ul>
      <ReviewForm/>
    </section>
  );
}

export default Review;
