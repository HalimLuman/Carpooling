import React from "react";
import Section from "./design/Section";
import { socials } from "../constants";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Section className="px-0 py-10 bg-n-1 dark:bg-[#1A202C] transition duration-300">
      <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col w-[95%]">
        <p className="caption lg:block text-center lg:text-left text-n-8 dark:text-gray-300 transition duration-300">
          © {new Date().getFullYear()}. {t('HOME.Footer.rights')}
        </p>

        <ul className="flex gap-5 flex-wrap justify-center lg:justify-start">
          {socials.map((item) => (
            <li key={item.id}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-n-1 rounded-full transition-colors hover:bg-sky-600/75 dark:bg-gray-100 dark:hover:bg-sky-700 duration-300"
                title={item.title}
              >
                <img
                  src={item.iconUrl}
                  width={20}
                  height={20}
                  alt={item.title}
                  className="fill-white"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Footer;
