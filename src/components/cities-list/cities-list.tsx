import { CITIES } from '../../const';
import { useAppSelector } from '../../hooks/useDispatch-useSelector';
import { changeCity } from '../../store/citiesSlice';
import { useAppDispatch } from '../../hooks/useDispatch-useSelector';

function CitiesList(): JSX.Element {

  const currentCity = useAppSelector((state) => state.currrentCity);
  const dispatch = useAppDispatch();

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => (
          <li key={city} className="locations__item">
            <a onClick={() => {
              dispatch(changeCity(city));
            }} className={
              `locations__item-link tabs__item ${currentCity === city ? 'tabs__item--active' : ''}`
            } href="#"
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
