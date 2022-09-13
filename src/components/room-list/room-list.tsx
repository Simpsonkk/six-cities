import { RoomDescription, RoomsDescription } from '../../types/room-card.model';
import RoomCard from '../room-card/room-card';
import { selectSortingOption } from './../../util';

type RoomListProps = {
  filteredRoomList: RoomsDescription
  onPlaceHover: (id: number) => void,
  onPlaceLeave: () => void,
  currentSortingOption?: string
}

function RoomList({ filteredRoomList, onPlaceHover, onPlaceLeave, currentSortingOption }: RoomListProps): JSX.Element {

  const sortedRoomList = selectSortingOption(currentSortingOption, filteredRoomList);

  return (
    <>
      {sortedRoomList.map((roomCard: RoomDescription) => (
        <RoomCard key={roomCard.id} roomCard={roomCard} onPlaceHover={onPlaceHover} onPlaceLeave={onPlaceLeave}/>
      ))}
    </>
  );
}

export default RoomList;
