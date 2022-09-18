import { RoomDescription } from '../../types/room-card.model';
import NearPlaceCard from '../near-place-card/near-place-card';


type NearPlacesListProps = {
  nearbyRooms: RoomDescription[]
}

function NearPlacesList({ nearbyRooms }: NearPlacesListProps): JSX.Element {
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {nearbyRooms.map((nearbyRoom) => (
            <NearPlaceCard key={nearbyRoom.id} nearbyRoom={nearbyRoom}/>
          ))}
        </div>
      </section>
    </div>
  );
}

export default NearPlacesList;
