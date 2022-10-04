import {MutableRefObject, useEffect, useState} from 'react';
import {Map, TileLayer} from 'leaflet';
import leaflet from 'leaflet';
import { Location } from '../types/room-card.model';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  selectedCity: Location,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  useEffect(() => {
    const layer = new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});

    map?.flyTo([selectedCity.latitude, selectedCity.longitude]);

    if (mapRef.current !== null && map === null) {

      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: selectedCity.latitude,
          lng: selectedCity.longitude,
        },
        zoom: selectedCity.zoom,
      });

      instance.addLayer(layer);

      setMap(instance);
    }
  }, [mapRef, selectedCity, map]);

  return map;
}

export default useMap;
