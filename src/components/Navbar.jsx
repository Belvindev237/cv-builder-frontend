import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../i18n/context/LanguageContext"; // ← Import direct

export default function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const languages = [
    { code: "fr", flag: "🇫🇷", name: "Français" },
    { code: "it", flag: "🇮🇹", name: "Italiano" },
    { code: "en", flag: "🇬🇧", name: "English" },
  ];

  const navigate = useNavigate();

  const handleLangChange = (code) => {
    changeLanguage(code);
    setLangOpen(false);
  };

  return (
    <nav className="bg-white shadow-xl w-full fixed top-0 z-50 border-b-4 border-blue-600">
      <div className="flex max-w-7xl mx-auto px-5 h-20 items-center justify-between">
        <div
          className="logo text-3xl font-black text-blue-600 cursor-pointer hover:text-indigo-600 transition-all hover:scale-105"
          onClick={() => navigate("/")}
        >
          {t('nav.brand')}
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8 text-gray-700 font-semibold">
            <li
              className="hover:text-blue-600 transition cursor-pointer relative group pb-1"
              onClick={() => navigate("/")}
            >
              {t('nav.menu.home')}
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </li>
            <li
              className="hover:text-blue-600 transition cursor-pointer relative group pb-1"
              onClick={() => navigate("/tarifications")}
            >
              {t('nav.menu.pricing')}
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </li>
            <li
              className="hover:text-blue-600 transition cursor-pointer relative group pb-1"
              onClick={() => navigate("/contacts")}
            >
              {t('nav.menu.contact')}
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </li>
          </ul>

          {/* Language Selector Desktop */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-blue-50 transition-all hover:shadow-md"
            >
              <span className="text-2xl">
                {languages.find((l) => l.code === currentLanguage)?.flag}
              </span>
              <i
                className={`fas fa-chevron-down text-xs transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`}
              ></i>
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-2xl border-2 border-blue-100 py-2 animate-fadeIn">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLangChange(lang.code)}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-all ${
                      currentLanguage === lang.code
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-sm font-medium">{lang.name}</span>
                    {currentLanguage === lang.code && (
                      <i className="fas fa-check text-blue-600 ml-auto"></i>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {!isAuthenticated ? (
            <button
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-indigo-600 hover:shadow-xl transition-all font-bold transform hover:scale-105"
              onClick={() => navigate("/auth")}
            >
              {t('nav.auth.login')}
            </button>
          ) : (
            <button
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-indigo-600 hover:shadow-xl transition-all font-bold transform hover:scale-105"
              onClick={() => navigate("/profil")}
            >
              {t('nav.auth.profile')}
            </button>
          )}
        </div>

        {/* Hamburger Mobile */}
        <button
          className="md:hidden text-gray-700 text-3xl focus:outline-none p-2 hover:text-blue-600 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
      </div>

      {/* Menu Mobile */}
      <div
        className={`md:hidden bg-white border-b-2 border-gray-100 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col p-6 space-y-5 text-gray-700 font-semibold">
          <li
            className="hover:text-blue-600 transition cursor-pointer hover:translate-x-2 duration-200"
            onClick={() => {
              navigate("/");
              setIsOpen(false);
            }}
          >
            🏠 {t('nav.menu.home')}
          </li>
          <li
            className="hover:text-blue-600 transition cursor-pointer hover:translate-x-2 duration-200"
            onClick={() => {
              navigate("/tarifications");
              setIsOpen(false);
            }}
          >
            💰 {t('nav.menu.pricing')}
          </li>
          <li
            className="hover:text-blue-600 transition cursor-pointer hover:translate-x-2 duration-200"
            onClick={() => {
              navigate("/contacts");
              setIsOpen(false);
            }}
          >
            📧 {t('nav.menu.contact')}
          </li>

          {/* Language selector mobile */}
          <div className="pt-4 border-t-2 border-gray-200">
            <p className="text-xs text-gray-500 mb-3 font-medium">
              {t('nav.language.label')}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLangChange(lang.code)}
                  className={`py-3 rounded-xl transition-all transform ${
                    currentLanguage === lang.code
                      ? "bg-blue-600 text-white scale-105 shadow-lg"
                      : "bg-gray-100 hover:bg-blue-50"
                  }`}
                >
                  <div className="text-3xl mb-1">{lang.flag}</div>
                  <div className="text-xs font-medium">
                    {lang.code.toUpperCase()}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {!isAuthenticated ? (
            <button
              className="w-full bg-blue-600 text-white px-6 py-4 rounded-full hover:bg-indigo-600 transition-all font-bold shadow-lg hover:shadow-xl transform hover:scale-105 mt-4"
              onClick={() => {
                navigate("/auth");
                setIsOpen(false);
              }}
            >
              {t('nav.auth.login')}
            </button>
          ) : (
            <button
              className="w-full bg-blue-600 text-white px-6 py-4 rounded-full hover:bg-indigo-600 transition-all font-bold shadow-lg hover:shadow-xl transform hover:scale-105 mt-4"
              onClick={() => {
                navigate("/profil");
                setIsOpen(false);
              }}
            >
              {t('nav.auth.profile')}
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
}