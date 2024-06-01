import { roadmap } from "../../constants";
import { grid } from "../../assets";
import Section from "../design/Section";
import Heading from "../design/Heading";

const Roadmap = () => (
  <Section className="overflow-hidden" id="roadmap">
    <div className="container md:mb-[-5rem]">
      <Heading
        tag="Benefits of using TRAVEL"
        title="What you will get while using TRAVEL"
        className="text-n-8"
      />

      <div className="relative grid gap-6 md:grid-cols-2 md:gap-8 md:pb-[7rem] w-[95%] mx-auto">
        {roadmap.map((item) => {

          return (
            <div
              className="md:flex border border-n-2/40 rounded-[1.5rem] shadow-lg hover:shadow-xl transition-shadow duration-300"
              key={item.id}
            >
              <div className="relative p-8 rounded-[1.5rem] overflow-hidden bg-white">
                <div className="absolute inset-0 flex justify-center items-center">
                  <img
                    className="w-full opacity-10"
                    src={grid}
                    alt="Grid"
                  />
                </div>
                <div className="relative z-10">
                  <div className="mb-10 flex justify-center">
                    <img
                      className="w-32 h-32 object-contain"
                      src={item.imageUrl}
                      alt={item.title}
                    />
                  </div>
                  <h4 className="h5 mb-4 text-center text-n-8">{item.title}</h4>
                  <p className="body-3 text-n-4 text-center mb-6">{item.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </Section>
);

export default Roadmap;
