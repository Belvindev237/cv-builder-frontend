import React, { useState } from "react"; // 1. Importez useState
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  // 2. Créez un état pour savoir si le menu mobile est ouvert
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 z-50">
      <div className="flex max-w-7xl mx-auto px-5 h-16 items-center justify-between">
        <div
          className="logo text-3xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          CV Builder
        </div>

        {/* Menu Desktop (Caché sur mobile) */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6 text-gray-700 font-medium">
            <li className="hover:text-blue-600 transition cursor-pointer">
              Accueil
            </li>
            <li className="hover:text-blue-600 transition cursor-pointer">
              Tarifications
            </li>
            <li className="hover:text-blue-600 transition cursor-pointer">
              Contacts
            </li>
          </ul>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-bold"
            onClick={() => navigate("/auth")}
          >
            Se connecter
          </button>
        </div>

        {/* 3. Bouton Hamburger Mobile - Maintenant cliquable ! */}
        <button
          className="md:hidden text-gray-700 text-2xl focus:outline-none p-2"
          onClick={() => setIsOpen(!isOpen)} // Inverse l'état ouvert/fermé
        >
          <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
      </div>

      {/* 4. Menu Mobile (Affiche conditionnellement) */}
      <div
        className={`md:hidden bg-white border-b border-gray-100 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col p-5 space-y-4 text-gray-700 font-medium">
          <li className="hover:text-blue-600 transition">Accueil</li>
          <li className="hover:text-blue-600 transition">Tarifications</li>
          <li className="hover:text-blue-600 transition">Contacts</li>
          <button
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition font-bold"
            onClick={() => {
              navigate("/auth");
              setIsOpen(false); // Ferme le menu après le clic
            }}
          >
            Se connecter
          </button>
        </ul>
      </div>
    </nav>
  );
}
