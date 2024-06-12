import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MdLogout, MdOutlineExplore } from "react-icons/md";
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { sidebar } from '../constants';
import MenuSvg from '../assets/svg/MenuSvg'
import { IoHomeOutline } from 'react-icons/io5';
import { FaRegUser, FaUserCircle } from 'react-icons/fa';
import { LuPlusCircle } from 'react-icons/lu'
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { toast } from 'react-toastify'
import { RiArrowDropDownLine } from 'react-icons/ri';

const Sidebar = () => {
    const [isActive, setIsActive] = useState(true);
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();

    const toggleSidebar = () => {
        setIsActive(!isActive);
    };
    if (!isActive) {
        disablePageScroll();
    } else {
        enablePageScroll();
    }

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

    return (
        <div className='bg-n-1 xl:bg-transparent fixed h-full flex items-center md:items-start z-1'>
            <div className={`${isActive ? 'hidden' : null} lg:flex flex-col items-center w-[100vw] lg:w-[280px] xl:w-[300px] h-[100%]`}>
                <Link to="/profile" className='my-3 w-full px-5'>
                    <div className='px-4 lg:px-1 xl:px-0'>
                        <div className="flex items-center justify-start border hover:shadow text-black cursor-pointer px-4 py-2 rounded-md bg-n-1 w-full mt-3" onClick={() => setOpenProfile(!openProfile)}>
                            <FaUserCircle size={25} />
                            <div>
                                <h3 className="ml-3 h6">{userInfo.name}</h3>
                                <h3 className="ml-3 text-xs">{userInfo.email}</h3>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className='px-3 self-start w-[100%]'>
                    {sidebar.map((menu, index) => (
                        <div key={index}>
                            {index > 0 ?   <hr className='w-[90%] mx-auto' /> : null}             
                            <div className='pt-1'>
                                {menu.links.map((link, linkIndex) => (
                                    <NavLink
                                        to={link.name === 'Profile' ? `/dashboard/${userInfo._id}` : link.to}
                                        key={linkIndex}
                                        className='flex items-center py-3 mt-1 lg:mt-2 rounded-md text-n-5 text-base hover:bg-n-8/10 px-3'
                                    >
                                        {link.icon && <link.icon className=' p-1 rounded-md' size={33} />}
                                        <span className='ml-4 text-sm font-bold'>{link.name}</span>
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {/* <div onClick={logoutHandler} style={{ left: '50%', transform: 'translateX(-50%)' }}  className="absolute cursor-pointer bottom-[1rem] justify-center self-center flex items-center mx-auto w-[85%] py-3 mt-1 lg:mt-2 rounded-md text-n-5 text-base hover:border-b-2 hover:border-sky-700 shadow-md px-3">
                    <MdLogout />
                    <p className="ml-3 tracking-wider text-[0.9rem]">Logout</p>
                </div> */}
            </div>
            <div className='fixed bottom-0 lg:hidden w-full bg-n-1 py-1 border-t z-2' style={{ left: '50%', transform: 'translateX(-50%)' }}>
                <div className='flex items-center justify-evenly py-2'>
                    <div onClick={toggleSidebar}>
                        <MenuSvg openNavigation={!isActive} />
                    </div>
                    <NavLink to='/'><IoHomeOutline style={{ color: 'black' }} size={20} /></NavLink>
                    <NavLink to='/explore'><MdOutlineExplore style={{ color: 'black' }} size={25} /></NavLink>
                    <NavLink to={`/profile/${userInfo._id}`}><FaRegUser style={{ color: 'black' }} size={20} /></NavLink>
                    <NavLink to='/'><LuPlusCircle style={{ color: 'black' }} size={20} /></NavLink>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
