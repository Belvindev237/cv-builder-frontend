import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import "./components/Navbar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Builder from "./pages/Builder";
import Auth from "./pages/AuthPage";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Profil from "./pages/Profil";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </Router>
  );
}

export default App;
