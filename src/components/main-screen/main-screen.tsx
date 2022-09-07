import RoomList from './../room-list/room-list';
import { RoomsDescription } from '../../types/room-card.model';
import Header from '../header/header';
import { useState } from 'react';
import browserHistory from '../../browser-history';
import Map from '../map/map';
import CitiesList from './../cities-list/cities-list';

type MainScreenProps = {
  roomList: RoomsDescription,
};

function MainScreen({ roomList }: MainScreenProps): JSX.Element {
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [currentCity] = useState(roomList[0].city);
  const points = roomList.map((room) => ({
    latitude: room.location.latitude,
    longitude: room.location.longitude,
    id: room.id,
  }));

  const handlePlaceHover = (id: number) => setSelectedRoom(id);

  const handlePlaceLeave = () => setSelectedRoom(0);


  //   const listItemHoverHandler = (event: MouseEvent<HTMLLIElement>) => {
  //   event.preventDefault();
  //   onListItemHover(event.currentTarget.key);
  // }

  // const handleActiveOfferChoose = (id: number | null) => setSelectedRoom(id);

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList/>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                5 places to stay in Amsterdam
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <RoomList roomList={roomList} onPlaceHover={handlePlaceHover} onPlaceLeave={handlePlaceLeave}/>
              </div>
            </section>
            <div className="cities__right-section">
              <Map containerClassName='cities__map'
                points={points}
                activePointId={selectedRoom}
                center={currentCity.location}
                onMarkerClick={(roomId) => browserHistory.push(`/offer/${roomId}`)}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
