import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "./MapPage.css"; // Make sure to import CSS

export default function MapPage() {
  const [position, setPosition] = useState(null);
  const [tileType, setTileType] = useState("normal");
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      (err) => {
        alert("Location access denied or unavailable.");
        console.error(err);
      }
    );
  }, []);

  const handleEnter = () => {
    if (position) {
      navigate("/coordinates", { state: { coords: position } });
    }
  };

  const toggleMapView = () => {
    setTileType((prev) => (prev === "normal" ? "satellite" : "normal"));
  };

  const getTileLayer = () => {
    if (tileType === "satellite") {
      return (
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='© Esri, Earth View'
        />
      );
    }
    return (
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
    );
  };

  return (
    <div style={{
      padding: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#111",
      color: "#fff"
    }}>
      <h2>Your Location</h2>

      {position ? (
        <MapContainer
          center={position}
          zoom={13}
          style={{
            height: "400px",
            width: "80%",
            borderRadius: "10px",
            marginBottom: "20px"
          }}
        >
          {getTileLayer()}
          <Marker
            position={position}
            icon={L.icon({
              iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
              iconSize: [32, 32],
            })}
          >
            <Popup>You are here 📍</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Detecting your location...</p>
      )}

      <button onClick={handleEnter} className="btn">
        Show Coordinates
      </button>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <label className="switch">
          <input
            type="checkbox"
            onChange={toggleMapView}
            checked={tileType === "satellite"}
          />
          <span className="slider round"></span>
        </label>
        <p style={{ marginTop: "10px" }}>
          {tileType === "satellite" ? "Earth View 🌍" : "Map View 🗺️"}
        </p>
      </div>
    </div>
  );
}
