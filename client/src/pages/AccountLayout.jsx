import React from 'react';
import NavbarSettings from '../components/NavbarSettings';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const AccountLayout = () => {
    return (
        <>
            <NavbarSettings />
            <div className='mt-[5rem]'>

            <Outlet />
            </div>
            <div className='border-t'>
            <Footer />
            </div>
        </>
    );
};

export default AccountLayout;
