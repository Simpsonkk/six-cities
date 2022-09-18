import RoomList from './../room-list/room-list';
import Header from '../header/header';
import { useState } from 'react';
import browserHistory from '../../browser-history';
import Map from '../map/map';
import CitiesList from './../cities-list/cities-list';
import { useAppSelector } from '../../hooks/dispatch-selector';
import SortingRoomList from './../sorting-room-list/sorting-room-list';
import { filterRoomList } from '../../util';
import { Point } from '../../types/room-card.model';

function MainScreen(): JSX.Element {
  const [selectedRoom, setSelectedRoom] = useState(0);

  const { currrentCity, roomList } = useAppSelector((state) => state);

  const filteredRoomList = filterRoomList(currrentCity, roomList);

  const selectedCityLocation = filteredRoomList[0].city.location;

  const [currentSortingOption, setCurrentSortingOption] = useState('Popular');

  const handleSortingOptionChoose = (option: string) =>
    setCurrentSortingOption(option);

  const points = filteredRoomList.map((room: Point) => ({
    latitude: room.location.latitude,
    longitude: room.location.longitude,
    id: room.id,
  }));

  const handlePlaceHover = (id: number) => setSelectedRoom(id);

  const handlePlaceLeave = () => setSelectedRoom(0);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {filteredRoomList.length} places to stay in {currrentCity}
              </b>
              <SortingRoomList
                currentSortingOption={currentSortingOption}
                onOptionChange={handleSortingOptionChoose}
              />
              <div className="cities__places-list places__list tabs__content">
                <RoomList
                  filteredRoomList={filteredRoomList}
                  onPlaceHover={handlePlaceHover}
                  onPlaceLeave={handlePlaceLeave}
                  currentSortingOption={currentSortingOption}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <Map
                containerClassName="cities__map"
                activePointId={selectedRoom}
                selectedCity={selectedCityLocation}
                points={points}
                onMarkerClick={(roomId) =>
                  browserHistory.push(`/offer/${roomId}`)}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
