import React from "react";
import Section from "./design/Section";
import { socials } from "../constants";

const Footer = () => {
  return (
    <Section className="!px-0 !py-10">
      <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col w-[95%]">
        <p className="caption text-n-4 lg:block">
          © {new Date().getFullYear()}. All rights reserved.
        </p>

        <ul className="flex gap-5 flex-wrap">
          {socials.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-n-1 rounded-full transition-colors hover:bg-sky-600/75"
            >
              <img src={item.iconUrl} width={20} height={20} alt={item.title} className="fill: white"/>
            </a>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Footer;