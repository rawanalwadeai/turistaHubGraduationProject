import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import translationTR from './locales/tr/translation.json'
import translationAR from './locales/ar/translation.json'
import translationEN from './locales/en/translation.json'


i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      tr: { translation: translationTR },
      ar: { translation: translationAR },
      en: { translation: translationEN }

    },
    lng: 'en', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
