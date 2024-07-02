import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import NavbarLinks from './navbar-components/NavbarLinks';
import NavbarUser from "./navbar-components/NavbarUser";
import { fullLogo1Black, fullLogo1White, fullLogo2Black, fullLogo2White } from "../assets";

const lngs = {
  en: { nativeName: "English" },
  mk: { nativeName: "Macedonian" },
  al: { nativeName: "Albanian" },
  tr: { nativeName: "Turkish" },
};

const NavbarMain = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : true; // Default to true if no saved value
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const { i18n } = useTranslation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const handleClick = () => {
    if (openNavigation) {
      setOpenNavigation(false);
    }
  };

  const handleLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    setOpenLanguage(false);
  };

  return (
    <div className={`fixed top-0 left-0 w-full z-50 shadow border-n-2 lg:bg-n-1 dark:bg-[#1A202C] dark:shadow-md-white lg:backdrop-blur-sm ${openNavigation ? "bg-n-1" : "bg-n-1/90 backdrop-blur-sm"}`}>
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4 container justify-between">
        <a className="w-[12rem] xl:mr-8 flex items-center" href="/">
          <div className="hidden dark:block">
            <img src={fullLogo2White} width={150} alt="Brainwave" />
          </div>
          <div className="block dark:hidden">
            <img src={fullLogo2Black} width={150} alt="Brainwave" />
          </div>
        </a>
        <NavbarLinks handleClick={handleClick} openNavigation={openNavigation}/>
        {userInfo ? (
          <NavbarUser openLanguage={openLanguage} userInfo={userInfo} openProfile={openProfile} handleLanguage={handleLanguage} />
        ) : (
          <>
            <Link to="/register">
              <button className="hidden lg:block mr-8 border text-sm dark:text-n-1 dark:border-gray-600 hover:shadow dark:hover:shadow-white/30 text-black cursor-pointer px-4 py-2 rounded-full">
                New account
              </button>
            </Link>
            <Link to="/login">
              <button className="hidden lg:block mr-8 border text-sm dark:text-n-1 dark:border-gray-600 hover:shadow dark:hover:shadow-white/30 text-black cursor-pointer px-4 py-2 rounded-full">
                Sign in
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavbarMain;
