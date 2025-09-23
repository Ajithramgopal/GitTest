import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MyMap = () => {
  const [mapData, setMapData] = useState({ latitude: "", longitude: "" });
  const [markerPosition, setMarkerPosition] = useState({
    lat: 12.9015125,
    lng: 80.1990302,
  });

  const handleChange = (key, value) => {
    setMapData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleShowLocation = (e) => {
    e.preventDefault();

    const lat = parseFloat(mapData.latitude);
    const lng = parseFloat(mapData.longitude);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDFyn3147PfeCuKuuV71Kza5QfhiurEF1w">
      <form onSubmit={handleShowLocation} style={{ marginBottom: "1rem" }}>
        <label htmlFor="lat">Latitude:</label>
        <input
          id="lat"
          type="number"
          step="any"
          value={mapData.latitude}
          onChange={(e) => handleChange("latitude", e.target.value)}
          placeholder="e.g. 12.9716"
        />
        <label htmlFor="lng">Longitude:</label>
        <input
          id="lng"
          type="number"
          step="any"
          value={mapData.longitude}
          onChange={(e) => handleChange("longitude", e.target.value)}
          placeholder="e.g. 77.5946"
        />
        <button type="submit">Show Location</button>
      </form>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={10}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MyMap;
