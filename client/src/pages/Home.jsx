import ButtonGradient from "../assets/svg/ButtonGradient";
import Benefits from "../components/Benefits";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Roadmap from "../components/Roadmap";

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