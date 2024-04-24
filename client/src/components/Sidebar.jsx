import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { sidebar } from '../constants';
import { Link, NavLink } from 'react-router-dom';
import MenuSvg from '../assets/svg/MenuSvg';
import { MdKeyboardArrowRight } from "react-icons/md";

const Sidebar = () => {
    const [isActive, setIsActive] = useState(true);
    const { userInfo } = useSelector((state) => state.auth);

    const toggleSidebar = () => {
        setIsActive(!isActive);
    };

    return (
        <>
        <div className={`absolute lg:static h-screen bg-n-1 ${isActive ? 'md:w-[300px] xl:w-[350px]' : 'hidden lg:block lg:w-[75px]'} shadow-lg`}>
            <div className={`flex items-center p-5 px-6 ${isActive ? 'justify-between' : 'justify-center'}`}>
                {isActive && <h1 className='text-n-8 h6'>TRAVEL</h1>}
                <button onClick={toggleSidebar} className='p-1'>
                    <MenuSvg openNavigation={isActive} />
                </button>
            </div>
            {isActive ? (
                <>
                    <div className='ml-3'>
                        {sidebar.map((menu, index) => (
                            <div className='px-5 py-7' key={index}>
                                {isActive && <h2 className='text-sm font-bold text-n-8 tracking-wider'>{menu.title}</h2>}
                                <div className='pt-1'>
                                    {menu.links.map((link, linkIndex) => {
                                        const Icon = link.icon;
                                        return (
                                            <NavLink to={link.to === 'Profile' ? `/profile/${userInfo._id}` : link.to === 'home' ? '/' : link.to} key={linkIndex}>
                                                <div className='flex items-center py-3 px-3 mt-2 rounded-md text-n-5 text-base hover:bg-n-8/10'>
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
                    <div className='bg-amber-600 mx-5 xl:mt-10 text-center py-6 px-2 rounded-lg flex flex-col justify-between'>
                        <h3 className='text-base tracking-wider font-bold'>Help Center</h3>
                        <p className='my-4 mx-3 text-sm'>Having trouble in Travel, contact us for more questions</p>
                        <Link className='bg-n-1 text-amber-800 px-4 py-2 mx-5 rounded-md hover:bg-amber-600 border hover:border-n-1 hover:text-n-1' to='/'>Go to help center</Link>
                    </div>
                </>
            ) : (
                <div className='mt-15'>
                    {sidebar.map((menu, index) => (
                        <div key={index}>
                            {menu.links.map((link, linkIndex) => {
                                const Icon = link.icon;
                                return (
                                    <NavLink to='#' key={linkIndex}>
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
            <div className='absolute top-[50%] right-0 xl:hidden' onClick={toggleSidebar}>
                <MdKeyboardArrowRight size={40} style={{ color: 'grey' }} />
            </div>  
        )}
        </>
    );
};

export default Sidebar;
