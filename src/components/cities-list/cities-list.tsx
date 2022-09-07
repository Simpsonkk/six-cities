import { CITIES } from '../../const';
import { useAppSelector } from '../../hooks/dispatch-selector';
import { changeCity } from '../../store/citiesSlice';
import { useAppDispatch } from './../../hooks/dispatch-selector';

function CitiesList(): JSX.Element {

  const currentCity = useAppSelector((state) => state.cities.city);
  const dispatch = useAppDispatch();

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => (
          <li key={city} className="locations__item">
            <a onClick={(e) => {
              e.preventDefault();
              dispatch(changeCity(city));
            }} className={
              `locations__item-link tabs__item ${currentCity === city ? 'tabs__item--active' : ''}`
            } href="#"
            >
              <span>{city}</span>
            </a>
          </li>
        ))}

        {/* <li className="locations__item">
          <a className="locations__item-link tabs__item" href="#">
            <span>Cologne</span>
          </a>
        </li>
        <li className="locations__item">
          <a className="locations__item-link tabs__item" href="#">
            <span>Brussels</span>
          </a>
        </li>
        <li className="locations__item">
          <a className="locations__item-link tabs__item ">
            <span>Amsterdam</span>
          </a>
        </li>
        <li className="locations__item">
          <a className="locations__item-link tabs__item" href="#">
            <span>Hamburg</span>
          </a>
        </li>
        <li className="locations__item">
          <a className="locations__item-link tabs__item" href="#">
            <span>Dusseldorf</span>
          </a>
        </li> */}
      </ul>
    </section>
  );
}

export default CitiesList;
