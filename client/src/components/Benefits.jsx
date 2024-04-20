import { benefits } from "../constants";
import Arrow from "../assets/svg/Arrow";
import ClipPath from "../assets/svg/ClipPath";
import Heading from "./Heading";
import Section from "./Section";

const Benefits = () => {
  return (
    <Section id="features">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl text-n-8"
          title="Your Safety is Our Priority"
          text="Read the guidelines below to ensure your safety"
        />

        <div className="flex flex-wrap lg:grid grid-cols-3 gap-5 2xl:gap-10 mb-10">
          {benefits.map((item) => (
            <div className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] lg:max-w-[24rem] border border-n-2 rounded-xl" key={item.id}>
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem]">
                <h5 className="h5 mb-5 text-n-8">{item.title}</h5>
                <p className="body-2 mb-6 text-n-3">{item.text}</p>
                <div className="flex items-center mt-auto justify-between">
                  <img src={item.iconUrl} width={48} height={48} alt={item.title} />
                  <a className="flex items-center z-5" href="#">
                    <p className="ml-auto font-code text-xs font-bold text-n-8 uppercase tracking-wider hover:text-amber-600">
                      Explore more
                    </p>
                    <Arrow />
                  </a>
                </div>
              </div>

              <div className="absolute inset-0.5 bg-n-8 opacity-0" style={{ clipPath: "url(#benefits)" }}></div>
              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;