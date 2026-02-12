import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const LANGUAGES = {
  FR: 'fr',
  EN: 'en',
  IT: 'it'
};

export const LANGUAGE_LABELS = {
  fr: 'Français',
  en: 'English',
  it: 'Italiano'
};
export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem('language') || 'fr'
  );

  const changeLanguage = (lang) => {
    if (Object.values(LANGUAGES).includes(lang)) {
      i18n.changeLanguage(lang);
      setCurrentLanguage(lang);
      localStorage.setItem('language', lang);
    }
  };

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, []);

  const value = {
    currentLanguage,
    changeLanguage,
    languages: LANGUAGES,
    languageLabels: LANGUAGE_LABELS
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};