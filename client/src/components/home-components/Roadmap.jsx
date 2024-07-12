import React from "react";
import { roadmap } from "../../constants";
import { grid } from "../../assets";
import Section from "../design/Section";
import Heading from "../design/Heading";
import { useTranslation } from "react-i18next";

const Roadmap = () => {
  const { t } = useTranslation();

  return (
    <Section className="overflow-hidden dark:bg-neutral-950" id="roadmap">
      <div className="container md:mb-[-5rem]">
        <Heading
          tag={t('HOME.Benefits.tag')}
          title={t('HOME.Benefits.header')}
          className="text-n-8 dark:text-n-1 text-center" // Adjust text color for dark mode
        />

        <div className="relative grid gap-6 md:grid-cols-2 md:gap-8 md:pb-[7rem] w-[95%] mx-auto">
          {roadmap.map((item, index) => (
            <div
              className="md:flex border border-n-2/40 rounded-[1.5rem] shadow-lg hover:shadow-xl dark:border-neutral-800"
              key={item.id}
            >
              <div className="relative p-8 rounded-[1.5rem] overflow-hidden bg-white dark:bg-neutral-900">
                <div className="absolute inset-0 flex justify-center items-center">
                  <img
                    className="w-full opacity-10"
                    src={grid}
                    alt="Grid background"
                  />
                </div>
                <div className="relative z-10">
                  <div className="mb-10 flex justify-center">
                    <img
                      className="w-32 h-32 object-contain"
                      src={item.imageUrl}
                      alt={item.title} // Provide appropriate alt text
                    />
                  </div>
                  <h4 className="h5 mb-4 text-center text-n-8 dark:text-gray-300">
                    {t(`HOME.Benefits.benefits.benefit${index + 1}.title`)}
                  </h4>
                  <p className="body-3 text-center mb-6 text-gray-700 dark:text-gray-400">
                    {t(`HOME.Benefits.benefits.benefit${index + 1}.description`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Roadmap;
