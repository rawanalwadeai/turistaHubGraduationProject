import React, { useState , useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [showOptions, setShowOptions] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowOptions(false);
      console.log("Changed to:", lng);

  };
  
  useEffect(() => {
  document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
}, [i18n.language]);






  return (

    
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setShowOptions(!showOptions)}
        style={{
          fontSize: '20px',
        //   padding: '8px 12px',
          cursor: 'pointer',
          border: 'none',
          backgroundColor: 'white'
        }}
      >
        🌐
      </button>

      {showOptions && (
        <ul style={{
          position: 'absolute',
          top: '0%',
          right: 0,
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '8px',
          listStyle: 'none',
          padding: '5px 0',
          margin: 0,
          width: '120px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 100
        }}>
          <li
            onClick={() => changeLanguage('tr')}
            style={{  cursor: 'pointer', textAlign: 'center' }}
          >
            🇹🇷 Türkçe
          </li>
         
          <li
            onClick={() => changeLanguage('en')}
            style={{  cursor: 'pointer', textAlign: 'center' }}
          >
            en English
          </li>
         
          <li
            onClick={() => changeLanguage('ar')}
            style={{    cursor: 'pointer', textAlign: 'center' }}
          >
            🇸🇦 العربية
          </li>
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
