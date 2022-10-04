import { RoomDescription } from '../../types/room-card.model';
import FavoriteCities from '../favorite-cities/favorite-cities';
import FavoriteRoomCard from '../favorite-room-card/favorite-room-card';

type FavoriteCardListProps = {
  uniqueCities: string[],
  favoriteRooms: RoomDescription[]
}

function FavoriteCardList({ uniqueCities, favoriteRooms }: FavoriteCardListProps): JSX.Element {
  return (
    <>
      {uniqueCities.map((city) => (
        <FavoriteCities key={city} city={city}>
          <>
            {favoriteRooms.filter((favoriteRoom: RoomDescription) => (
              favoriteRoom.city.name === city)).map((favoriteRoom: RoomDescription) => (
              <FavoriteRoomCard key={favoriteRoom.id} favoriteRoom={favoriteRoom}/>
            ))}
          </>
        </FavoriteCities>
      ))}
    </>
  );
}

export default FavoriteCardList;
