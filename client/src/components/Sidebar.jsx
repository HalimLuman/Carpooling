import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { sidebar } from "../constants";
import { fullLogo2Black, fullLogo2White } from "../assets";
import { CiMenuBurger } from "react-icons/ci";
import { useTranslation } from "react-i18next";

const Sidebar = ({ handleNavigation, openNavigation, handleSidebarOpen, sidebarOpen }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  return (
    <div className={`fixed lg:relative top-0 left-0 lg:left-auto min-h-screen bg-n-1 dark:bg-neutral-950 z-1 shadow dark:shadow-white/20 transform lg:transform-none transition-transform duration-100 ${openNavigation ? "translate-x-0" : "-translate-x-full"} ${sidebarOpen ? "w-full lg:w-[250px] 2xl:w-[300px]" : "w-[80px]"}`}>
      <div className="flex flex-col items-center w-full pb-10 py-2">
        <div className={`w-[85%] my-3 mx-auto flex items-center ${sidebarOpen ? "justify-between" : "justify-center"}`}>
        <a href="/">
            <div className="hidden dark:block">
              <img src={sidebarOpen ? fullLogo2White : null} width={sidebarOpen ? 130 : 0} alt="Travel" />
            </div>
            <div className="block dark:hidden">
              <img src={sidebarOpen ? fullLogo2Black : null} width={sidebarOpen ? 130 : 0} alt="Travel" />
            </div>
          </a>
          <button onClick={handleSidebarOpen} className="hover:bg-n-8/5 dark:hover:bg-n-1/5 p-2 rounded-md hidden lg:block">
            <CiMenuBurger size={17} className="text-n-8 dark:text-n-1" />
          </button>
        </div>
        <div className="px-2 self-start w-[95%] mx-auto">
          {sidebar.map((menu, index) => (
            <div key={index}>
              {index > 0 && <hr className="w-[90%] mx-auto border-gray-200 dark:border-gray-600" />}
              <div className="py-1 2xl:py-2">
                {menu.links.map((link, linkIndex) => (
                  <NavLink to={link.name === "Profile" ? `/profiles/${userInfo._id}` : link.to} key={linkIndex} className={`flex items-center ${sidebarOpen ? "justify-start" : "justify-center"} py-4 lg:py-2 2xl:py-3 mt-1 lg:my-2 rounded-md text-n-5 dark:text-gray-300 text-base hover:bg-n-8/10 dark:hover:bg-neutral-700/30 px-3`} onClick={handleNavigation}>
                    {link.icon && <link.icon className="p-1 rounded-md text-[1.75rem] 2xl:text-[2rem]" />}
                    {sidebarOpen && <span className="ml-4 text-lg 2xl:text-base lg:text-sm text-n-8 dark:text-n-1">{t(`GENERAL.Sidebar.${link.name}`)}</span>}
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
