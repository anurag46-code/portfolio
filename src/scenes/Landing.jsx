import React from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { motion } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";
import SocialMediaIcons from "../components/SocialMediaIcons";
import Example from "../components/BubbleText";

const Landing = ({ setSelectedPage }) => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  return (
    <section
      id="home"
      className="md:flex md:justify-between md:items-center md:h-full
    gap-16 py-10"
    >
      <div className="md:order-2 flex justify-center basis-3/5 z-10 mt-16 md:mt-32">
        {isAboveMediumScreens ? (
          <div
            className="relative z-0 ml-20 before:absolute before:-top-20 before:-left-20 before:rounded-t-[400px]
                before:w-full before:max-w-[400px] before:h-full before:border-2 before:border-blue before:z-[-1]"
          >
            <img
              alt="profile"
              className="hover:filter hover:saturate-200 transition duration-500 z-10 w-full
                    max-w-[400px] md:max-w-[400px] max-h-[600px] rounded-t-full filter saturate-80 "
              src="assets/profile-image.jpeg"
            />
          </div>
        ) : (
          <div
            className="relative z-0 ml-18 before:absolute before:-top-10 before:-left-10 before:rounded-t-[400px]
                before:w-full before:max-w-[400px] before:h-full before:border-2 before:border-blue before:z-[-1]"
          >
            <img
              alt="profile"
              className="hover:filter hover:saturate-200 transition duration-500 z-10 w-full
                    max-w-[400px] md:max-w-[400px] max-h-[600px] rounded-t-full filter saturate-80 "
              src="assets/profile-image.jpeg"
            />
          </div>
        )}
      </div>
      {/* main section */}
      <div className="z-30 basis-2/5 mt-12 md:mt-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <p className="text-4xl font-playfair z-10 text-center md:text-start">
            <Example text="Anurag" /> {""}
            <span
              className="xs:relative xs:text-deep-blue xs:font-semibold z-20 xs:before:content-brush
              before:absolute before:-left-[25px] before:-top-[90px] before:z-[-1]"
            >
              Mundada
            </span>
          </p>

          <p className="mt-14 mb-7 text-sm text-center md:text-start">
            "Web developer and DSA enthusiast crafting efficient digital
            solutions. Passionate about code elegance and algorithmic precision
            for seamless user experiences."
          </p>
        </motion.div>

        <motion.div
          className="flex mt-5 justify-center md:justify-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <AnchorLink
            className="bg-gradient-rainblue text-deep-blue rounded-sm px-7 py-3 font-semibold
                hover:bg-blue hover:text-white transition duration-500"
            onClick={() => setSelectedPage("contact")}
            href="#contact"
          >
            Contact Me
          </AnchorLink>

          <a
            className="rounded-r-sm bg-gradient-rainblue py-0.5 pr-0.5"
            // onClick={() => setSelectedPage("contact")}
            href="https://drive.google.com/file/d/1mUAb6CvwzocODW9_vcva9SRNU1R9xHVA/view?usp=drive_link"
            download
            target="_blank"
            rel="noreferrer"
          >
            <div
              className="bg-deep-blue hover:text-blue transition duration-500 w-full h-full flex items-center
                    justify-center font-playfair  px-10"
            >
              Resume
              <img src="./assets/arrow.svg" alt="arrow" className=" ml-[5px] mt-[2px] h-4 w-4" />
            </div>

          </a>
        </motion.div>

        <motion.div
          className="flex mt-5 justify-center md:justify-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <SocialMediaIcons />
        </motion.div>
      </div>
    </section>
  );
};

export default Landing;
