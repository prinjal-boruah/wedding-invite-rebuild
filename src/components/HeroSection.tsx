import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'easeOut' }}
      >
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/hero_bg_1776425430100.png')` }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      <div className="relative z-10 text-center text-cream flex flex-col items-center px-4 w-full max-w-4xl">
        <motion.p
          className="text-sm md:text-base uppercase tracking-[0.4em] mb-6 font-sans font-medium text-gold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
        >
          We're Getting Married
        </motion.p>

        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-script mb-8 leading-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
        >
          Aarav <span className="text-gold">&amp;</span> Ananya
        </motion.h1>

        <motion.p
          className="text-xl md:text-3xl font-serif italic font-light tracking-wide drop-shadow-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.1, ease: 'easeOut' }}
        >
          Join us to celebrate our new beginning
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cream"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={32} strokeWidth={1} className="opacity-70" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
