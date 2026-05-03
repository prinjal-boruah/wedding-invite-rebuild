import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import goldCorner from '@/assets/gold-corner.png';

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax: bg moves slower, content drifts up, overlays move at varying speeds
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const frameY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const frameScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ y: bgY, scale: bgScale }}
      >
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/hero_bg_1776425430100.avif')` }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/70 pointer-events-none" />

      {/* Minimal desi gold filigree corners — top-left & top-right (parallax) */}
      <motion.img
        src={goldCorner}
        alt=""
        aria-hidden="true"
        width={1024}
        height={1024}
        className="absolute top-0 left-0 w-[280px] md:w-[380px] lg:w-[440px] h-auto pointer-events-none opacity-80 select-none"
        style={{ y: frameY }}
      />
      <motion.img
        src={goldCorner}
        alt=""
        aria-hidden="true"
        width={1024}
        height={1024}
        className="absolute top-0 right-0 w-[280px] md:w-[380px] lg:w-[440px] h-auto pointer-events-none opacity-80 select-none scale-x-[-1]"
        style={{ y: frameY }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center text-cream flex flex-col items-center px-4 w-full max-w-4xl"
        style={{ y: contentY, opacity: contentOpacity }}
      >
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
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cream z-10"
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
