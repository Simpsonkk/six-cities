import { useCallback, useState } from 'react';
import browserHistory from '../../browser-history';
import { APIRoute, MapClasses } from '../../const';
import { useAppSelector } from '../../hooks/useDispatch-useSelector';
import { filterRoomList } from '../../util';
import Map from '../map/map';
import RoomList from '../room-list/room-list';
import SortingRoomList from '../sorting-room-list/sorting-room-list';


function PlacesContainer(): JSX.Element {

  const [selectedRoom, setSelectedRoom] = useState(0);

  const { currrentCity, roomList } = useAppSelector((state) => state);

  const filteredRoomList = filterRoomList(currrentCity, roomList);

  const selectedCityLocation = filteredRoomList[0].city.location;

  const [currentSortingOption, setCurrentSortingOption] = useState('Popular');

  const handleSortingOptionChoose = useCallback((option: string) =>
    setCurrentSortingOption(option), []);

  const handlePlaceHover = useCallback((id: number) => setSelectedRoom(id), []);

  const handlePlaceLeave = useCallback(() => setSelectedRoom(0), []);


  return (
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
          mapClassName={MapClasses.PropertyPage}
          activePointId={selectedRoom}
          selectedCity={selectedCityLocation}
          roomList={filteredRoomList}
          onMarkerClick={(roomId) =>
            browserHistory.push(`${APIRoute.Offer}/${roomId}`)}
        />
      </div>
    </div>
  );
}

export default PlacesContainer;
