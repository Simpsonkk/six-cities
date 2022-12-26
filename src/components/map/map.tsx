import { useEffect, useRef } from 'react';
import leaflet, { LayerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { Location, RoomDescription } from '../../types/room-card.model';
import { MapClasses, UrlMarker } from '../../consts';

type MapProps = {
  mapClassName: MapClasses;
  roomList: RoomDescription[];
  activePointId: number;
  selectedCity: Location;
  onMarkerClick: (id: number) => void;
  mapStyle?: { width: string; margin: string };
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: UrlMarker.Default,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: UrlMarker.Current,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const markersGroup: LayerGroup = leaflet.layerGroup([]);

function Map({
  mapClassName,
  selectedCity,
  activePointId,
  roomList,
  onMarkerClick,
  mapStyle,
}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, selectedCity);

  useEffect(() => {
    if (map) {
      const points = roomList.map((room) => ({
        latitude: room.location.latitude,
        longitude: room.location.longitude,
        id: room.id,
      }));

      const markers: Marker[] = [];

      markersGroup?.clearLayers();

      points.forEach((point, i) => {
        markers.push(
          new Marker({
            lat: point.latitude,
            lng: point.longitude,
          }).on('click', () => onMarkerClick(point.id))
        );

        markers[i].setIcon(
          point.id === activePointId ? currentCustomIcon : defaultCustomIcon
        );
        markersGroup.addLayer(markers[i]);
      });

      markersGroup.addTo(map);
    }
    return () => {
      markersGroup.remove();
    };
  }, [map, roomList, activePointId, onMarkerClick]);

  return (
    <section
      className={`${mapClassName} map`}
      style={mapStyle}
      ref={mapRef}
    ></section>
  );
}

export default Map;
