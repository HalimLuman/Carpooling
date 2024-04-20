import { roadmap } from "../constants";
import { grid } from "../assets";
import Section from "./Section";
import Heading from "./Heading";

const Roadmap = () => (
  <Section className="overflow-hidden" id="roadmap">
    <div className="container md:mb-[-5rem]">
      <Heading tag="Benefits of using TRAVEL" title="What you will get while using TRAVEL" className='text-n-8' />

      <div className="relative grid gap-6 md:grid-cols-2 md:gap-6 md:pb-[7rem] w-[95%] mx-auto">
        {roadmap.map((item) => {
          const status = item.status === "done" ? "Done" : "In progress";

          return (
            <div className="md:flex border border-n-2/40 rounded-[1.5rem]" key={item.id}>
              <div className="relative p-8 rounded-[1.5rem] overflow-hidden xl:p-8">
                <div className="absolute top-0 left-0 max-w-full">
                  <img className="w-full opacity-50" src={grid} width={300} height={150} alt="Grid" />
                </div>
                <div className="relative z-1">
                  <div className="flex items-center justify-between max-w-[27rem] mb-8 md:mb-20"></div>

                  <div className="mb-10 -my-20 -mx-15">
                    <img className="mx-auto" src={item.imageUrl} width={150} height={300} alt={item.title} />
                  </div>
                  <h4 className="h5 mb-4 -my-5 text-center text-n-8">{item.title}</h4>
                  <p className="body-3 text-n-4 text-center">{item.text}</p>
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