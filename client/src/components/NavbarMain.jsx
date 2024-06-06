import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useState } from "react";
import { navigation } from "../constants";
import Button from "./design/Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

import { useDispatch, useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdLogout, MdOutlineModeOfTravel } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { SlSupport } from "react-icons/sl";
import { MdOutlineLanguage } from "react-icons/md";
import { toast } from "react-toastify";
import { BsCoin } from "react-icons/bs";
import {
  CiCirclePlus,
  CiLogout,
  CiMap,
  CiRollingSuitcase,
  CiSettings,
  CiUser,
} from "react-icons/ci";
import {
  IoIosHelpCircleOutline,
  IoIosNotificationsOutline,
} from "react-icons/io";
import { useTranslation } from "react-i18next";

const lngs = {
  en: { nativeName: "Enligsh" },
  mk: { nativeName: "Macedonian" },
  al: { nativeName: "Albanian" },
  tr: { nativeName: "Turkish" },
};

const NavbarMain = () => {
  const { i18n } = useTranslation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const toggleNavigation = () => {
    setOpenNavigation((prevOpenNavigation) => {
      if (!prevOpenNavigation) {
        disablePageScroll();
      } else {
        enablePageScroll();
      }
      return !prevOpenNavigation;
    });
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("Logged out succesfully", {
        autoClose: 1500,
        pauseOnHover: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = () => {
    if (openNavigation) {
      enablePageScroll();
      setOpenNavigation(false);
    }
  };

  const handleLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpenLanguage(false)
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 shadow border-n-2 lg:bg-n-1 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-1" : "bg-n-1/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4 container">
        <a className="w-[12rem] xl:mr-8 flex items-center" href="#hero">
          <img
            src="../../public/vite.svg"
            width={40}
            height={40}
            alt="Brainwave"
          />
          <span className="ml-3 text-2xl font-semibold tracking-wider text-n-8">
            TRAVEL
          </span>
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[4.7rem] left-0 right-0 bottom-0 bg-n-1 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-xl uppercase text-n-8 transition-colors hover:text-amber-600 px-6 py-5 md:py-6 lg:-mr-0.25 xl:text-sm lg:font-semibold lg:leading-5 lg:hover:text-amber-600 xl:px-10`}
              >
                {item.title}
              </a>
            ))}
          </div>
        </nav>
        {userInfo ? (
          <div className="flex items-center">
            <div className="flex items-center ml-auto">
              <div className="relative">
                <div
                  className="text-n-8 cursor-pointer rounded-full mx-2"
                  onClick={() => setOpenLanguage(!openLanguage)}
                >
                  <MdOutlineLanguage size={25} />
                </div>
                {openLanguage && (
                  <div className="absolute mt-4 w-max bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="flex flex-col">
                      {Object.keys(lngs).map((lng) => (
                        <button
                          key={lng}
                          onClick={() => handleLanguage(lng)}
                          className="px-4 py-2 text-black hover:bg-gray-100 w-full text-left"
                        >
                          {lngs[lng].nativeName}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Link to="/account/payments-payouts" className="mx-2">
              <div className="flex items-center rounded-lg bg-green-600 hover:bg-green-700 px-3 py-2 space-x-2 cursor-pointer">
                <BsCoin size={24} className="text-n-1" />
                <span className="text-n-1 font-semibold">
                  {userInfo.tokens}
                </span>
              </div>
            </Link>
            <div className="flex items-center ml-auto">
              <div className="relative">
                <div
                  className="flex items-center justify-center border hover:shadow text-black cursor-pointer px-4 py-2 rounded-full"
                  onClick={() => setOpenProfile(!openProfile)}
                >
                  <FaUserCircle size={20} />
                  <h3 className="ml-3 mt-[0.1rem]">{userInfo.name}</h3>
                  <RiArrowDropDownLine
                    size={30}
                    className={`${openProfile ? "transform rotate-180" : ""}`}
                  />
                </div>
                {openProfile && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="flex flex-col">
                      <div className="py-2">
                        <Link
                          to="/account"
                          className="flex items-center px-4 py-2 text-black hover:bg-gray-100"
                        >
                          <CiUser size={22} />
                          <span className="ml-3">Account</span>
                        </Link>
                        <Link
                          to="/dashboard"
                          className="flex items-center px-4 py-2 text-black hover:bg-gray-100"
                        >
                          <IoIosNotificationsOutline size={22} />
                          <span className="ml-3">Notifications</span>
                        </Link>
                      </div>
                      <hr className="border-gray-200" />
                      <div className="py-2">
                        <Link
                          to="/explore"
                          className="flex items-center px-4 py-2 text-black hover:bg-gray-100"
                        >
                          <CiMap size={22} />
                          <span className="ml-3">Explore</span>
                        </Link>
                        <Link
                          to="/dashboard/privacy"
                          className="flex items-center px-4 py-2 text-black hover:bg-gray-100"
                        >
                          <CiCirclePlus size={22} />
                          <span className="ml-3">Create Travel</span>
                        </Link>
                        <Link
                          to="/dashboard/terms"
                          className="flex items-center px-4 py-2 text-black hover:bg-gray-100"
                        >
                          <CiRollingSuitcase size={22} />
                          <span className="ml-3">My Travels</span>
                        </Link>
                      </div>
                      <hr className="border-gray-200" />
                      <div className="py-2">
                        <Link
                          to="/dashboard/settings"
                          className="flex items-center px-4 py-2 text-black hover:bg-gray-100"
                        >
                          <CiSettings size={22} />
                          <span className="ml-3">Settings</span>
                        </Link>
                        <Link
                          to="/dashboard/support"
                          className="flex items-center px-4 py-2 text-black hover:bg-gray-100"
                        >
                          <IoIosHelpCircleOutline size={22} />
                          <span className="ml-3">Support</span>
                        </Link>
                        <button
                          onClick={logoutHandler}
                          className="flex items-center px-4 py-2 text-black hover:bg-gray-100 w-full text-left"
                        >
                          <CiLogout size={22} />
                          <span className="ml-3">Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <Link to="/register">
              <button className="hidden lg:block mr-8 bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded-full transition-colors">
                New account
              </button>
            </Link>
            <Link to="/login">
              <button className="hidden lg:block bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded-full transition-colors">
                Sign in
              </button>
            </Link>
          </>
        )}

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default NavbarMain;
