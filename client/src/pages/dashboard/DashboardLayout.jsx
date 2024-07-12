import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar.jsx";
import { useEffect, useState } from "react";
import MenuSvg from "../../assets/svg/MenuSvg.jsx";
import MenuSvgDark from "../../assets/svg/MenuSvgDark.jsx";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { LuPlusCircle } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import NavbarDashboard from "../../components/NavbarDashboard.jsx";

const Dashboard = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : true; // Default to true if no saved value
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  const handleSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePostOwner = () => {
    navigate(`/profiles/${userInfo._id}`, { state: { postOwner: userInfo } });
  };

  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="bg-n-1 dark:bg-neutral-950 min-h-screen flex flex-col">
      <div className="flex flex-1">
      <div className="fixed z-2">

        <Sidebar handleNavigation={handleNavigation} openNavigation={openNavigation} handleSidebarOpen={handleSidebarOpen} sidebarOpen={sidebarOpen} />
      </div>
        <div className={`w-full flex flex-col transition-transform duration-100 ${openNavigation ? 'translate-x-64 lg:translate-x-0' : ''} ${sidebarOpen ? 'lg:ml-[15rem] 2xl:ml-[18rem]' : 'lg:ml-[5rem]'}`}>
          <NavbarDashboard />
          <div className={`mx-5 pb-15 lg:pb-0 `}>
            <Outlet />
          </div>
        </div>
      </div>
      <div
        className="fixed bottom-0 lg:hidden w-full bg-n-1 dark:bg-neutral-950 py-2 border-t dark:border-gray-700 z-2"
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        <div className="flex items-center justify-evenly py-2">
          <div onClick={handleNavigation} className="w-[24px] flex justify-center dark:hidden">
            <MenuSvg openNavigation={openNavigation} />
          </div>
          <div onClick={handleNavigation} className="w-[24px] justify-center hidden dark:flex">
            <MenuSvgDark openNavigation={openNavigation} />
          </div>
          <NavLink to="/">
            <IoHomeOutline className="text-n-8 dark:text-n-1 text-2xl" />
          </NavLink>
          <NavLink to="/explore">
            <MdOutlineExplore className="text-n-8 dark:text-n-1 text-3xl" />
          </NavLink>
          <button onClick={handlePostOwner}>
            <FaRegUser className="text-n-8 dark:text-n-1 text-2xl" />
          </button>
          <NavLink to="/dashboard/create-post">
            <LuPlusCircle className="text-n-8 dark:text-n-1 text-2xl"/>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
