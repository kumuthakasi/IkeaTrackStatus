import React from "react";
import "./styles/Common.scss";
import { Route, Routes, HashRouter, Navigate } from "react-router-dom";
import OrderTracking from "./pages/Home/orderTracking";
import TrackStatus from "./pages/Home/trackStatus";

function App() {
  return (
    <div>
      <HashRouter basename="/">
        <Routes>
          <Route path="/" element={<Navigate to="orderTracking" replace />} />
          <Route exact path="/orderTracking" element={<OrderTracking />} />
          <Route exact path="/trackstatus" element={<TrackStatus />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
