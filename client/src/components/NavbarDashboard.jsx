import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DarkModeIcon from '../components/DarkModeIcon'

const NavbarDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handlePostOwner = () => {
    navigate(`/profiles/${userInfo._id}`, { state: { postOwner: userInfo } });
  };

  return (
    <div className="py-2 px-5 lg:pr-10 shadow-sm dark:shadow-white/20 dark:bg-neutral-950">
      <div className="flex flex-row-reverse lg:flex-row items-center justify-between">
        <div>
          <DarkModeIcon />
        </div>
        <div className="flex justify-between">
          <button onClick={handlePostOwner}>
            <div className="flex items-center dark:hover:bg-n-1/5 hover:bg-n-8/5 px-3 py-2 rounded-full">
              <img src={userInfo.profilePic} width={35} height={35} loading="lazy" alt={`${userInfo.name}'s profile`} />
              <div className="flex flex-col items-start ml-3 text-n-8 dark:text-gray-200">
                <h3 className="text-md truncate">{userInfo.name}</h3>
                <h3 className="text-xs text-gray-500 truncate">{userInfo.email}</h3>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;
