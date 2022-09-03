// import { MouseEvent } from 'react';
import { RoomsDescription } from '../../types/room-card.model';
import RoomCard from '../room-card/room-card';

type RoomListProps = {
  roomList: RoomsDescription
  onPlaceHover?: (id: number) => void,
  onPlaceLeave?: () => void,
}

function RoomList({ roomList, onPlaceHover, onPlaceLeave }: RoomListProps): JSX.Element {


  return (
    <>
      {roomList.map((roomCard) => (
        <RoomCard key={roomCard.id} roomCard={roomCard} onPlaceHover={onPlaceHover} onPlaceLeave={onPlaceLeave}/>
      ))}
    </>
  );
}

export default RoomList;
