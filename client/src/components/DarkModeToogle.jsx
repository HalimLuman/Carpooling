import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CiDark } from 'react-icons/ci';
import { CiLight } from "react-icons/ci";

const DarkModeToggle = () => {
  const [dark, setDark] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });
  const { i18n, t } = useTranslation();

  const darkModeHandler = () => {
    setDark(!dark); // Toggle dark mode
  };

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('darkMode', JSON.stringify(dark));
  }, [dark]);

  return (
    <button className="flex items-center w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-n-1/10 dark:transition dark:duration-300" onClick={darkModeHandler}>
      <CiDark size={22} className={`${dark ? 'block' : 'hidden'}`} color="white"/>
      <CiLight size={22} className={`${dark ? 'hidden' : 'block'}`} color="black"/>

      <span className="ml-3 dark:text-n-1 text-n-8 dark:transition dark:duration-300">{dark ? `${t('GENERAL.Navbar.dark')}` : `${t('GENERAL.Navbar.light')}`}</span>
    </button>
  );
};

export default DarkModeToggle;
