import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import NavbarLinks from "./navbar-components/NavbarLinks";
import NavbarUser from "./navbar-components/NavbarUser";
import { fullLogo2Black, fullLogo2White } from "../assets";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiHome, CiMap, CiSettings, CiUser } from "react-icons/ci";
import DarkModeToggle from "./DarkModeToogle";
import { IoIosHelpCircleOutline } from "react-icons/io";

const NavbarLive = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : true; // Default to true if no saved value
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const { t, i18n } = useTranslation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const handleClick = () => {
    if (openNavigation) {
      setOpenNavigation(false);
    }
  };

  return (
    <div
      className={`h-[70px]w-full z-50 shadow dark:shadow-white/10 border-n-2 lg:bg-n-1 dark:bg-neutral-950 dark:shadow-md-white lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-1" : "bg-n-1/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4 container justify-between">
        <a className="w-[12rem] xl:mr-8 flex items-center" href="/">
          <div className="hidden dark:block">
            <img src={fullLogo2White} width={130} alt="Brainwave" />
          </div>
          <div className="block dark:hidden">
            <img src={fullLogo2Black} width={130} alt="Brainwave" />
          </div>
        </a>
        <NavbarLinks handleClick={handleClick} openNavigation={openNavigation} />
        {userInfo ? (
          <NavbarUser userInfo={userInfo} openProfile={openProfile} />
        ) : (
          <div className="flex items-center ml-auto">
            <div className="relative">
              <div
                className="flex items-center justify-center border dark:border-neutral-700 hover:shadow dark:hover:shadow-white/30 text-black cursor-pointer px-2 py-2 rounded-full"
                onClick={() => setDropdown(!dropdown)}
              >
                <h3 className="px-2 dark:text-n-1">Guest</h3>
                <RiArrowDropDownLine
                  size={30}
                  className={`${
                    dropdown ? "transform rotate-180" : ""
                  } dark:text-n-1`}
                />
              </div>
              {dropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg">
                  <div className="flex flex-col py-2">
                    <div>
                      <Link
                        to="/home"
                        className="flex items-center px-4 py-3 text-n-8 dark:text-n-1 hover:bg-gray-100 dark:hover:bg-n-1/10"
                      >
                        <CiHome size={22} />
                        <span className="ml-3">
                          {t("GENERAL.Navbar.Home")}
                        </span>
                      </Link>
                      <Link
                        to="/explore"
                        className="flex items-center px-4 py-3 text-n-8 dark:text-n-1 hover:bg-gray-100 dark:hover:bg-n-1/10"
                      >
                        <CiMap size={22} />
                        <span className="ml-3">
                          {t("GENERAL.Navbar.explore")}
                        </span>
                      </Link>
                    </div>
                    <hr className="border-gray-200 dark:border-gray-600 transition duration-300" />
                    <div className="pb-2">
                      <DarkModeToggle />
                      <Link
                        to="/support"
                        className="flex items-center px-4 py-3 text-n-8 dark:text-n-1 hover:bg-gray-100 dark:hover:bg-n-1/10"
                      >
                        <IoIosHelpCircleOutline size={22} />
                        <span className="ml-3">
                          {t("GENERAL.Navbar.support")}
                        </span>
                      </Link>
                      <Link to="/login" className="flex items-center border px-4 py-3 text-n-8 dark:text-n-1 hover:bg-gray-100 dark:hover:bg-n-1/10">
                        <button className="">
                          Sign in
                        </button>
                      </Link>
                      <Link to="/register" className="flex items-center  px-4 pt-3 text-n-8 dark:text-n-1 hover:bg-gray-100 dark:hover:bg-n-1/10">
                        <button className="">
                          New account
                        </button>
                      </Link>
                      
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarLive;
