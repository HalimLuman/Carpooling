import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useState } from "react";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { Link } from "react-router-dom";
const Header = () => {
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    setOpenNavigation(prevOpenNavigation => {
      if (!prevOpenNavigation) {
        disablePageScroll();
      } else {
        enablePageScroll();
      }
      return !prevOpenNavigation;
    });
  };

  const handleClick = () => {
    if (openNavigation) {
      enablePageScroll();
      setOpenNavigation(false);
    }
  };

  return (
    <div className={`fixed top-0 left-0 w-full z-50 border-b border-n-2 lg:bg-n-1 lg:backdrop-blur-sm ${openNavigation ? "bg-n-1" : "bg-n-1/90 backdrop-blur-sm"}`}>
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="w-[12rem] xl:mr-8 flex items-center" href="#hero">
          <img src='' width={40} height={40} alt="Brainwave" />
          <span className="ml-3 text-2xl font-semibold tracking-wider text-n-8">TRAVEL</span>
        </a>

        <nav className={`${openNavigation ? "flex" : "hidden"} fixed top-[4.7rem] left-0 right-0 bottom-0 bg-n-1 lg:static lg:flex lg:mx-auto lg:bg-transparent`}>
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a key={item.id} href={item.url} onClick={handleClick} className={`block relative font-code text-xl uppercase text-n-8 transition-colors hover:text-amber-600 ${item.onlyMobile ? "lg:hidden" : ""} px-6 py-5 md:py-6 lg:-mr-0.25 xl:text-sm lg:font-semibold lg:leading-5 lg:hover:text-amber-600 xl:px-10`}>
                {item.title}
              </a>
            ))}
          </div>
        </nav>
        <Link to='/register'>
          <h1 className="button hidden mr-8 text-n-3 transition-colors hover:text-n-8 lg:block">New account</h1>
        </Link >
        <Link to='/login'>
          <h1 className="hidden lg:flex button relative text-n-8 items-center justify-center h-11 hover:text-amber-600 border-2 rounded-lg px-5 border-n-8/70">Sign in</h1>
        </Link>

        <Button className="ml-auto lg:hidden" px="px-3" onClick={toggleNavigation}>
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;