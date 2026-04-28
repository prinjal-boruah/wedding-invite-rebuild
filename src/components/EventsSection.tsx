import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';

type WeddingEvent = {
  name: string;
  date: string;
  time: string;
  venue: string;
  description: string;
};

const events: WeddingEvent[] = [
  {
    name: 'Haldi',
    date: 'December 13, 2026',
    time: '10:00 AM',
    venue: 'The Royal Gardens, Udaipur',
    description: 'The Haldi ceremony marks the start of our wedding celebrations. Join us for a morning filled with laughter, turmeric, and blessings.',
  },
  {
    name: 'Wedding',
    date: 'December 15, 2026',
    time: '7:00 PM',
    venue: 'The Grand Palace, Udaipur',
    description: 'The grand celebration of our union. Be prepared for live music, fine dining, and memories that last forever.',
  },
];

/* Vertical wooden handle/rod (sideways scroll). */
const WoodenHandle = ({ id = 'default' }: { id?: string }) => (
  <div className="scroll-handle-v">
    <svg width="44" height="100%" viewBox="0 0 44 340" preserveAspectRatio="none" style={{ display: 'block', height: '100%', overflow: 'visible' }}>
      <defs>
        <linearGradient id={`wg-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7A5235" />
          <stop offset="20%" stopColor="#5C3A22" />
          <stop offset="50%" stopColor="#4A2E18" />
          <stop offset="80%" stopColor="#5C3A22" />
          <stop offset="100%" stopColor="#3D2415" />
        </linearGradient>
        <linearGradient id={`whl-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="30%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
        </linearGradient>
        <linearGradient id={`fn-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6B4427" />
          <stop offset="25%" stopColor="#4A2E18" />
          <stop offset="50%" stopColor="#3D2415" />
          <stop offset="75%" stopColor="#4A2E18" />
          <stop offset="100%" stopColor="#2E1B0E" />
        </linearGradient>
        <radialGradient id={`fhl-${id}`} cx="0.3" cy="0.4" r="0.5">
          <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* Main rod (vertical) */}
      <rect x="14" y="34" width="16" height="272" rx="2" fill={`url(#wg-${id})`} />
      <rect x="14" y="34" width="16" height="272" rx="2" fill={`url(#whl-${id})`} />

      {/* Top finial */}
      <ellipse cx="22" cy="34" rx="15" ry="4" fill={`url(#fn-${id})`} />
      <ellipse cx="22" cy="22" rx="22" ry="11" fill={`url(#fn-${id})`} />
      <ellipse cx="22" cy="13" rx="13" ry="5" fill={`url(#fn-${id})`} />
      <ellipse cx="22" cy="9" rx="10" ry="4" fill={`url(#fn-${id})`} />
      <ellipse cx="22" cy="6" rx="6" ry="2" fill={`url(#fn-${id})`} />
      <ellipse cx="22" cy="22" rx="22" ry="11" fill={`url(#fhl-${id})`} />
      <ellipse cx="22" cy="13" rx="13" ry="5" fill={`url(#fhl-${id})`} />

      {/* Bottom finial */}
      <ellipse cx="22" cy="306" rx="15" ry="4" fill={`url(#fn-${id})`} />
      <ellipse cx="22" cy="318" rx="22" ry="11" fill={`url(#fn-${id})`} />
      <ellipse cx="22" cy="327" rx="13" ry="5" fill={`url(#fn-${id})`} />
      <ellipse cx="22" cy="331" rx="10" ry="4" fill={`url(#fn-${id})`} />
      <ellipse cx="22" cy="334" rx="6" ry="2" fill={`url(#fn-${id})`} />
      <ellipse cx="22" cy="318" rx="22" ry="11" fill={`url(#fhl-${id})`} />
      <ellipse cx="22" cy="327" rx="13" ry="5" fill={`url(#fhl-${id})`} />

      {/* Grain lines */}
      <line x1="18" y1="34" x2="18" y2="306" stroke="rgba(30,15,5,0.2)" strokeWidth="1.5" />
      <line x1="26" y1="34" x2="26" y2="306" stroke="rgba(30,15,5,0.14)" strokeWidth="1" />
    </svg>
  </div>
);

const ScrollInvitation = ({ event, index }: { event: WeddingEvent; index: number }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Pin section while sideways unroll happens (LoveStorySection-style).
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll → unroll progress 0→1, with hold at start & end.
  const progress = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  // Paper width grows from 0 → full
  const paperWidth = useTransform(progress, [0, 1], ['0%', '100%']);
  // Content fades in once paper is mostly open
  const contentOpacity = useTransform(progress, [0.7, 1], [0, 1]);
  const contentX = useTransform(progress, [0.7, 1], [20, 0]);

  return (
    <div ref={wrapperRef} className="scroll-tracking-wrapper">
      <div className="scroll-sticky-container">
        <div className="scroll-invitation-h">
          {/* Left handle — fixed anchor */}
          <WoodenHandle id={`l${index}`} />

          {/* Paper region — grows in width */}
          <motion.div className="paper-region" style={{ width: paperWidth }}>
            <div className="paper-inner-h">
              <motion.div
                className="paper-content"
                style={{ opacity: contentOpacity, x: contentX }}
              >
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

          {/* Right handle — rides on the right edge of paper */}
          <WoodenHandle id={`r${index}`} />
        </div>
      </div>
    </div>
  );
};

const EventsSection = () => {
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
          <h3 className="text-5xl md:text-7xl font-script text-dark-brown">Wedding Events</h3>
          <p className="mt-6 text-soft-brown/70 font-sans text-sm tracking-wide max-w-md mx-auto">
            Scroll to unroll each invitation
          </p>
        </motion.div>
      </section>

      {events.map((event, index) => (
        <ScrollInvitation key={index} event={event} index={index} />
      ))}
    </div>
  );
};

export default EventsSection;
