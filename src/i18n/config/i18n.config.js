import i18n from "i18next";
import { initReactI18next, Translation } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import fr from '../locales/fr'
import en from '../locales/en'
import it from '../locales/it'

const resources={
  fr:{translation:fr},
  en:{translation:en},
  it:{translation:it}
};
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
     resources,
     fallbackLng:'fr',
     interpolation:{
      escapeValue:false,
     },
     detection:{
      order:[localStorage,navigator],
      caches:[localStorage]
     },
     debug:process.env.NODE_ENV==='development'
  })
  
export default i18n;
