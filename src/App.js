//import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import "./components/Navbar";
//import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Builder from "./pages/Builder";
//import Auth from "./pages/AuthPage";
//import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Profil from "./pages/Profil";
import Visualisation from "./pages/Visualisation";
import SelectModel from "./pages/SelectModel";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/builder/:id" element={<Builder />} />
          <Route path="/visualisation/:id" element={<Visualisation />} />
          <Route path="/select_template" element={<SelectModel />} />
          <Route
            path="/builder_with_model/:template_id"
            element={<Builder />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
