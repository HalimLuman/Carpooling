import React from 'react';
import NavbarSettings from '../components/NavbarSettings';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { accountSettings } from '../constants';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Section from '../components/design/Section';
import { CiSearch, CiUser, CiSettings, CiHome, CiCirclePlus   } from "react-icons/ci";

const Account = () => {
    const { userInfo } = useSelector((state) => state.auth);

    return (
        <>
            <Section>
                <div className="flex flex-col items-center w-[90%] mx-auto xl:w-full">
                <div className="text-n-8 max-w-6xl w-full px-4 xl:ml-5">
                    <div className='flex items-center'>
                        <NavLink to="/" className='text-n-8 hover:text-sky-600'>Home</NavLink>
                        <MdOutlineKeyboardArrowRight className='mx-2' size={20} color='#5b5c5e'/>
                        <span> Account</span>
                    </div>
                    <h1 className="text-4xl mt-5">Account</h1>
                    <p className="text-lg mb-1 mt-2 font-thin">
                        <span className="font-bold">{userInfo.name}</span>, {userInfo.email}
                    </p>
                    <Link to="/profile" className="underline text-md font-bold">Go to profile</Link>
                </div>
                    <div className="max-w-6xl w-full mt-[3rem] px-4">
                        {accountSettings.map((menu, index) => (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" key={index}>
                                {menu.links.map((link, linkIndex) => (
                                    <Link
                                        to={link.name === 'Profile' ? `/dashboard/${userInfo._id}` : link.to}
                                        key={linkIndex}
                                        className="flex flex-col bg-white mt-1 lg:mt-2 rounded-md text-n-8 shadow-lg p-6 transition-transform transform hover:-translate-y-1 hover:shadow-xl border border-n-8/5"
                                    >
                                        {link.icon && React.createElement(link.icon, { size: 30 })}
                                        <span className="text-md font-bold mt-4 mb-2">{link.name}</span>
                                        <p className="text-sm">{link.description}</p>
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
            <div className='w-full border-t lg:hidden bottom-0 fixed z-10 bg-white'>
                <div className="flex justify-around items-center pt-2 pb-1 px-1">
                    <Link to="/" className="text-n-8 flex flex-col items-center justify-center w-[19%]">
                        <CiHome color='#5b5c5e' size={27} />
                        <span className="text-[0.65rem]">Home</span>
                    </Link>
                    <Link to="/my-travels" className="text-n-8 flex flex-col items-center justify-center w-[19%]">
                        <CiSearch color='#5b5c5e' size={27} />
                        <span className="text-[0.65rem]">Explore</span>
                    </Link>
                    
                    <Link to="/create" className="text-n-8 flex flex-col items-center justify-center w-[19%]">
                        <CiCirclePlus  color='#5b5c5e' size={27} />
                        <span className="text-[0.65rem]">Create</span>
                    </Link>
                    <Link to="/profile" className="text-n-8 flex flex-col items-center justify-center w-[19%]">
                        <CiUser color='#5b5c5e' size={27} />
                        <span className="text-[0.65rem]">Profile</span>
                    </Link>
                    <Link to="/settings" className="text-n-8 flex flex-col items-center justify-center w-[19%]">
                        <CiSettings  color='#5b5c5e' size={27} />
                        <span className="text-[0.65rem]">Settings</span>
                    </Link>
                    
                </div>
            </div>
        </>
    );
};

export default Account;
