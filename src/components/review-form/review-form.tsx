import React, { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { REVIEW_TITLES } from '../../const';
import { useAppDispatch } from '../../hooks/dispatch-selector';
import { addReviewAction } from '../../store/citiesSlice';

function ReviewForm(): JSX.Element {

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const params = useParams();

  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(addReviewAction({
      comment,
      rating,
      roomId: params.id
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {REVIEW_TITLES.map((title, i) => (
          <React.Fragment key={title}>
            <input className="form__rating-input visually-hidden" name="rating"
              checked={rating === i + 1} value={i + 1} id={`${i + 1}-stars`} type="radio"
              onChange={({target}) => {
                setRating(+target.value);
              }}
            />
            <label htmlFor={`${i + 1}-stars`} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        )).reverse()}
      </div>
      <textarea onChange={({target}) => setComment(target.value)} className="reviews__textarea form__textarea" value={comment} id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
