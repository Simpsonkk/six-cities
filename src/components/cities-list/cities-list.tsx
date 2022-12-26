import { CITIES } from '../../consts';
import { useAppSelector } from '../../hooks';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/slices/cities/cities';
import { getCity } from '../../store/slices/cities/selector';

function CitiesList(): JSX.Element {
  const currentCity = useAppSelector(getCity);
  const dispatch = useAppDispatch();

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => (
          <li key={city} className="locations__item">
            <a
              onClick={() => {
                dispatch(changeCity(city));
              }}
              className={`locations__item-link tabs__item ${
                currentCity === city ? 'tabs__item--active' : ''
              }`}
              href="#"
            >
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CitiesList;
