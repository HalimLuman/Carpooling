import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Section from '../../components/design/Section';
import AccountHeader from '../../components/AccountHeader';
import DarkModeToggle from '../../components/DarkModeToogle'; // Corrected import
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

const SettingsSidebar = ({ selected, onSelect, t }) => (
  <div className="w-full md:w-1/4 p-4 bg-gray-100 dark:bg-neutral-900 rounded-lg shadow-md mb-8 md:mb-0">
    <ul className="space-y-4">
      {['general', 'account'].map((category) => (
        category === 'account' ? (
          <Link
            key={category}
            className={`block cursor-pointer p-2 rounded-lg transition ${selected === category ? 'bg-gray-200 dark:bg-neutral-800' : 'hover:bg-gray-200 dark:hover:bg-neutral-800'}`}
            to="/account/personal-information"
            aria-selected={selected === category}
          >
            {t("ACCOUNT.Pages.settings.language").charAt(0).toUpperCase() + t("ACCOUNT.Pages.settings.language").slice(1)}
          </Link>
        ) : (
          <li
            key={category}
            className={`cursor-pointer p-2 rounded-lg transition ${selected === category ? 'bg-gray-200 dark:bg-neutral-800' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
            onClick={() => onSelect(category)}
            role="button"
            aria-selected={selected === category}
          >
            {t("ACCOUNT.Pages.settings.general").charAt(0).toUpperCase() + t("ACCOUNT.Pages.settings.general").slice(1)}
          </li>
        )
      ))}
    </ul>
  </div>
);

const SettingCard = ({ title, children }) => (
  <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-md">
    <h3 className="text-xl mb-4">{title}</h3>
    {children}
  </div>
);

const Settings = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const { t } = useTranslation();
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
    { label: `${t("ACCOUNT.Links.homeSM")}`, link: '/' },
    { label: `${t("ACCOUNT.Links.accountSM")}`, link: '/account' },
    { label: `${t("ACCOUNT.Pages.settings.title")}` }
  ];

  return (
    <Section>
      <div className="container mx-auto text-neutral-900 dark:text-gray-200 min-h-screen">
        <AccountHeader elements={headerElements} />
        <div className="flex flex-col md:flex-row mt-8 md:mt-12 px-5 lg:px-15">
          <SettingsSidebar selected={selectedCategory} onSelect={setSelectedCategory} t={t} />
          <div className="w-full md:w-3/4 pl-0 md:pl-8">
            {selectedCategory === 'general' && (
              <SettingCard title={`${t("ACCOUNT.Pages.settings.generalSettings")}`}>
                <div className="flex items-center justify-between mb-4">
                  <span>{`${t("ACCOUNT.Pages.settings.darkMode")}`}</span>
                  <div className='w-max'>
                    <DarkModeToggle checked={darkMode} onChange={handleThemeChange} />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span>{`${t("ACCOUNT.Pages.settings.language")}`}</span>
                  <select
                    onChange={handleLanguageChange}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-neutral-800 transition "
                    defaultValue={localStorage.getItem('i18nextLng') || 'en'}
                  >
                    <option value='en'>{`${t("ACCOUNT.Pages.settings.english")}`}</option>
                    <option value='mk'>{`${t("ACCOUNT.Pages.settings.macedonian")}`}</option>
                    <option value='al'>{`${t("ACCOUNT.Pages.settings.albanian")}`}</option>
                    <option value='tr'>{`${t("ACCOUNT.Pages.settings.turkish")}`}</option>
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
