import Header from '../header/header';
import CitiesList from './../cities-list/cities-list';
import PlacesContainer from '../places-container/places-container';

function MainScreen(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList />
        </div>
        <div className="cities">
          <PlacesContainer/>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
