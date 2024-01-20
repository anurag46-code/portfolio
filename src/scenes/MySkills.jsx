import React from "react";
// import useMediaQuery from "../hooks/useMediaQuery";
import { motion } from "framer-motion";
import LineGradient from "../components/LineGradient";
import SkillsMedia from "./SkillsMedia";
const MySkills = () => {
//   const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  return (
    <section id="skills" className="pt-10 pb-24 relative">
      <div className="md:flex md:justify-between md:gap-16 mt-32">
        <motion.div
         className="md:w-1/3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
            <p className="font-playfair font-semibold text-4xl mb-5 ">
                MY <span className="text-blue">SKILLS</span>
            </p>
            <LineGradient width="w-1/3" />
        </motion.div>
      </div>

      <SkillsMedia/>
    </section>
  );
};

export default MySkills;
