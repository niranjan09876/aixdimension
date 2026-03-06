import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden font-sans">
      <div className="z-10 text-center flex flex-col items-center justify-center">

        <div className="flex items-end justify-center space-x-4 md:space-x-6 mb-4">
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-widest leading-none mb-2 md:mb-4"
          >
            AI
          </motion.span>

          <div className="flex flex-col items-center justify-center relative">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: [1, 1.05, 1],
                textShadow: [
                  "0px 0px 0px rgba(255,255,255,0)",
                  "0px 0px 20px rgba(255,255,255,0.4)",
                  "0px 0px 0px rgba(255,255,255,0)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-white text-6xl md:text-8xl lg:text-[10rem] font-semibold leading-none"
            >
              X
            </motion.span>
            {/* The underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-[3px] md:h-[4px] bg-white w-[80%] absolute -bottom-2 md:-bottom-4"
            />
          </div>

          <motion.span
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-widest leading-none mb-2 md:mb-4"
          >
            DIMENSION
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 md:mt-10 text-gray-300 tracking-[0.2em] md:tracking-[0.3em] text-sm md:text-xl font-light"
        >
          Future Dimensions
        </motion.p>

      </div>
    </section>
  );
};

export default Hero;
