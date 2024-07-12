import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CiDark } from 'react-icons/ci';
import { CiLight } from 'react-icons/ci';

const DarkModeIcon = () => {
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
    <button className="flex items-center w-full p-3 hover:bg-gray-100 dark:hover:bg-n-1/10 rounded-full w-50 h-50" onClick={darkModeHandler}>
      <CiDark className='hidden dark:block text-xl' color={`${dark ? "white" : "black"}`}/>
      <CiLight className='dark:hidden text-xl' color={`${dark ? "white" : "black"}`}/>
    </button>
  );
};

export default DarkModeIcon;
