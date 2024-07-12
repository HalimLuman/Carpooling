import React, { useState } from 'react'
import { CiCirclePlus, CiLogout, CiMap, CiRollingSuitcase, CiSettings, CiUser } from 'react-icons/ci'
import { IoIosHelpCircleOutline, IoIosNotificationsOutline } from 'react-icons/io'
import DarkModeToggle from '../DarkModeToogle'
import { Link, useNavigate } from 'react-router-dom'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { BsCoin } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../../slices/usersApiSlice'
import { logout } from '../../slices/authSlice'
import { toast } from 'react-toastify'
import { CiChat2 } from "react-icons/ci";

const lngs = {
    en: { nativeName: "English" },
    mk: { nativeName: "Macedonian" },
    al: { nativeName: "Albanian" },
    tr: { nativeName: "Turkish" },
};

const NavbarUser = ({ userInfo, openProfile }) => {
    const { t } = useTranslation();
    const [dropdown, setDropdown] = useState(openProfile);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");
            toast.success("Logged out successfully", {
                autoClose: 1500,
                pauseOnHover: false,
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleGoToProfile = () => {
        navigate(`/profiles/${userInfo._id}`, { state: { postOwner: userInfo } });
    }
    return (
        <div className="flex items-center">
            <Link to="/account/payments" className="mx-2">
                <div className="flex items-center rounded-lg bg-green-600 hover:bg-green-700 px-2 md:px-3 py-2 space-x-2 cursor-pointer">
                    <BsCoin className="text-n-1 text-xl lg:text-2xl" />
                    <span className="text-n-1 font-semibold">{userInfo.tokens}</span>
                </div>
            </Link>
            <div className="flex items-center ml-auto">
                <div className="relative">
                    <div
                        className="flex items-center justify-center border dark:border-neutral-700 hover:shadow dark:hover:shadow-white/30 text-black cursor-pointer px-2 py-2 rounded-full"
                        onClick={() => setDropdown(!dropdown)}
                    >
                        {/* <FaUserCircle size={20} className="dark:text-n-1" /> */}
                        <img src={userInfo.profilePic} width={30}/>
                        <RiArrowDropDownLine size={30} className={`${dropdown ? "transform rotate-180" : ""} dark:text-n-1`} />
                    </div>
                    {dropdown && (
                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg">
                            <div className="flex flex-col">
                                <div className="pt-2">
                                    <button
                                        onClick={handleGoToProfile}
                                        className="w-full flex items-center px-4 py-3 text-n-8 dark:text-n-1 hover:bg-gray-100 dark:hover:bg-n-1/10"
                                    >
                                        <CiUser size={22} />
                                        <span className="ml-3">{t('GENERAL.Navbar.profile')}</span>
                                    </button>
                                    <Link
                                        to="/live-chat"
                                        className="flex items-center px-4 py-3 text-n-8 dark:text-n-1 hover:bg-gray-100 dark:hover:bg-n-1/10"
                                    >
                                        <CiChat2 size={22} />
                                        <span className="ml-3">{t('GENERAL.Navbar.messages')}</span>
                                    </Link>
                                </div>
                                <hr className="border-gray-200 dark:border-gray-600 transition duration-300" />
                                <div>
                                    <Link
                                        to="/explore"
                                        className="flex items-center px-4 py-3 text-n-8 dark:text-n-1 hover:bg-gray-100 dark:hover:bg-n-1/10"
                                    >
                                        <CiMap size={22} />
                                        <span className="ml-3">{t('GENERAL.Navbar.explore')}</span>
                                    </Link>
                                    <Link
                                        to="/dashboard/create-post"
                                        className="flex items-center px-4 py-3 text-n-8 dark:text-n-1 hover:bg-gray-100 dark:hover:bg-n-1/10"
                                    >
                                        <CiCirclePlus size={22} />
                                        <span className="ml-3">{t('GENERAL.Navbar.create')}</span>
                                    </Link>
                                    <Link
                                        to="/dashboard/history"
                                        className="flex items-center px-4 py-3 text-n-8 dark:text-n-1 hover:bg-gray-100 dark:hover:bg-n-1/10"
                                    >
                                        <CiRollingSuitcase size={22} />
                                        <span className="ml-3">{t('GENERAL.Navbar.travels')}</span>
                                    </Link>
                                </div>
                                <hr className="border-gray-200 dark:border-gray-600 transition duration-300" />
                                <div>
                                    <Link
                                        to='/account'
                                        className="flex items-center px-4 py-3 text-n-8 dark:text-n-1 hover:bg-gray-100 dark:hover:bg-n-1/10"
                                    >
                                        <CiUser size={22} />
                                        <span className="ml-3">{t('GENERAL.Navbar.account')}</span>
                                    </Link>
                                    <Link
                                        to="/account/settings"
                                        className="flex items-center px-4 py-3 text-n-8 dark:text-n-1 hover:bg-gray-100 dark:hover:bg-n-1/10"
                                    >
                                        <CiSettings size={22} />
                                        <span className="ml-3">{t('GENERAL.Navbar.settings')}</span>
                                    </Link>
                                </div>
                                <hr className="border-gray-200 dark:border-gray-600 transition duration-300" />
                                <div className="pb-2">
                                    <DarkModeToggle />
                                    <Link
                                        to="/support"
                                        className="flex items-center px-4 py-3 text-n-8 dark:text-n-1 hover:bg-gray-100 dark:hover:bg-n-1/10"
                                    >
                                        <IoIosHelpCircleOutline size={22} />
                                        <span className="ml-3">{t('GENERAL.Navbar.support')}</span>
                                    </Link>
                                    <button
                                        onClick={logoutHandler}
                                        className="flex items-center w-full px-4 py-3 text-n-8 dark:text-n-1 hover:bg-gray-100 dark:hover:bg-n-1/10"
                                    >
                                        <CiLogout size={22} />
                                        <span className="ml-3">{t('GENERAL.Navbar.logout')}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NavbarUser
