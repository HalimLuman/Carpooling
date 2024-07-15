import React from 'react';
import { useTranslation } from 'react-i18next';

const NavigationComponent = ({openNavigation, handleClick}) => {
  const { t } = useTranslation();

  const navigation = [
    {
      id: "0",
      title: t('GENERAL.Navbar.Home'),
      url: "/",
    },
    {
      id: "1",
      title: t('GENERAL.Navbar.travels'),
      url: "/dashboard/reservation",
    },
    {
      id: "2",
      title: t('GENERAL.Navbar.explore'),
      url: "/explore",
    },
    // Add other navigation items here
  ];

  return (
    <nav className={`${openNavigation ? "flex" : "hidden"} fixed top-[4.7rem] left-0 right-0 bottom-0 bg-n-1 lg:static lg:flex lg:mx-auto lg:bg-transparent`}>
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a key={item.id} href={item.url} onClick={handleClick} className={`block relative w-[150px] text-center font-code text-md uppercase text-n-8 dark:text-n-1 transition-colors hover:text-sky-600 py-5 md:py-6 xl:text-sm lg:font-semibold lg:leading-5 dark:hover:text-sky-600`}>
                {item.title}
              </a>
            ))}
          </div>
        </nav>
  );
};

export default NavigationComponent;
