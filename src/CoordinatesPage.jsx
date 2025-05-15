import React from "react";
import { useLocation } from "react-router-dom";

export default function CoordinatesPage() {
  const location = useLocation();
  const coords = location.state?.coords;

  if (!coords) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <p>No coordinates provided. Please go back.</p>
      </div>
    );
  }

  return (
    <div style={{
      padding: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#111"
    }}>
      <h2>Your GPS Coordinates</h2>
      <p>📍 Latitude: {coords[0]}</p>
      <p>📍 Longitude: {coords[1]}</p>
    </div>
  );
}
