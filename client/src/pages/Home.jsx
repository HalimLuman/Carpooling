import ButtonGradient from "../assets/svg/ButtonGradient";
import Benefits from "../components/home-components/Benefits";
import Footer from "../components/Footer";
import Header from "../components/NavbarMain";
import Hero from "../components/home-components/Hero";
import Roadmap from "../components/home-components/Roadmap";
import { Link } from "react-router-dom";
import { CiCirclePlus, CiHome, CiSearch, CiSettings, CiUser } from "react-icons/ci";

const Home = () => {
  return (
    <>
      <Header position={'fixed'} padding={6}/>
      <div className="pt-[1rem] lg:pt-[4rem] overflow-hidden">
        <Hero />
        <Roadmap />
        <Benefits />
      </div>

      <ButtonGradient />
      <div className="border-t dark:border-gray-600 mb-[4.5rem] lg:mb-0">
        <Footer />
      </div>
      <div className='lg:hidden'>
          <div className='w-full border-t dark:border-gray-700 lg:hidden bottom-0 fixed z-10 bg-n-1 dark:bg-gray-900'>
              <div className="flex justify-around md:pt-6 md:pb-4 items-center pt-4 pb-2 px-1 text-n-8 dark:text-n-1">
                  <Link to="/" className=" flex flex-col items-center justify-center w-[19%]" aria-label="Home">
                      <CiHome className="dark:text-[#d1d5db] text-3xl md:text-5xl" />
                      <span className="text-[0.65rem]">Home</span>
                  </Link>
                  <Link to="/my-travels" className=" flex flex-col items-center justify-center w-[19%]" aria-label="Explore">
                      <CiSearch className="dark:text-[#d1d5db] text-3xl md:text-5xl" />
                      <span className="text-[0.65rem]">Explore</span>
                  </Link>
                  <Link to="/create" className=" flex flex-col items-center justify-center w-[19%]" aria-label="Create">
                      <CiCirclePlus className="dark:text-[#d1d5db] text-3xl md:text-5xl" />
                      <span className="text-[0.65rem]">Create</span>
                  </Link>
                  <Link to="/profile" className=" flex flex-col items-center justify-center w-[19%]" aria-label="Profile">
                      <CiUser className="dark:text-[#d1d5db] text-3xl md:text-5xl" />
                      <span className="text-[0.65rem]">Profile</span>
                  </Link>
                  <Link to="/settings" className=" flex flex-col items-center justify-center w-[19%]" aria-label="Settings">
                      <CiSettings className="dark:text-[#d1d5db] text-3xl md:text-5xl" />
                      <span className="text-[0.65rem]">Settings</span>
                  </Link>
              </div>
          </div>
        </div>
    </>
  );
};

export default Home;