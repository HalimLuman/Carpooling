import Button from "../design/Button";
import Section from "../design/Section";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <Section className="text-n-8 dark:text-n-1 dark:bg-gray-900" customPaddings id="hero">
      <div className="container relative pt-[10rem] pb-[4rem]">
        <div className="max-w-[62rem] mx-auto text-center mb-[3em] md:mb-20 lg:mb-[3rem]">
          <h1 className="h1 text-5xl md:text-6xl font-bold mb-8">{t('HOME.Hero.header')}</h1>
          <p className="body-1 text-n-8/70 dark:text-n-1/70 max-w-3xl mx-auto mb-10 ">{t('HOME.Hero.description')}</p>
          <Button href="/explore" className="border border-transparent bg-sky-600 hover:bg-sky-700 py-3 px-8 rounded-full hover:shadow-lg ease-in-out hover:text-n-1">
            {t('HOME.Hero.button')}
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
