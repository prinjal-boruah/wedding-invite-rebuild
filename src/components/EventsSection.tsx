import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';

type WeddingEvent = {
  name: string;
  date: string;
  time: string;
  venue: string;
  description: string;
};

const event: WeddingEvent = {
  name: 'Wedding',
  date: 'December 15, 2026',
  time: '7:00 PM',
  venue: 'The Grand Palace, Udaipur',
  description: 'The grand celebration of our union. Be prepared for live music, fine dining, and memories that last forever.',
};

/* Vertical wooden rod (used as left/right handle for the sideways scroll). */
const WoodenHandleVertical = ({ id = 'default' }: { id?: string }) => (
  <div className="scroll-handle-v">
    <svg width="44" height="100%" viewBox="0 0 44 360" preserveAspectRatio="none" style={{ display: 'block', height: '100%', overflow: 'visible' }}>
      <defs>
        <linearGradient id={`wgv-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7A5235" />
          <stop offset="20%" stopColor="#5C3A22" />
          <stop offset="50%" stopColor="#4A2E18" />
          <stop offset="80%" stopColor="#5C3A22" />
          <stop offset="100%" stopColor="#3D2415" />
        </linearGradient>
        <linearGradient id={`whlv-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="30%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
        </linearGradient>
        <linearGradient id={`fnv-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6B4427" />
          <stop offset="25%" stopColor="#4A2E18" />
          <stop offset="50%" stopColor="#3D2415" />
          <stop offset="75%" stopColor="#4A2E18" />
          <stop offset="100%" stopColor="#2E1B0E" />
        </linearGradient>
        <radialGradient id={`fhlv-${id}`} cx="0.3" cy="0.4" r="0.5">
          <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* Main rod (vertical) */}
      <rect x="14" y="34" width="16" height="292" rx="2" fill={`url(#wgv-${id})`} />
      <rect x="14" y="34" width="16" height="292" rx="2" fill={`url(#whlv-${id})`} />

      {/* Top finial */}
      <ellipse cx="22" cy="34" rx="15" ry="4" fill={`url(#fnv-${id})`} />
      <ellipse cx="22" cy="22" rx="22" ry="11" fill={`url(#fnv-${id})`} />
      <ellipse cx="22" cy="13" rx="13" ry="5" fill={`url(#fnv-${id})`} />
      <ellipse cx="22" cy="9" rx="10" ry="4" fill={`url(#fnv-${id})`} />
      <ellipse cx="22" cy="6" rx="6" ry="2" fill={`url(#fnv-${id})`} />
      <ellipse cx="22" cy="22" rx="22" ry="11" fill={`url(#fhlv-${id})`} />
      <ellipse cx="22" cy="13" rx="13" ry="5" fill={`url(#fhlv-${id})`} />

      {/* Bottom finial */}
      <ellipse cx="22" cy="326" rx="15" ry="4" fill={`url(#fnv-${id})`} />
      <ellipse cx="22" cy="338" rx="22" ry="11" fill={`url(#fnv-${id})`} />
      <ellipse cx="22" cy="347" rx="13" ry="5" fill={`url(#fnv-${id})`} />
      <ellipse cx="22" cy="351" rx="10" ry="4" fill={`url(#fnv-${id})`} />
      <ellipse cx="22" cy="354" rx="6" ry="2" fill={`url(#fnv-${id})`} />
      <ellipse cx="22" cy="338" rx="22" ry="11" fill={`url(#fhlv-${id})`} />
      <ellipse cx="22" cy="347" rx="13" ry="5" fill={`url(#fhlv-${id})`} />

      {/* Grain lines */}
      <line x1="18" y1="34" x2="18" y2="326" stroke="rgba(30,15,5,0.22)" strokeWidth="1.5" />
      <line x1="26" y1="34" x2="26" y2="326" stroke="rgba(30,15,5,0.14)" strokeWidth="1" />
    </svg>
  </div>
);

const SidewaysInvitation = ({ progress }: { progress: MotionValue<number> }) => {
  // Paper region width grows 0 → 732px (matches .paper-inner-h max width).
  const paperWidth = useTransform(progress, [0, 1], [0, 732]);
  const contentOpacity = useTransform(progress, [0.7, 1], [0, 1]);
  const contentX = useTransform(progress, [0.7, 1], [20, 0]);

  return (
    <div className="scroll-invitation-h">
      {/* Left handle + paper sleeve wrapping it */}
      <div className="scroll-handle-wrap">
        <WoodenHandleVertical id="left" />
        <div className="paper-sleeve paper-sleeve-left" aria-hidden="true" />
      </div>

      {/* Paper region — width animates 0 → full */}
      <motion.div className="paper-region-h" style={{ width: paperWidth }}>
        <div className="paper-inner-h">
          {/* Soft top/bottom highlight to mimic original parchment look */}
          <div className="paper-h-overlay" />

          <motion.div className="paper-content-h" style={{ opacity: contentOpacity, x: contentX }}>
            <div className="scroll-header-ornament">❦</div>
            <p className="scroll-invitation-line">You are cordially invited to</p>

            <div className="scroll-wreath-container">
              <img src="/images/floral_wreath.png" alt="Floral wreath" className="scroll-wreath-img" />
              <div className="scroll-event-name-overlay">
                <h3 className="scroll-event-name">{event.name}</h3>
              </div>
            </div>

            <p className="scroll-description">{event.description}</p>

            <div className="scroll-divider">
              <span>✦</span>
              <div className="divider-line" />
              <span>✦</span>
            </div>

            <div className="scroll-details">
              <div className="scroll-detail-row">
                <Calendar size={15} strokeWidth={1.5} />
                <span>{event.date}</span>
              </div>
              <div className="scroll-detail-row">
                <Clock size={15} strokeWidth={1.5} />
                <span>{event.time}</span>
              </div>
              <div className="scroll-detail-row">
                <MapPin size={15} strokeWidth={1.5} />
                <span>{event.venue}</span>
              </div>
            </div>

            <div className="scroll-footer-ornament">❦</div>

            <img src="/images/floral_corner.png" alt="" className="scroll-corner-img corner-tl" />
            <img src="/images/floral_corner.png" alt="" className="scroll-corner-img corner-tr" />
            <img src="/images/floral_corner.png" alt="" className="scroll-corner-img corner-bl" />
            <img src="/images/floral_corner.png" alt="" className="scroll-corner-img corner-br" />
          </motion.div>
        </div>
      </motion.div>

      {/* Right handle + paper sleeve wrapping it */}
      <div className="scroll-handle-wrap">
        <div className="paper-sleeve paper-sleeve-right" aria-hidden="true" />
        <WoodenHandleVertical id="right" />
      </div>
    </div>
  );
};

const EventsSection = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // Hold at start & end so the user sees the closed and fully-open states.
  const progress = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

  return (
    <div className="events-section">
      <section className="events-heading-section">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-sm uppercase tracking-[0.4em] text-gold font-sans font-medium mb-6">Celebrations</h2>
          <h3 className="text-5xl md:text-7xl font-script text-dark-brown">Wedding Invitation</h3>
          <p className="mt-6 text-soft-brown/70 font-sans text-sm tracking-wide max-w-md mx-auto">
            Scroll to unroll the invitation
          </p>
        </motion.div>
      </section>

      <div ref={wrapperRef} className="scroll-tracking-wrapper">
        <div className="scroll-sticky-container">
          <SidewaysInvitation progress={progress} />
        </div>
      </div>
    </div>
  );
};

export default EventsSection;
