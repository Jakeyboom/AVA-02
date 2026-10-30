import React from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents, Marker, Popup } from 'react-leaflet'



let storedCoordinates = [];
//Note: An implementation of the GPS component will be changed over to Leaflet in the future.  Current implementation is just a placeholder
function GPSMap({ dataSets }) {
  const [gpsCoordinates, setGpsCoordinates] = useState([40.2488, -111.6495]); // Placeholder coordinates (HBLL)
  const [storedCoordinates, setStoredCoordinates] = useState([]);
  useEffect(() => {
    if (dataSets != null && dataSets.length > 0) {
      console.log("GPSMap dataSets:", dataSets);

      //Now, lets push all the coordinates from the dataSets into the storedCoordinates array.
      const newCoordinates = dataSets?.flatMap((dataSet) => {
        if (dataSet?.data != null && dataSet.data.length > 0) {
          return dataSet.data.map((item) => [item.value.lat, item.value.long, item.timestamp]);
        }
        return [];
      });
      if (newCoordinates != null && newCoordinates.length > 0) {
        setStoredCoordinates(newCoordinates);
      }
    }
  }, [dataSets]);

  useEffect(() => {

  }, [dataSets]);

  

  return (
    <MapContainer center={gpsCoordinates} zoom={18} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }} maxZoom={24}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxNativeZoom={19}
        maxZoom={24}
      />
      <MapComponent storedCoordinates={storedCoordinates} />

    </MapContainer>

  );
}

function MapComponent({ storedCoordinates }) {
  const lines = L.layerGroup();

  const map = useMap();
  useEffect(() => {

    //Here, I will draw the polyline on the map.
    if (storedCoordinates != null && storedCoordinates.length > 1) {
      console.log("Drawing a polyline on the map with stored coordinates:", storedCoordinates);

      // Draw lines between each pair of coordinates in storedCoordinates
      let prevCoordPair = null;
      let prevTimestamp = null;
      for (let coordPair of storedCoordinates) {

        if (prevCoordPair != null) {
          // Draw a line from the previous coordinate to the current one
          const pair1 = [prevCoordPair[0], prevCoordPair[1]];
          const pair2 = [coordPair[0], coordPair[1]];
          const line = L.polyline([pair1, pair2], { color: 'blue', weight: 5 }).addTo(map);
          // Add metadata to the line for the popup (TODO: Add speed information if available).
          // Now, we will interpolate estimated speed values using the timestamps and distance travelled.
          line.metadata = {
            start: pair1,
            end: pair2,
            speed: "N/A",
            timestamp: coordPair[2]
          };

          if (prevTimestamp) {
            const timeDiff = (coordPair[2] - prevTimestamp) / 1000;
            const distance = map.distance(pair1, pair2);
            const speed = distance / timeDiff;
            line.metadata.speed = speed;
          }



          line.bindPopup(`This is a polyline drawn from the stored coordinates: ${line.metadata.start} to ${line.metadata.end} at ${line.metadata.timestamp} going ${line.metadata.speed} m/s OR ${line.metadata.speed * 3600 / 1609.34} mph`).addTo(lines);
        }
        prevCoordPair = coordPair;
        prevTimestamp = coordPair[2];

      }
      map.addLayer(lines);
    }
  }, [map, storedCoordinates]);

  let clickCoordinates = null;
  const mapEvents = useMapEvents({
    click: (e) => {
      clickCoordinates = [e.latlng.lat, e.latlng.lng];
      console.log("Map clicked at:", clickCoordinates);
    },

  });
  if (map != null) {
    console.log("MapComponent rendered");

  }

}

function drawPolyLines(map, storedCoordinates) {
  if (map != null && storedCoordinates != null && storedCoordinates.length > 1) {
    return L.polyline(storedCoordinates, { color: 'blue', weight: '5' }).addTo(map);
  }
}


//testestest this is test programming oh man this monitor looks really good.  I am so happy with this monit

export default GPSMap;