import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import { useEffect, useState } from "react";
import MenuSvg from "../assets/svg/MenuSvg.jsx";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { LuPlusCircle } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const [openContent, setOpenContent] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : true; // Default to true if no saved value
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleNavigation = () => {
    setOpenNavigation(!openNavigation);
    setOpenContent(!openContent);
  };

  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="bg-n-8/5 dark:bg-[#1A202C]">
      <div className="flex min-h-screen lg:pb-10">
        {!openNavigation ? <Sidebar handleNavigation={handleNavigation} /> : null}

        {openContent ? (
          <div className="flex flex-col w-full mx-2 xl:mx-5 xl:px-8 xl:py-4 mt-5 bg-n-1 rounded-xl shadow mb-20">
            <Outlet className="rounded-xl" />
          </div>
        ) : (
          <div className="hidden lg:flex flex-col w-full mx-2 xl:mx-5 xl:px-8 xl:py-4 mt-5 bg-n-1 dark:bg-gray-800 rounded-xl shadow-sm shadow-white/30">
            <Outlet className="rounded-xl" />
          </div>
        )
        }
      </div>
      <div
        className="fixed bottom-0 lg:hidden w-full bg-n-1 dark:bg-[#1A202C] py-3 border-t dark:border-gray-700 z-20"
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        <div className="flex items-center justify-evenly py-2">
          <div onClick={handleNavigation} className="w-[24px] flex justify-center">
            <MenuSvg openNavigation={!openNavigation} />
          </div>
          <NavLink to="/">
            <IoHomeOutline className="text-n-8 dark:text-n-1 text-2xl" />
          </NavLink>
          <NavLink to="/explore">
            <MdOutlineExplore className="text-n-8 dark:text-n-1 text-3xl" />
          </NavLink>
          <NavLink to={`/profile/${userInfo._id}`}>
            <FaRegUser className="text-n-8 dark:text-n-1 text-2xl" />
          </NavLink>
          <NavLink to="/">
            <LuPlusCircle className="text-n-8 dark:text-n-1 text-2xl"/>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
