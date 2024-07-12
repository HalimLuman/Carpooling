import React from 'react';
import NavbarSettings from '../../components/NavbarSettings';
import Footer from '../../components/Footer';
import { Link, Outlet } from 'react-router-dom';
import { CiCirclePlus, CiHome, CiSearch, CiSettings, CiUser } from 'react-icons/ci';
import { useSelector } from 'react-redux';

const AccountLayout = () => {
    const {userInfo} = useSelector((state) => state.auth)
    return (
        <>
            <NavbarSettings />
            <div className='mt-[4rem] dark:bg-neutral-950 text-white'>
                <Outlet/>
            </div>
            <div className='border-t border-stroke-1/20 dark:border-neutral-800'>
                <Footer />
            </div>
            {/* <div className='xl:hidden'>
            <div className='w-full border-t dark:border-neutral-700 xl:hidden bottom-0 fixed z-10 bg-n-1 dark:bg-neutral-900'>
                <div className="flex justify-around items-center pt-4 pb-3 px-1">
                    <Link to="/" className="text-n-8 dark:text-n-1 flex flex-col items-center justify-center w-[19%]" aria-label="Home">
                        <CiHome className='dark:text-[#d1d5db]' size={27} />
                        <span className="text-[0.65rem]">Home</span>
                    </Link>
                    <Link to="/my-travels" className="text-n-8 dark:text-n-1 flex flex-col items-center justify-center w-[19%]" aria-label="Explore">
                        <CiSearch className='dark:text-[#d1d5db]' size={27} />
                        <span className="text-[0.65rem]">Explore</span>
                    </Link>
                    <Link to="/create" className="text-n-8 dark:text-n-1 flex flex-col items-center justify-center w-[19%]" aria-label="Create">
                        <CiCirclePlus className='dark:text-[#d1d5db]' size={27} />
                        <span className="text-[0.65rem]">Create</span>
                    </Link>
                    <Link to={`/profiles/${userInfo._id}`} className="text-n-8 dark:text-n-1 flex flex-col items-center justify-center w-[19%]" aria-label="Profile">
                        <CiUser className='dark:text-[#d1d5db]' size={27} />
                        <span className="text-[0.65rem]">Profile</span>
                    </Link>
                    <Link to="/settings" className="text-n-8 dark:text-n-1 flex flex-col items-center justify-center w-[19%]" aria-label="Settings">
                        <CiSettings className='dark:text-[#d1d5db]' size={27} />
                        <span className="text-[0.65rem]">Settings</span>
                    </Link>
                </div>
            </div>

            </div> */}
        </>
    );
};

export default AccountLayout;
