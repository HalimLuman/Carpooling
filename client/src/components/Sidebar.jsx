import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { sidebar } from '../constants';

const Sidebar = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const handlePostOwner = () => {
        navigate(`/profiles/${userInfo._id}`, { state: { postOwner: userInfo } });
    };
    return (
        <div className='h-full m-2 mt-5 rounded-xl bg-n-1 dark:bg-[#1A202C] dark:lg:bg-transparent lg:bg-transparent z-10 w-full lg:w-[250px] 2xl:w-[350px] pb-10 xl:pb-0 xl:px-2 mb-20 lg:mb-0'>
            <div className='flex-col items-center w-full lg:w-full pb-10 xl:pb-0 py-2'>
                <button onClick={handlePostOwner} className='my-3 w-full'>
                    <div className='px-4 lg:px-1 xl:px-2 mx-1'>
                        <div className="flex items-center justify-start border dark:border-gray-700 hover:shadow text-black dark:text-gray-200 cursor-pointer px-4 py-2 rounded-lg bg-n-1 dark:bg-gray-800 w-full mt-3 lg:mt-0">
                            <FaUserCircle size={25} />
                            <div className='overflow-hidden flex flex-col items-start'>
                                <h3 className="ml-3 h6">{userInfo.name}</h3>
                                <h3 className="ml-3 text-xs">{userInfo.email}</h3>
                            </div>
                        </div>
                    </div>
                </button>
                <div className='px-2 self-start w-full'>
                    {sidebar.map((menu, index) => (
                        <div key={index}>
                            {index > 0 && <hr className='w-[95%] mx-auto border-gray-300 dark:border-gray-600' />}             
                            <div className='pt-1'>
                                {menu.links.map((link, linkIndex) => (
                                    <NavLink
                                        to={link.name === 'Profile' ? `/profiles/${userInfo._id}` : link.to}
                                        key={linkIndex}
                                        className='flex items-center py-3 mt-1 lg:my-2 rounded-md text-n-5 dark:text-gray-300 text-base hover:bg-n-8/10 dark:hover:bg-gray-700 px-3 transition-colors duration-300'
                                    >
                                        {link.icon && <link.icon className='p-1 rounded-md' size={33} />}
                                        <span className='ml-4 text-sm font-bold'>{link.name}</span>
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
