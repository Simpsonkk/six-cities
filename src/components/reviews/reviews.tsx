import { Review } from '../../types/reviews.model';
import ReviewForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/reviews-list';

type ReviewsProp = {
  reviews: Review[]
}

function Reviews({ reviews }: ReviewsProp): JSX.Element {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ReviewsList reviews={reviews} />
      <ReviewForm />
    </section>
  );
}

export default Reviews;
