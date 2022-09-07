// import { MouseEvent } from 'react';
import { useAppSelector } from '../../hooks/dispatch-selector';
import { RoomsDescription } from '../../types/room-card.model';
import { selectListRoom } from '../../util';
import RoomCard from '../room-card/room-card';

type RoomListProps = {
  roomList: RoomsDescription
  onPlaceHover: (id: number) => void,
  onPlaceLeave: () => void,
}

function RoomList({ roomList, onPlaceHover, onPlaceLeave }: RoomListProps): JSX.Element {

  const currentCity = useAppSelector((state) => state.cities.city);
  console.log(currentCity);

  const selectedListRoom = selectListRoom(currentCity);
  console.log(selectedListRoom);

  return (
    <>
      {selectedListRoom.map((roomCard) => (
        <RoomCard key={roomCard.id} roomCard={roomCard} onPlaceHover={onPlaceHover} onPlaceLeave={onPlaceLeave}/>
      ))}
    </>
  );
}

export default RoomList;
