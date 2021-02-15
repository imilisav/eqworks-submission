// imports
import React, { useState, useEffect } from 'react';
import { MapContainer , Marker, TileLayer, Tooltip } from "react-leaflet";

// custom components
import StatsScreen from './components/StatsScreen';
import Loading from './components/Loading';

// css imports
import './App.css';

export default function App() {
  // state for showing/hiding the sliding window with an overview for POI
  const [visibleClass, setVisibleClass] = useState("hidden");

  // state to handle the loading spinner when app initializes
  const [isLoading, setIsLoading] = useState(true);

  // state for setting the POI that user clicked on map
  const [selectedPoi, setselectedPoi] = useState({});

  // state storing all POI info on all POIs on map
  const [pois, setPois] = useState([]);
  useEffect(() => {
    fetch("https://eqworks-milisav-api-submission.glitch.me/poi")
      .then(response => response.json())
      .then(response => {
        setPois(response);
        setIsLoading(false);
      })
  }, []);

  // callback to close the sliding window to reveal map again
  function onBackClick() { setVisibleClass("hidden"); }

  return (
      isLoading ? <Loading/> :
        <div>

          <StatsScreen 
            visibleClass={visibleClass} 
            closeCallback={onBackClick}
            poi={selectedPoi}
          />

          <MapContainer 
            className="MapContainer" 
            center={[43.6708, -79.3899]} 
            zoom={12} 
            zoomControl={false}
          >

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            { pois.map(poi =>
                <Marker 
                  position={[poi.lat, poi.lon]} 
                  key={poi.poi_id}
                  eventHandlers={{
                    click: () => {
                      setselectedPoi(poi);
                      setVisibleClass("visible");
                    },
                  }}
                >
                  <Tooltip permanent>{poi.name}</Tooltip>

                </Marker>
              )
            }

          </MapContainer>

        </div>
  );
}