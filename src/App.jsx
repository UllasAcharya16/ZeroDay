// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import ClientDashboard from "./ClientPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/client" element={<ClientDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
