import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { sidebar } from "../../constants/index";
const Sidebar = ({ handleNavigation, openNavigation, handleSidebarOpen, sidebarOpen }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="lg:left-auto min-h-screen bg-n-1 dark:bg-neutral-950 z-1 shadow dark:shadow-white/20 transform lg:transform-none transition-transform duration-100 w-[80px]">
      <div className="flex flex-col h-full justify-center items-center w-full pb-10 py-2">
        <div className="px-2 self-start w-[100%] mx-auto">
          {sidebar.map((menu, index) => (
            <div key={index}>
              {index > 0 && <hr className="w-[90%] mx-auto border-gray-200 dark:border-gray-600" />}
              <div className="py-2">
                {menu.links.map((link, linkIndex) => (
                  <NavLink to={link.name === "Profile" ? `/profiles/${userInfo._id}` : link.to} key={linkIndex} className={`flex items-center ${sidebarOpen ? "justify-start" : "justify-center"} py-4 lg:py-2 mt-1 lg:my-2 rounded-md text-n-5 dark:text-gray-300 text-base hover:bg-n-8/10 dark:hover:bg-neutral-700/30 px-3`} onClick={handleNavigation}>
                    {link.icon && <link.icon className="p-1 rounded-md text-3xl my-2" />}
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
