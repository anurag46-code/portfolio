import Example from "../components/BubbleText";
import LineGradient from "../components/LineGradient";
import { motion } from "framer-motion";
import useMediaQuery from "../hooks/useMediaQuery";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const projectVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const Project = ({ title, name, about, link }) => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const overlayStyles = `absolute h-full w-full opacity-0 hover:opacity-90 transition duration-500
    bg-grey z-30 flex flex-col justify-center items-center text-center p-16 text-deep-blue`;
  const projectTitle = title.split(" ").join("-").toLowerCase();



  return (

    <>
    {isAboveMediumScreens ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
          <motion.div variants={projectVariant} className="relative">
            <div className={overlayStyles}>
              <p className="text-lg md:text-2xl font-playfair">{name}</p>
              <p className="mt-3 md:mt-7 text-sm md:text-base">{about}</p>
            </div>
            <img src={`../assets/${projectTitle}.png`} alt={projectTitle} className="w-full h-auto md:h-[285px]" />
          </motion.div>
        </a>
        ) : (
          
      <motion.div variants={projectVariant} className="relative">
        <div className={overlayStyles}>
          <p className="text-lg md:text-2xl font-playfair">{name}</p>
          <p className="mt-3 md:mt-7 text-sm md:text-base">{about}</p>
        </div>
        <img src={`../assets/${projectTitle}.png`} alt={projectTitle} className="w-full h-auto md:h-[285px]" />
      </motion.div>
    
        )}
    </>

    
  );
};

const Projects = () => {
  return (
    <section id="projects" className="pt-16 md:pt-48 pb-16 md:pb-48 md:p-6">
      {/* HEADINGS */}
      <motion.div
        className="md:w-3/5 mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <div>
          <p className="font-playfair font-semibold text-4xl">
            <span className="text-blue">PRO</span>JECTS
          </p>
          <div className="flex justify-center mt-5">
            <LineGradient width="w-2/3" />
          </div>
        </div>
        <p className="mt-10 mb-10 text-3xl">
          {/* <Example text="Embark"/> */}
          {" "} Embark on a Journey of {" "}
         
         <Example text="Innovation!"/>

        </p>
      </motion.div>

      {/* PROJECTS */}
      <div className="pt-16 md:pt-48 pb-16 md:pb-48">
        <motion.div
          className="sm:grid sm:grid-cols-1 md:grid-cols-2 "
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* ROW 1 */}
          <div
            className="flex justify-center text-center items-center p-10 bg-gradient-to-r from-blue
            max-w-[600px] max-h-[285px] text-2xl font-playfair font-semibold"
          >
            SLEEK USER INTERFACE
          </div>
          <Project title="Project 1" name="Conversify" about="Streamline conversations with elegance and ease. Connect seamlessly in real-time, sharing messages and media effortlessly." link="https://delicate-dragon-cc3792.netlify.app"/>
          <Project title="Project 2" name="Portfolio" about="crafted a distinguished online presence, unveiling a refined portfolio that eloquently showcases my skills and achievements" link="#" />

          {/* ROW 2 */}
          <Project title="Project 3" name="WalletWhiz" about="Master your finances with sophistication. Effortlessly manage your budget, gaining insights for refined financial decision-making." link="https://cheerful-buttercream-274813.netlify.app" />
          <Project title="Project 4" name="MeloVerse" about="Immerse in a refined audio experience. Explore, curate, and enjoy a harmonious world of music." link="https://neon-zuccutto-31e6a5.netlify.app"/>
          {/* <Project title="Project 5" /> */}

          {/* ROW 3 */}
          {/* <Project title="Project 6" /> */}
          {/* <Project title="Project 7" /> */}
          <div
            className="flex justify-center text-center items-center p-10 bg-gradient-to-l from-blue
            max-w-[600px] max-h-[285px] text-2xl font-playfair font-semibold"
          >
            GRACEFUL USER INTERACTION
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;