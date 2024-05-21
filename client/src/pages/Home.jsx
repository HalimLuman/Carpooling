import ButtonGradient from "../assets/svg/ButtonGradient";
import Benefits from "../components/home-components/Benefits";
import Footer from "../components/Footer";
import Header from "../components/NavbarMain";
import Hero from "../components/home-components/Hero";
import Roadmap from "../components/home-components/Roadmap";

const App = () => {
  return (
    <>
    <Header position={'fixed'} padding={6}/>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Hero />
        <Roadmap />
        <Benefits />
      </div>

      <ButtonGradient />
    <Footer />
    </>
  );
};

export default App;