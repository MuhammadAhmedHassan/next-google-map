import React, { useState, useMemo, useCallback, useRef } from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from '@react-google-maps/api';
import Places from './Places';
import Distance from './Distance';

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

function Maps() {
  const [office, setOffice] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap | null>(null);
  const center = useMemo<LatLngLiteral>(() => ({ lat: 43, lng: -80 }), []);
  const options = useMemo<MapOptions>(
    () => ({
      mapId: 'f9a6edb3c1e9302f',
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  return (
    <div className='container'>
      <div className='controls'>
        <h1>Commute</h1>
        <Places
          setOffice={(position: LatLngLiteral) => {
            setOffice(position);
            // Move the map to this position
            mapRef.current?.panTo(position);
          }}
        />
      </div>
      <div className='map'>
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName='map-container'
          options={options}
          onLoad={onLoad}
        ></GoogleMap>
      </div>
    </div>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWidth: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};

const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: '#8BC34A',
  fillColor: '#8BC34A',
};

const middelOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: '#FBC02D',
  fillColor: '#FBC02D',
};

const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: '#FF5252',
  fillColor: '#FF5252',
};

const generateHouses = (position: LatLngLiteral) => {
  const houses: Array<LatLngLiteral> = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return houses;
};

export default Maps;
