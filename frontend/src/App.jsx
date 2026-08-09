import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/hero" element={<Hero />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
