import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Section from '../../components/design/Section';
import AccountHeader from '../../components/AccountHeader';
import DarkModeToggle from '../../components/DarkModeToogle';
import i18n from '../../i18n';  // Ensure you have i18n configured

const SettingsSidebar = ({ selected, onSelect }) => (
  <div className="w-1/4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
    <ul className="space-y-4">
      {['general', 'account'].map((category) => (
        category === 'account' ? (
          <Link
            key={category}
            className={`block cursor-pointer p-2 rounded-lg transition ${selected === category ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
            to="/account/personal-information"
            aria-selected={selected === category}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
        ) : (
          <li
            key={category}
            className={`cursor-pointer p-2 rounded-lg transition ${selected === category ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
            onClick={() => onSelect(category)}
            role="button"
            aria-selected={selected === category}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </li>
        )
      ))}
    </ul>
  </div>
);

const SettingCard = ({ title, children }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
    <h3 className="text-xl mb-4">{title}</h3>
    {children}
  </div>
);

const Settings = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');

  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : true; // Default to true if no saved value
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
    localStorage.setItem('i18nextLng', language);
  };

  const headerElements = [
    { label: 'Home', link: '/' },
    { label: 'Account', link: '/account' },
    { label: 'Settings' }
  ];

  return (
    <Section>
      <div className="container mx-auto text-gray-900 dark:text-gray-200 min-h-screen">
        <AccountHeader elements={headerElements} />
        <div className="flex mt-8 container">
          <SettingsSidebar selected={selectedCategory} onSelect={setSelectedCategory} />
          <div className="w-3/4 pl-8">
            {selectedCategory === 'general' && (
              <SettingCard title="General Settings">
                <div className="flex items-center justify-between mb-4">
                  <span>Dark Mode</span>
                  <div className='w-max'>
                    <DarkModeToggle checked={darkMode} onChange={handleThemeChange} />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span>Language</span>
                  <select
                    onChange={handleLanguageChange}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 transition"
                    defaultValue={localStorage.getItem('i18nextLng') || 'en'}
                  >
                    <option value='en'>English</option>
                    <option value='mk'>Macedonian</option>
                    <option value='al'>Albanian</option>
                    <option value='tr'>Turkish</option>
                    {/* Add more languages as needed */}
                  </select>
                </div>
              </SettingCard>
            )}
            {/* Add more categories as needed */}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Settings;
