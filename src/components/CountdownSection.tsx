import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('December 15, 2026 00:00:00').getTime();

    const updateCountdown = () => {
      const distance = targetDate - new Date().getTime();
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();
    return () => clearInterval(timer);
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
    <section className="py-32 md:py-48 bg-cream flex flex-col items-center justify-center text-center border-y border-gold/20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <h2 className="text-sm uppercase tracking-[0.4em] text-gold font-sans font-medium mb-12">Save the Date</h2>

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
    </section>
  );
};

export default CountdownSection;
