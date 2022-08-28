import { useState } from 'react';
import { RoomsDescription } from '../../types/room-card.model';
import RoomCard from '../room-card/room-card';

type RoomListProps = {
  roomList: RoomsDescription
}

function RoomList({ roomList }: RoomListProps): JSX.Element {

  const [, setActiveCard] = useState(0);
  return (
    <>
      {roomList.map((roomCard) => (
        <RoomCard key={roomCard.roomCardId} roomCard={roomCard} activeCard={(id: number) => setActiveCard(id)}/>
      ))}
    </>
  );
}

export default RoomList;
