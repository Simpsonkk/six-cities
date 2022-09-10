import { useEffect, useRef } from 'react';
import leaflet, { LayerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import classNames from 'classnames';
import { Location, Point } from '../../types/room-card.model';
import { UrlMarker } from '../../const';

type MapProps = {
  containerClassName: 'cities__map' | 'property__map',
  points: Point[],
  activePointId: number,
  selectedCity: Location,
  onMarkerClick: (id: number) => void
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

function Map({ containerClassName, selectedCity, activePointId, points, onMarkerClick }: MapProps): JSX.Element {

  // const roomList = useAppSelector((state) => state.cities.rooms);

  // // const selectedCity = roomList[0].city.location;
  // // console.log(selectedCity);

  // const points = roomList.map((room) => ({
  //   latitude: room.location.latitude,
  //   longitude: room.location.longitude,
  //   id: room.id,
  // }));
  // console.log(points);

  const mapRef = useRef(null);
  const map = useMap(mapRef, selectedCity);
  const mapClassName = classNames({
    [containerClassName]: true,
    'map': true,
  });

  useEffect(() => {
    if (map) {
      const markers: Marker[] = [];

      markersGroup?.clearLayers();

      points.forEach((location, i) => {
        markers.push(new Marker({
          lat: location.latitude,
          lng: location.longitude,
        }).on('click', () => onMarkerClick(location.id)));

        markers[i].setIcon(location.id === activePointId ? currentCustomIcon : defaultCustomIcon);
        markersGroup.addLayer(markers[i]);
      });

      markersGroup.addTo(map);

    }
    // return () => {
    //   markersGroup.remove();
    // };
  }, [map, points, activePointId, onMarkerClick]);

  return <section className={mapClassName} style={{height: '100%'}} ref={mapRef}></section>;
}

export default Map;
