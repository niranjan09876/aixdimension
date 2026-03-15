import { motion } from "framer-motion";

const Hero = () => {
  // Animation variants
  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (customDelay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: customDelay,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden font-sans bg-zinc-900">
      {/* Background Wipe Animation */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 3.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 w-full h-full bg-black z-0"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white w-full px-4 -translate-y-[40px]">
        {/* Texts row */}
        <div className="flex items-baseline justify-center gap-6 whitespace-nowrap translate-y-20">

          {/* AI part */}
          <div className="flex items-baseline gap-6">
            <motion.span
              custom={0}
              variants={textVariant}
              initial="hidden"
              animate="visible"
              className="text-[5.5rem] sm:text-[8rem] md:text-[11rem] lg:text-[13rem] font-bold tracking-tight leading-none"
            >
              A
            </motion.span>
            <motion.span
              custom={0}
              variants={textVariant}
              initial="hidden"
              animate="visible"
              className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[8rem] font-bold tracking-tight leading-none"
            >
              I
            </motion.span>
          </div>

          {/* X part + underline */}
          <div className="flex flex-col items-center">
            <motion.span
              custom={0.8}
              variants={textVariant}
              initial="hidden"
              animate="visible"
              className="flex-shrink-0 text-[7rem] sm:text-[10rem] md:text-[14rem] lg:text-[16rem] font-bold leading-none text-center"
            >
              X
            </motion.span>
            {/* Decorative Line under X */}
            <motion.div
              custom={0.9}
              variants={textVariant}
              initial="hidden"
              animate="visible"
              className="w-[180px] h-[6px] bg-white rounded-[2px] mt-0 mx-auto"
            />
          </div>

          {/* DIMENSION part */}
          <div className="flex items-baseline">
            <motion.span
              custom={0.4}
              variants={textVariant}
              initial="hidden"
              animate="visible"
              className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[8rem] font-bold tracking-tight leading-none"
            >
              DIMENSION
            </motion.span>
          </div>

        </div>

        {/* Subtitle */}
        <motion.p
          custom={1.0}
          variants={textVariant}
          initial="hidden"
          animate="visible"
          className="mt-64 tracking-[0.4em] text-gray-400 text-base text-center"
        >
          Future Dimensions
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
