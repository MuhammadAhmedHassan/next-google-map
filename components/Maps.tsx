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
  const [directions, setDirections] = useState<DirectionsResult>();
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
  const houses = useMemo(() => generateHouses(center), [office]);

  const fetchDirections = (house: LatLngLiteral) => {
    if (!office) return;
    const service = new google.maps.DirectionsService();
    // Route from selected home to office via "DRIVING"
    service.route(
      {
        origin: house,
        destination: office,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result);
        }
      }
    );
  };

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
        {!office && <p>Enter the address of your office.</p>}
        {!!directions && (
          <Distance
            leg={
              directions.routes[0]
                .legs[0] /* There can be multiple routes to the same destination so we're selecting first route and first leg out of that. */
            }
          />
        )}
      </div>
      <div className='map'>
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName='map-container'
          options={options}
          onLoad={onLoad}
        >
          {!!directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 5,
                  strokeColor: '#1976D2',
                  strokeWeight: 5,
                },
              }}
            />
          )}
          {!!office && (
            <>
              <Marker
                position={office}
                icon='https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
              />

              {/* Marker Clusters */}
              <MarkerClusterer>
                {/* Display houses */}
                {(cluster) =>
                  houses.map((house) => (
                    <Marker
                      key={`${house.lat}-${house.lng}`}
                      position={house}
                      clusterer={cluster}
                      onClick={() => {
                        fetchDirections(house);
                      }}
                    />
                  ))
                }
              </MarkerClusterer>

              {/* Display circles */}
              <Circle
                center={office}
                radius={
                  15000 /* radius is in meter, so 15 is 15 meters and 15000 is 15km */
                }
                options={closeOptions}
              />
              <Circle center={office} radius={30000} options={middleOptions} />
              <Circle center={office} radius={45000} options={farOptions} />
            </>
          )}
        </GoogleMap>
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

const middleOptions = {
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

// It generates houses based on the center -- dummy function
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
