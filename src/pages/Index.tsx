import HeroSection from '@/components/HeroSection';
import CountdownSection from '@/components/CountdownSection';
import LoveStorySection from '@/components/LoveStorySection';
import EventsSection from '@/components/EventsSection';
import RsvpSection from '@/components/RsvpSection';

const Index = () => {
  return (
    <main>
      <h1 className="sr-only">Aarav & Ananya Wedding Invitation</h1>
      <HeroSection />
      <CountdownSection />
      <LoveStorySection />
      <EventsSection />
      <RsvpSection />
    </main>
  );
};

export default Index;
