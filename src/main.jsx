import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ClientPage from "./ClientPage.jsx";
import LandingPage from "./LandingPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/client" element={<ClientPage />} />
        <Route path="/app" element={<App />} />
        {/* fallback route */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
