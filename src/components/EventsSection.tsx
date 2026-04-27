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

const WoodenHandle = ({ id = 'default' }: { id?: string }) => (
  <div className="scroll-handle">
    <svg width="100%" height="60" viewBox="0 0 360 64" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`wg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7A5235" />
          <stop offset="20%" stopColor="#5C3A22" />
          <stop offset="50%" stopColor="#4A2E18" />
          <stop offset="80%" stopColor="#5C3A22" />
          <stop offset="100%" stopColor="#3D2415" />
        </linearGradient>
        <linearGradient id={`whl-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="30%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
        </linearGradient>
        <linearGradient id={`fn-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6B4427" />
          <stop offset="25%" stopColor="#4A2E18" />
          <stop offset="50%" stopColor="#3D2415" />
          <stop offset="75%" stopColor="#4A2E18" />
          <stop offset="100%" stopColor="#2E1B0E" />
        </linearGradient>
        <radialGradient id={`fhl-${id}`} cx="0.4" cy="0.3" r="0.5">
          <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <radialGradient id={`fsh-${id}`} cx="0.5" cy="0.7" r="0.5">
          <stop offset="0%" stopColor="rgba(0,0,0,0.15)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      <rect x="34" y="20" width="292" height="24" rx="2" fill={`url(#wg-${id})`} />
      <rect x="34" y="20" width="292" height="24" rx="2" fill={`url(#whl-${id})`} />

      {/* Left finial */}
      <ellipse cx="34" cy="32" rx="4" ry="15" fill={`url(#fn-${id})`} />
      <ellipse cx="20" cy="32" rx="11" ry="22" fill={`url(#fn-${id})`} />
      <ellipse cx="9" cy="32" rx="5" ry="13" fill={`url(#fn-${id})`} />
      <ellipse cx="4" cy="32" rx="4" ry="10" fill={`url(#fn-${id})`} />
      <ellipse cx="1" cy="32" rx="2" ry="6" fill={`url(#fn-${id})`} />
      <ellipse cx="20" cy="32" rx="11" ry="22" fill={`url(#fhl-${id})`} />
      <ellipse cx="9" cy="32" rx="5" ry="13" fill={`url(#fhl-${id})`} />
      <ellipse cx="4" cy="32" rx="4" ry="10" fill={`url(#fhl-${id})`} />
      <ellipse cx="20" cy="32" rx="11" ry="22" fill={`url(#fsh-${id})`} />
      <ellipse cx="28" cy="32" rx="1.5" ry="16" fill="rgba(30,15,5,0.3)" />
      <ellipse cx="12" cy="32" rx="1.5" ry="14" fill="rgba(30,15,5,0.25)" />

      {/* Right finial */}
      <ellipse cx="326" cy="32" rx="4" ry="15" fill={`url(#fn-${id})`} />
      <ellipse cx="340" cy="32" rx="11" ry="22" fill={`url(#fn-${id})`} />
      <ellipse cx="351" cy="32" rx="5" ry="13" fill={`url(#fn-${id})`} />
      <ellipse cx="356" cy="32" rx="4" ry="10" fill={`url(#fn-${id})`} />
      <ellipse cx="359" cy="32" rx="2" ry="6" fill={`url(#fn-${id})`} />
      <ellipse cx="340" cy="32" rx="11" ry="22" fill={`url(#fhl-${id})`} />
      <ellipse cx="351" cy="32" rx="5" ry="13" fill={`url(#fhl-${id})`} />
      <ellipse cx="356" cy="32" rx="4" ry="10" fill={`url(#fhl-${id})`} />
      <ellipse cx="340" cy="32" rx="11" ry="22" fill={`url(#fsh-${id})`} />
      <ellipse cx="332" cy="32" rx="1.5" ry="16" fill="rgba(30,15,5,0.3)" />
      <ellipse cx="348" cy="32" rx="1.5" ry="14" fill="rgba(30,15,5,0.25)" />
    </svg>
  </div>
);

const ScrollInvitation = ({ event, index }: { event: WeddingEvent; index: number }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start end', 'end start'],
  });

  // Open earlier and finish well before the section ends so the fully-open
  // invitation stays visible (and centered) for a comfortable scroll range.
  const openProgress = useTransform(scrollYProgress, [0.18, 0.5], [0, 1]);
  const paperMaxHeight = useTransform(openProgress, [0, 1], [0, 460]);
  const contentOpacity = useTransform(openProgress, [0.4, 0.85], [0, 1]);
  const contentY = useTransform(openProgress, [0.4, 0.85], [24, 0]);
  const invitationScale = useTransform(openProgress, [0, 0.15], [0.95, 1]);

  return (
    <div ref={wrapperRef} className="scroll-tracking-wrapper">
      <div className="scroll-sticky-container">
        <motion.div className="scroll-invitation" style={{ scale: invitationScale }}>
          <div className="handle-area">
            <WoodenHandle id={`t${index}`} />
            <div className="paper-wrap" />
          </div>

          <motion.div className="paper-revealed" style={{ maxHeight: paperMaxHeight }}>
            <div className="paper-inner">
              <div className="scroll-header-ornament">❦</div>

              <p className="scroll-invitation-line">You are cordially invited to</p>

              <div className="scroll-wreath-container">
                <img src="/images/floral_wreath.png" alt="Floral wreath" className="scroll-wreath-img" />
                <div className="scroll-event-name-overlay">
                  <h3 className="scroll-event-name">{event.name}</h3>
                </div>
              </div>

              <motion.div style={{ opacity: contentOpacity, y: contentY }}>
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
              </motion.div>

              <img src="/images/floral_corner.png" alt="" className="scroll-corner-img corner-tl" />
              <img src="/images/floral_corner.png" alt="" className="scroll-corner-img corner-tr" />
              <img src="/images/floral_corner.png" alt="" className="scroll-corner-img corner-bl" />
              <img src="/images/floral_corner.png" alt="" className="scroll-corner-img corner-br" />
            </div>
          </motion.div>

          <div className="handle-area">
            <WoodenHandle id={`b${index}`} />
            <div className="paper-wrap" />
          </div>
        </motion.div>
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
            Scroll down to unroll each invitation
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
