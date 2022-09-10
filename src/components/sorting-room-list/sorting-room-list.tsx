import { SORTING_OPTIONS } from './../../const';
import { useState } from 'react';
// import { useAppSelector } from '../../hooks/dispatch-selector';
// import { RoomsDescription } from '../../types/room-card.model';
// import { useAppDispatch } from './../../hooks/dispatch-selector';
// import { fillListRooms } from '../../store/citiesSlice';
// import { fillListRooms } from '../../store/citiesSlice';
// import { RoomDescription, RoomsDescription } from '../../types/room-card.model';

type SortingRoomListProps = {
  currentSortingOption: string,
  onOptionChange: (option: string) => void;
}

function SortingRoomList({currentSortingOption, onOptionChange}: SortingRoomListProps): JSX.Element {

  const [sortOptionState, setSortOptionState] = useState(false);

  // const roomList = useAppSelector((state) => state.cities.rooms);
  // const dispatch = useAppDispatch();

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        onClick={() => setSortOptionState(!sortOptionState)}
        tabIndex={0}
      >
        {currentSortingOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          sortOptionState && 'places__options--opened'
        }`}
      >
        {SORTING_OPTIONS.map((sortOption) => (
          <li
            key={sortOption}
            className={`places__option ${
              currentSortingOption === sortOption
                ? 'places__option--active'
                : ''
            }`}
            onClick={() => {
              onOptionChange(sortOption);
              setSortOptionState(!sortOptionState);
              onOptionChange(sortOption);
            }}
            tabIndex={0}
          >
            {sortOption}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingRoomList;
