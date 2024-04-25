import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { sidebar } from '../constants';
import { Link, NavLink } from 'react-router-dom';
import MenuSvg from '../assets/svg/MenuSvg';
import { LuPlusCircle } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineExplore } from "react-icons/md";
import { SlSupport } from "react-icons/sl";

const Sidebar = () => {
    const [isActive, setIsActive] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);

    const toggleSidebar = () => {
        setIsActive(!isActive);
    };

    return (
        <div className='z-1'>
        <div className={`lg:static h-screen bottom-0 bg-n-1 ${isActive ? 'md:w-[300px] xl:w-[400px]' : 'hidden lg:block lg:w-[75px]'} border-r border-n-8/20`}>
            <div className={`flex items-center p-5 px-6 ${isActive ? 'justify-between' : 'justify-center'}`}>
                {isActive && (<div className='flex items-center'>
                    <img src='../../public/vite.svg'/>
                    <h1 className='text-n-8 h6 ml-4'>TRAVEL</h1>
                </div>)}
                <button onClick={toggleSidebar} className='p-1'>
                    <MenuSvg openNavigation={isActive} />
                </button>
            </div>
            {isActive ? (
                <>
                    <div className='ml-3'>
                        {sidebar.map((menu, index) => (
                            <div className='px-5 py-[5%] lg:py-[6%]' key={index}>
                                {isActive && <h2 className='text-sm font-bold text-n-8 tracking-wider'>{menu.title}</h2>}
                                <div className='pt-1'>
                                    {menu.links.map((link, linkIndex) => {
                                        const Icon = link.icon;
                                        return (
                                            <NavLink to={link.to === 'profile' ? `/profile/${userInfo._id}` : link.to === 'home' ? '/' : link.to} key={linkIndex}>
                                                <div className='flex items-center py-3 px-3 mt-1 lg:mt-2 rounded-md text-n-5 text-base hover:bg-amber-600 hover:text-n-1'>
                                                    {Icon && <Icon />}
                                                    <span className='ml-4'>{link.name}</span>
                                                </div>
                                            </NavLink>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='bg-amber-600 mx-6 mt-[5%] xl:mt-[7%] text-center pb-8 px-2 rounded-lg flex flex-col justify-between text-n-1'>
                        <div className='relative p-3 bg-n-1 w-max left-[42%] bottom-6 rounded-full'>
                            <SlSupport style={{color: '#d97706'}} size={35}/>
                        </div>
                        <div>
                            <h3 className='text-base tracking-wider font-bold'>Help Center</h3>
                            <p className='my-3 mb-7 mx-5 text-base'>Having trouble in Travel, contact us for more questions</p>
                            <Link className='bg-n-1 text-n-8 px-4 py-2 mx-5 rounded-md hover:bg-amber-600 border hover:border-n-1 hover:text-n-1' to='/'>Go to help center</Link>
                        </div>
                    </div>
                </>
            ) : (
                <div className='mt-15'>
                    {sidebar.map((menu, index) => (
                        <div key={index}>
                            {menu.links.map((link, linkIndex) => {
                                const Icon = link.icon;
                                return (
                                    <NavLink to={link.to === 'profile' ? `/profile/${userInfo._id}` : link.to === 'home' ? '/' : link.to} key={linkIndex}>
                                        <div className='flex items-center justify-center text-n-5 text-2xl mt-6 mx-2 py-4 rounded-lg hover:bg-n-8/10'>
                                            {Icon && <Icon />}
                                        </div>
                                    </NavLink>
                                );
                            })}
                        </div>
                    ))}
                </div>
            )}
        </div>
        {!isActive && (
            <div className='fixed w-full bottom-[0] lg:hidden bg-n-1 py-2'>
                <div className='flex items-center justify-evenly py-2 '>
                    <div onClick={toggleSidebar}>
                    <MenuSvg openNavigation={isActive} />
                    </div>
                    <Link to='/'>
                        <IoHomeOutline style={{color: 'black'}} size={20}/>
                    </Link>
                    <Link to='/profile/explore'>
                        <MdOutlineExplore style={{color: 'black'}} size={25}/>
                    </Link>
                    <Link to={`/profile/${userInfo._id}`}>
                        <FaRegUser style={{color: 'black'}} size={20}/>
                    </Link>
                    <Link to='/'>
                        <LuPlusCircle style={{color: 'black'}} size={20}/>
                    </Link>
                </div>  
            </div>
        )}
        </div>
    );
};

export default Sidebar;
