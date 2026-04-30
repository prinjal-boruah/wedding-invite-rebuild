import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, type MotionValue } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type Photo = {
  src: string;
  caption: string;
  label: string;
  location: string;
  story: string;
};

const photos: Photo[] = [
  { src: '/images/couple_story_1776425546722.png', caption: 'March 2023', label: 'How We Met', location: 'Mumbai, India', story: "It started with a chance meeting at a friend's gathering — a simple hello that sparked something unforgettable. We talked for hours and knew this was the beginning of something beautiful." },
  { src: '/images/beach_1776425463100.png', caption: 'August 2023', label: 'The Goa Adventure', location: 'Goa, India', story: 'Our first trip together — sand between our toes, waves about our heads, and a realization that every mundane moment with you is extraordinary.' },
  { src: '/images/palace_1776425445755.png', caption: 'November 2023', label: 'The Palace Visit', location: 'Udaipur, India', story: 'A royal weekend getaway that made us dream of a future together. The sunsets here painted our love story in gold.' },
  { src: '/images/haldi_1776425508959.png', caption: 'December 2024', label: 'Our Favorite Festival', location: 'Jaipur, India', story: 'Celebrating traditions together, covered in marigolds and laughter. Every festival feels brighter with you by my side.' },
  { src: '/images/wedding_1776425528064.png', caption: 'April 2025', label: 'The Proposal', location: 'Udaipur, India', story: 'Under a canopy of flowers and fairy lights, one knee touched the ground and a lifetime promise was made. She said yes.' },
  { src: '/images/hero_bg_1776425430100.avif', caption: 'October 2025', label: 'Forever Begins', location: 'Tuscany, Italy', story: 'An engagement celebration with our closest friends and family. The countdown to forever officially began.' },
];

const initialRotations = [0, 2, -2.5, 3, -2, 1.5];
const initialOffsets = [
  { x: 0, y: 0 },
  { x: 25, y: -6 },
  { x: -28, y: -12 },
  { x: 30, y: -18 },
  { x: -26, y: -24 },
  { x: 22, y: -30 },
];

// Timeline positions are calculated around each card's visual center.
// The Card component uses a centered wrapper first, then Framer Motion offsets
// the inner card, so symmetric x-values stay visually centered on every screen.
const timelinePositions = [
  { x: -480, y: -200, rot: -6 },  // top-left
  { x: 480, y: -180, rot: 3 },    // top-right
  { x: -288, y: -40, rot: 4 },    // mid-left
  { x: 288, y: -60, rot: -4 },    // mid-right
  { x: -96, y: 100, rot: -3 },    // bottom-left
  { x: 96, y: 80, rot: 5 },       // bottom-right
];

const timelinePositionsMobile = [
  { x: -92, y: -240, rot: -6 },
  { x: 92, y: -150, rot: 4 },
  { x: -92, y: -50, rot: -3 },
  { x: 92, y: 40, rot: 5 },
  { x: -92, y: 140, rot: -4 },
  { x: 92, y: 230, rot: 3 },
];

type CardProps = {
  photo: Photo;
  index: number;
  scrollYProgress: MotionValue<number>;
  onClick: (index: number) => void;
  isMobile: boolean;
};

const Card = ({ photo, index, scrollYProgress, onClick, isMobile }: CardProps) => {
  const pos = isMobile ? timelinePositionsMobile[index] : timelinePositions[index];

  const start = index * 0.06;
  const end = 0.35 + index * 0.06;

  const x = useTransform(scrollYProgress, [start, end], [initialOffsets[index].x, pos.x]);
  const y = useTransform(scrollYProgress, [start, end], [initialOffsets[index].y, pos.y]);
  const rotate = useTransform(scrollYProgress, [start, end], [initialRotations[index], pos.rot]);
  const captionOpacity = useTransform(scrollYProgress, [end - 0.05, end + 0.05], [0, 1]);
  const zIndex = photos.length - index;

  return (
    <div className="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ zIndex }}>
      <motion.div
        style={{ x, y, rotate }}
        className="cursor-pointer group"
        whileHover={{ scale: 1.08, zIndex: 50, transition: { duration: 0.3 } }}
        onClick={() => onClick(index)}
      >
        <div
          className="bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12)] rounded-xl
                     w-[156px] h-[200px] md:w-[234px] md:h-[300px] p-[8px] md:p-[12px]
                     flex flex-col"
        >
          <div className="flex-1 overflow-hidden bg-gray-100 rounded-lg">
            <img src={photo.src} alt={photo.label} className="w-full h-full object-cover" draggable={false} />
          </div>
          <div className="pt-[6px] md:pt-[10px] pb-[2px] text-center">
            <p className="text-[9px] md:text-[11px] font-serif italic text-soft-brown/80 truncate">{photo.label}</p>
          </div>
        </div>

        <motion.p
          style={{ opacity: captionOpacity }}
          className="text-center mt-2 text-[9px] md:text-xs font-serif italic text-soft-brown/70 whitespace-nowrap"
        >
          {photo.caption}
        </motion.p>
      </motion.div>
    </div>
  );
};

const ConnectorLines = ({ scrollYProgress, isMobile }: { scrollYProgress: MotionValue<number>; isMobile: boolean }) => {
  const opacity = useTransform(scrollYProgress, [0.3, 0.55], [0, 0.35]);
  const positions = isMobile ? timelinePositionsMobile : timelinePositions;

  return (
    <motion.svg
      style={{ opacity }}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      viewBox={isMobile ? '-180 -330 360 660' : '-600 -350 1200 700'}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker id="dot" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="4" markerHeight="4">
          <circle cx="3" cy="3" r="2.5" fill="#D4AF37" opacity="0.5" />
        </marker>
      </defs>
      {positions.slice(0, -1).map((pos, i) => {
        const next = positions[i + 1];
        return (
          <line
            key={i}
            x1={pos.x}
            y1={pos.y}
            x2={next.x}
            y2={next.y}
            stroke="#C5A028"
            strokeWidth="1"
            strokeDasharray="6 5"
            opacity="0.45"
            markerEnd="url(#dot)"
            markerStart={i === 0 ? 'url(#dot)' : undefined}
          />
        );
      })}
    </motion.svg>
  );
};

const LoveStorySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => ((prev ?? 0) + 1) % photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => ((prev ?? 0) - 1 + photos.length) % photos.length);
  };

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  return (
    <section ref={containerRef} className="relative w-full h-[300vh]" style={{ backgroundImage: 'url(/images/our_story_bg.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(244, 241, 234, 0.75)', zIndex: 0 }} />
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center" style={{ zIndex: 1 }}>
        <motion.div
          className="absolute top-20 md:top-24 text-center w-full z-20"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <h2 className="text-5xl md:text-7xl font-script text-dark-brown">Our Story</h2>
          <p className="text-xs md:text-sm font-sans tracking-[0.3em] text-soft-brown mt-4 uppercase">Scroll to unfold</p>
        </motion.div>

        <ConnectorLines scrollYProgress={scrollYProgress} isMobile={isMobile} />

        <div className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-center">
          {photos.map((photo, index) => (
            <Card
              key={index}
              photo={photo}
              index={index}
              scrollYProgress={scrollYProgress}
              onClick={setSelectedPhotoIndex}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <motion.div
              className="relative bg-[#FAF7F2] rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.2)] w-[92vw] max-w-4xl max-h-[88vh] overflow-hidden flex flex-col md:flex-row"
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-20 text-dark-brown/40 hover:text-dark-brown transition-colors p-1"
                onClick={() => setSelectedPhotoIndex(null)}
                aria-label="Close"
              >
                <X size={24} strokeWidth={1.5} />
              </button>

              <div className="w-full md:w-1/2 p-6 md:p-10 flex items-center justify-center bg-[#F4F0E8]">
                <div className="bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.08)] rotate-[-2deg] max-w-[320px] w-full">
                  <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                    <img src={photos[selectedPhotoIndex].src} alt={photos[selectedPhotoIndex].label} className="w-full h-full object-cover" />
                  </div>
                  <div className="pt-3 pb-1 text-center">
                    <p className="text-xs font-serif italic text-soft-brown/60">{photos[selectedPhotoIndex].caption}</p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-script text-dark-brown mb-2">{photos[selectedPhotoIndex].label}</h3>
                <p className="text-xs font-sans uppercase tracking-[0.2em] text-gold mb-1">📍 {photos[selectedPhotoIndex].location}</p>
                <p className="text-xs font-sans uppercase tracking-[0.15em] text-soft-brown/60 mb-8">{photos[selectedPhotoIndex].caption}</p>

                <div className="w-10 h-px bg-gold/40 mb-6" />

                <p className="text-sm md:text-base font-sans font-light leading-relaxed text-dark-brown/75">
                  {photos[selectedPhotoIndex].story}
                </p>

                <div className="flex items-center gap-4 mt-10 pt-6 border-t border-dark-brown/10">
                  <button onClick={prevPhoto} className="flex items-center gap-1 text-xs uppercase tracking-widest text-soft-brown hover:text-gold transition-colors font-sans">
                    <ChevronLeft size={16} strokeWidth={1.5} /> Prev
                  </button>
                  <span className="text-soft-brown/30 text-xs">{selectedPhotoIndex + 1} / {photos.length}</span>
                  <button onClick={nextPhoto} className="flex items-center gap-1 text-xs uppercase tracking-widest text-soft-brown hover:text-gold transition-colors font-sans">
                    Next <ChevronRight size={16} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LoveStorySection;
