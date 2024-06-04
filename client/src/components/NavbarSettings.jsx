import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { CiRollingSuitcase } from "react-icons/ci";
import { CiMap } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Button from "./design/Button";
import MenuSvg from "../assets/svg/MenuSvg";

const NavbarSettings = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const toggleNavigation = () => {
    setOpenNavigation(prevOpenNavigation => {
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
      navigate('/login');
      toast.success('Logged out successfully', { autoClose: 1500, pauseOnHover: false });
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

  return (
    <div className={`fixed top-0 left-0 w-full flex items-center z-50 shadow lg:bg-white lg:backdrop-blur-sm ${openNavigation ? "bg-white" : "bg-white/90 backdrop-blur-sm"}`}>
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4 container py-3  ">
        <Link className="w-[12rem] xl:mr-8 flex items-center" to='/'>
          <img src='../../public/vite.svg' width={40} height={40} alt="Brainwave" />
          <span className="ml-3 text-2xl font-semibold tracking-wider text-black">TRAVEL</span>
        </Link>

        {userInfo ? (
          <div className="flex items-center ml-auto">
            <div className="relative">
              <div className="flex items-center justify-center border hover:shadow text-black cursor-pointer px-4 py-2 rounded-full" onClick={() => setOpenProfile(!openProfile)}>
                <FaUserCircle size={20} />
                <h3 className="ml-3 mt-[0.1rem]">{userInfo.name}</h3>
                <RiArrowDropDownLine size={30} className={`${openProfile ? 'transform rotate-180' : ''}`} />
              </div>
              {openProfile && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="flex flex-col">
                    <div className="py-2">
                      <Link to='/account' className="flex items-center px-4 py-2 text-black hover:bg-gray-100">
                        <CiUser size={22} />
                        <span className="ml-3">Account</span>
                      </Link>
                      <Link to='/dashboard' className="flex items-center px-4 py-2 text-black hover:bg-gray-100">
                        <IoIosNotificationsOutline size={22} />
                        <span className="ml-3">Notifications</span>
                      </Link>
                    </div>
                    <hr className="border-gray-200"/>
                    <div className="py-2">
                      <Link to='/explore' className="flex items-center px-4 py-2 text-black hover:bg-gray-100">
                        <CiMap size={22} />
                        <span className="ml-3">Explore</span>
                      </Link>
                      <Link to='/dashboard/privacy' className="flex items-center px-4 py-2 text-black hover:bg-gray-100">
                        <CiCirclePlus size={22} />
                        <span className="ml-3">Create Travel</span>
                      </Link>
                      <Link to='/dashboard/terms' className="flex items-center px-4 py-2 text-black hover:bg-gray-100">
                        <CiRollingSuitcase size={22} />
                        <span className="ml-3">My Travels</span>
                      </Link>
                      
                    </div>
                    <hr className="border-gray-200"/>
                    <div className="py-2">
                      <Link to='/dashboard/settings' className="flex items-center px-4 py-2 text-black hover:bg-gray-100">
                        <CiSettings size={22} />
                        <span className="ml-3">Settings</span>
                      </Link>
                      <Link to='/dashboard/support' className="flex items-center px-4 py-2 text-black hover:bg-gray-100">
                        <IoIosHelpCircleOutline size={22} />
                        <span className="ml-3">Support</span>
                      </Link>
                      <button onClick={logoutHandler} className="flex items-center px-4 py-2 text-black hover:bg-gray-100 w-full text-left">
                        <CiLogout size={22} />
                        <span className="ml-3">Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <Link to='/register'>
              <button className="hidden lg:block mr-8 bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded-full transition-colors">
                New account
              </button>
            </Link>
            <Link to='/login'>
              <button className="hidden lg:block bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded-full transition-colors">
                Sign in
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavbarSettings;
