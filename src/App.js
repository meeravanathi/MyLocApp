import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MapPage from "./MapPage";
import CoordinatesPage from "./CoordinatesPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/coordinates" element={<CoordinatesPage />} />
      </Routes>
    </Router>
  );
}
