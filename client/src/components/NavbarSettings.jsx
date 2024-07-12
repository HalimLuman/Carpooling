import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import NavbarUser from "./navbar-components/NavbarUser";
import { fullLogo1Black, fullLogo1White, fullLogo2Black, fullLogo2White } from "../assets";

const lngs = {
  en: { nativeName: "English" },
  mk: { nativeName: "Macedonian" },
  al: { nativeName: "Albanian" },
  tr: { nativeName: "Turkish" },
};

const NavbarSettings = () => {
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

  const handleLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    setOpenLanguage(false);
  };

  return (
    <div className='fixed top-0 left-0 w-full z-50 shadow dark:shadow-white/10 bg-n-1 dark:bg-neutral-950'>
      <div className="flex items-center justify-between px-5 lg:px-10 py-3">
        <a className="w-[12rem] xl:mr-8 flex items-center" href="/">
          <div className="hidden dark:block transition duration-300">
            <img src={fullLogo2White} width={150} alt="Brainwave" />
          </div>
          <div className="block dark:hidden transition duration-300">
            <img src={fullLogo2Black} width={150} alt="Brainwave" />
          </div>
        </a>
        {userInfo ? (
          <NavbarUser
            openLanguage={openLanguage}
            userInfo={userInfo}
            openProfile={openProfile}
            handleLanguage={handleLanguage}
          />
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/register">
              <button className="hidden lg:block bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded-full transition-colors">
                New account
              </button>
            </Link>
            <Link to="/login">
              <button className="hidden lg:block bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded-full transition-colors">
                Sign in
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarSettings;
