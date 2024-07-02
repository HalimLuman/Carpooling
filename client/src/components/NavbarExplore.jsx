import React, { useState } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { navigation } from "../constants";
import Button from "./design/Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegUser, FaUserCircle } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdLogout, MdOutlineModeOfTravel, MdOutlineSpaceDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { SlSupport } from "react-icons/sl";
import { toast } from 'react-toastify';
import { usePostSearch } from "../context/PostFilter";
import { IoSearchOutline } from "react-icons/io5";
import '../css/form.css'
import { BsCoin } from "react-icons/bs";
import { CiCirclePlus, CiLogout, CiSettings, CiUser } from "react-icons/ci";
import { IoIosHelpCircleOutline, IoIosNotificationsOutline } from "react-icons/io";

const NavbarExplore = () => {
    const [openNavigation, setOpenNavigation] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [border, setBorder] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { submitHandler } = usePostSearch();

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
        <div className="fixed top-0 left-0 w-full z-50 border-b border-n-2 flex flex-col bg-n-1 pb-5">
            <div className={`lg:bg-n-1 lg:backdrop-blur-sm ${openNavigation ? "bg-n-1" : "bg-n-1/90 backdrop-blur-sm"} container`}>
                <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
                    <a className="w-[12rem] xl:mr-8 flex items-center" href="/">
                        <img src='../../public/vite.svg' width={40} height={40} alt="Brainwave" />
                        <span className="ml-3 text-2xl font-semibold tracking-wider text-n-8">TRAVEL</span>
                    </a>
                    <nav className={`${openNavigation ? "flex" : "hidden"} fixed top-[4.7rem] left-0 right-0 bottom-0 bg-n-1 lg:static lg:flex lg:mx-auto lg:bg-transparent`}>
                        <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
                            {navigation.map((item) => (
                                <a key={item.id} href={item.url} onClick={handleClick} className={`block relative font-code text-xl uppercase text-n-8 transition-colors hover:text-amber-600 px-6 py-5 md:py-6 lg:-mr-0.25 xl:text-sm lg:font-semibold lg:leading-5 lg:hover:text-amber-600 xl:px-10`}>
                                    {item.title}
                                </a>
                            ))}
                            {userInfo ? (
                                <div className="block xl:hidden text-center">
                                    <Link to='/dashboard' className="block relative font-code text-xl uppercase text-n-8 transition-colors hover:text-amber-600 px-6 py-5 md:py-6 lg:-mr-0.25 xl:text-sm lg:font-semibold lg:leading-5 lg:hover:text-amber-600 xl:px-10">Profile</Link>
                                    <p onClick={logoutHandler} className="block relative font-code text-xl uppercase text-n-8 transition-colors hover:text-amber-600 px-6 py-5 md:py-6 lg:-mr-0.25 xl:text-sm lg:font-semibold lg:leading-5 lg:hover:text-amber-600 xl:px-10">Logout</p>
                                </div>
                            ) : (
                                <div className="block xl:hidden">
                                    <Link to='/login' className="block relative font-code text-xl uppercase text-n-8 transition-colors hover:text-amber-600 px-6 py-5 md:py-6 lg:-mr-0.25 xl:text-sm lg:font-semibold lg:leading-5 lg:hover:text-amber-600 xl:px-10">Sign in</Link>
                                    <Link to='/register' className="block relative font-code text-xl uppercase text-n-8 transition-colors hover:text-amber-600 px-6 py-5 md:py-6 lg:-mr-0.25 xl:text-sm lg:font-semibold lg:leading-5 lg:hover:text-amber-600 xl:px-10">New Account</Link>
                                </div>
                            )}
                        </div>
                    </nav>
                    {userInfo ? (
          <div className="flex items-center">
             <Link to='/dashboard/subscription' className="mx-2">
              <div className="flex items-center rounded-lg bg-green-600 hover:bg-green-700 px-3 py-2 space-x-2 cursor-pointer">
                <BsCoin size={24} className="text-n-1" />
                <span className="text-n-1 font-semibold">{userInfo.tokens}</span>
              </div>
            </Link>
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
                    <Link to='/dashboard/privacy' className="flex items-center px-4 py-2 text-black hover:bg-gray-100">
                        <CiCirclePlus size={22} />
                        <span className="ml-3">Create Travel</span>
                      </Link>
                      <Link to='/dashboard/terms' className="flex items-center px-4 py-2 text-black hover:bg-gray-100">
                        <MdOutlineModeOfTravel size={22} />
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
                    <Button className="ml-auto lg:hidden" px="px-3" onClick={toggleNavigation}>
                        <MenuSvg openNavigation={openNavigation} />
                    </Button>
                </div>
            </div>
            <div className='w-[95%] xl:w-[50%] self-center bg-n-1'>
                <form className='text-n-8 bg-n-1 border border-n-8/10 flex rounded-full items-center' onSubmit={submitHandler} onMouseEnter={() => setBorder(true)} onMouseLeave={() => setBorder(false)}>
                    <input type="text" name="from" placeholder="From" autoComplete="off" className='bg-n-1 w-[31%] outline-none hover:cursor-pointer hover:bg-n-8/5 py-3 rounded-full px-3 flex-grow' />
                    <input type="text" name="to" placeholder="To" className={`bg-n-1 w-[31%] outline-none hover:cursor-pointer border-l border-r focus:border-transparent focus:rounded-full hover:bg-n-8/5 py-3 px-6 flex-grow ${border ? 'border-transparent rounded-full' : 'border-n-8/10'}`} />
                    <input type="date" name="date" placeholder="Date" className='bg-n-1 outline-none hover:cursor-pointer hover:bg-n-8/5 py-3 rounded-full px-3 flex-grow w-[31%]' />
                    <div className="w-[6%] flex items-center justify-end">
                        <button type='submit' className='px-2 my-1 mr-2 py-2 bg-sky-600 text-n-1 rounded-full'>
                        <IoSearchOutline color={"white"} size={20}/>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NavbarExplore;
