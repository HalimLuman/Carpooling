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
      <div className="pt-[1rem] lg:pt-[4rem] overflow-hidden">
        <Hero />
        <Roadmap />
        <Benefits />
      </div>

      <ButtonGradient />
      <div className="border-t">
        <Footer />
      </div>
    </>
  );
};

export default App;