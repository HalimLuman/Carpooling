import { useRef } from "react";
import Button from "../design/Button";
import Section from "../design/Section";
import { BottomLine } from "../design/Hero";

const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section className="py-[14rem] -mt-[5.25rem] pb-[6rem]" customPaddings id="hero">
      <div className="container relative" ref={parallaxRef}>
        <div className="max-w-[62rem] mx-auto text-center mb-[3em] md:mb-20 lg:mb-[3rem]">
          <h1 className="h1 mb-6 text-n-7">Pooling Resources for Accessible and Affordable Travel Adventures</h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-6 lg:mb-8">Join our carpool community for eco-friendly, cost-effective travel options in North Macedonia.</p>
          <Button href="/pricing" className="text-n-8 border-n-6 hover:text-amber-600">Get started</Button>
        </div>
      </div>
      <BottomLine />
    </Section>
  );
};

export default Hero;