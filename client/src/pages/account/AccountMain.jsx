import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Section from '../../components/design/Section';
import AccountPages from '../../components/account-components/AccountPages';
import { useTranslation } from 'react-i18next';

const Account = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleGoToProfile = () => {
        navigate(`/profiles/${userInfo._id}`, { state: { postOwner: userInfo } });
    }
    console.log(userInfo);
    return (
        <Section>
            <div className="flex flex-col items-center w-[90%] mx-auto xl:w-full mb-10 lg:mb-0 min-h-[72vh]">
                <div className="text-n-8 dark:text-n-1 max-w-6xl w-full px-4 xl:ml-5">
                    <div className='flex items-center text-sm'>
                        <NavLink to="/" className=' hover:text-sky-600'>{t('ACCOUNT.Links.home')}</NavLink>
                        <MdOutlineKeyboardArrowRight className='mx-2' size={20} color='#d1d5db' />
                        <span>{t('ACCOUNT.Links.account')}</span>
                    </div>
                    <h1 className="text-4xl mt-5">{t('ACCOUNT.Title')}</h1>
                    <p className="text-lg mb-1 mt-2 font-thin">
                        <span className="font-bold">{userInfo.name}</span>, {userInfo.email}
                    </p>
                    <button onClick={handleGoToProfile} className="underline text-md font-bold text-sky-600">{t('ACCOUNT.Links.goto')}</button>
                </div>
                <AccountPages />
            </div>
        </Section>
    );
};

export default Account;
