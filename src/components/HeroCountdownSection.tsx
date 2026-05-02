import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroCountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('December 15, 2026 00:00:00').getTime();
    const update = () => {
      const d = targetDate - new Date().getTime();
      if (d > 0) {
        setTimeLeft({
          days: Math.floor(d / (1000 * 60 * 60 * 24)),
          hours: Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((d % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((d % (1000 * 60)) / 1000),
        });
      }
    };
    const t = setInterval(update, 1000);
    update();
    return () => clearInterval(t);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-4 md:mx-8">
      <span className="text-4xl md:text-6xl font-serif font-light text-dark-brown">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-soft-brown mt-2">{label}</span>
    </div>
  );

  return (
    <section className="relative w-full bg-cream overflow-hidden">
      {/* HERO portion */}
      <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'easeOut' }}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/images/hero_bg_1776425430100.avif')` }}
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

        <div className="relative z-10 text-center text-cream flex flex-col items-center px-4 w-full max-w-4xl -mt-16 md:-mt-24">
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

        {/* Ripped paper edge — overlays the bottom of the hero */}
        <div className="ripped-paper-edge" aria-hidden="true">
          <svg
            className="ripped-paper-svg"
            viewBox="0 0 1440 220"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="paperRough" x="0" y="0" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
                <feDisplacementMap in="SourceGraphic" scale="6" />
              </filter>
              <linearGradient id="paperFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F9F6F0" />
                <stop offset="100%" stopColor="#F2EDE2" />
              </linearGradient>
            </defs>
            {/* Torn paper shape — irregular top edge, solid bottom */}
            <path
              d="
                M0,220
                L0,90
                C40,80 70,110 110,95
                C160,75 200,120 250,100
                C310,78 360,118 420,95
                C480,72 530,115 600,90
                C670,68 720,112 790,88
                C860,66 910,108 980,85
                C1050,64 1110,105 1180,82
                C1250,62 1310,100 1370,80
                C1400,72 1420,85 1440,75
                L1440,220 Z
              "
              fill="url(#paperFill)"
              filter="url(#paperRough)"
            />
            {/* Subtle shadow line along the tear */}
            <path
              d="
                M0,90
                C40,80 70,110 110,95
                C160,75 200,120 250,100
                C310,78 360,118 420,95
                C480,72 530,115 600,90
                C670,68 720,112 790,88
                C860,66 910,108 980,85
                C1050,64 1110,105 1180,82
                C1250,62 1310,100 1370,80
                C1400,72 1420,85 1440,75
              "
              fill="none"
              stroke="rgba(80,55,30,0.18)"
              strokeWidth="1.5"
              filter="url(#paperRough)"
            />
          </svg>

          {/* Rolled paper curls on the sides */}
          <div className="paper-roll paper-roll-left" />
          <div className="paper-roll paper-roll-right" />
        </div>

        <motion.div
          className="absolute bottom-[200px] md:bottom-[240px] left-1/2 -translate-x-1/2 text-cream z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={32} strokeWidth={1} className="opacity-70" />
        </motion.div>
      </div>

      {/* COUNTDOWN portion — sits flush under the rip, on the same paper */}
      <div className="relative bg-cream pt-8 pb-24 md:pb-32 -mt-2">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <h2 className="text-sm uppercase tracking-[0.4em] text-gold font-sans font-medium mb-10">
            Save the Date
          </h2>
          <div className="flex justify-center items-center">
            <TimeUnit value={timeLeft.days} label="Days" />
            <span className="text-3xl font-light text-gold/40 -mt-8">:</span>
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <span className="text-3xl font-light text-gold/40 -mt-8 hidden md:block">:</span>
            <div className="hidden md:block"><TimeUnit value={timeLeft.minutes} label="Mins" /></div>
          </div>
          <div className="flex justify-center items-center mt-8 md:hidden">
            <TimeUnit value={timeLeft.minutes} label="Mins" />
            <span className="text-3xl font-light text-gold/40 -mt-8">:</span>
            <TimeUnit value={timeLeft.seconds} label="Secs" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroCountdownSection;
