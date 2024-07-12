import React from "react";
import { benefits } from "../../constants";
import Arrow from "../../assets/svg/Arrow";
import Heading from "../design/Heading";
import Section from "../design/Section";
import { useTranslation } from "react-i18next";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Benefits = () => {
  const { t } = useTranslation();

  return (
    <Section id="features" className="dark:bg-neutral-950">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl text-n-8 mx-auto text-center dark:text-gray-300"
          title={t('HOME.Safety.header')}
          text={t('HOME.Safety.description')}
        />

        <div className="flex flex-wrap lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 2xl:gap-10 mb-10 mt-8">
          {benefits.map((item, index) => (
            <div
              className="block relative p-0.5 bg-white border border-n-2 rounded-xl shadow-lg hover:shadow-xl dark:bg-neutral-900 dark:border-neutral-800"
              key={item.id}
            >
              <div className="relative z-2 flex flex-col min-h-[20rem] p-[2.4rem] bg-white dark:bg-neutral-900 rounded-xl">
                <h5 className="h5 mb-5 text-n-8 dark:text-gray-100">{t(`HOME.Safety.safety.safety${index + 1}.title`)}</h5>
                <p className="body-2 mb-6 text-n-4 dark:text-gray-300">{t(`HOME.Safety.safety.safety${index + 1}.description`)}</p>
                <div className="flex items-center mt-auto justify-between">
                  <img src={item.iconUrl} width={48} height={48} alt={item.title} />
                  {/* <a className="flex items-center z-5 text-n-8 hover:text-sky-600 dark:hover:text-sky-600 dark:text-gray-200" href="#">
                    <p className="ml-auto font-code text-xs font-bold  uppercase tracking-wider   ">
                      {t(`HOME.Safety.link`)}
                    </p>
                    <MdOutlineKeyboardArrowRight className="text-lg ml-2"/>
                  </a> */}
                </div>
              </div>

              <div
                className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 transition-opacity duration-300 dark:from-blue-900 dark:to-blue-700"
              ></div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
