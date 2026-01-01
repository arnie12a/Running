// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MadisonPage from "./pages/Madison";
import UltraPage from "./pages/Ultra50K";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/madison" element={<MadisonPage />} />
        <Route path="/ultra" element={<UltraPage />} />
      </Routes>
    </BrowserRouter>
  );
}
