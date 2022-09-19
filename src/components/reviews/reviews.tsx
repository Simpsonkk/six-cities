import { AuthorizationStatus } from '../../const';
import { Review } from '../../types/reviews.model';
import ReviewForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/reviews-list';

type ReviewsProps = {
  reviews: Review[],
  authorizationStatus: AuthorizationStatus
}

function Reviews({ reviews, authorizationStatus }: ReviewsProps): JSX.Element {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      {reviews.length > 0 && <ReviewsList reviews={reviews} />}
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm />}
    </section>
  );
}

export default Reviews;
