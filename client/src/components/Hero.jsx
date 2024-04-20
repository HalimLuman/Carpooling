import { useRef } from "react";
import Button from "./Button";
import Section from "./Section";
import { BottomLine } from "./design/Hero";

const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section className="pt-[12rem] -mt-[5.25rem] pb-[3rem]" customPaddings id="hero">
      <div className="container relative" ref={parallaxRef}>
        <div className="max-w-[62rem] mx-auto text-center mb-[3em] md:mb-20 lg:mb-[3rem]">
          <h1 className="h1 mb-6 text-n-7">Pooling Resources for Accessible and Affordable Travel Adventures</h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-6 lg:mb-8">Join our carpool community for eco-friendly, cost-effective travel options in North Macedonia.</p>
          <div className="w-full h-12 rounded-xl mb-10 border flex">
            <div className="w-[22.5%] h-[70%] border-r text-n-11 flex items-center  ml-4 my-auto justify-start py-2">From</div>
            <div className="w-[22.5%] h-[70%] border-r text-n-11 flex items-center  ml-4 my-auto justify-start py-2">To</div>
            <div className="w-[22.5%] h-[70%] border-r text-n-11 flex items-center  ml-4 my-auto justify-start py-2">Date</div>
            <div className="w-[22.5%] h-[70%] border-r text-n-11 flex items-center  ml-4 my-auto justify-start py-2">Passengers</div>
            <div className="w-[8%] flex items-center justify-center text-n-1 rounded-r-lg bg-amber-600">Search</div>
          </div>
          <Button href="/pricing" className="text-n-8 border-n-6 hover:text-amber-600">Get started</Button>
        </div>
      </div>
      <BottomLine />
    </Section>
  );
};

export default Hero;