import HeroSection from '@/components/HeroSection';
import CountdownSection from '@/components/CountdownSection';
import LoveStorySection from '@/components/LoveStorySection';
import EventsSection from '@/components/EventsSection';

const Index = () => {
  return (
    <main>
      <h1 className="sr-only">Aarav & Ananya Wedding Invitation</h1>
      <HeroSection />
      <CountdownSection />
      <LoveStorySection />
      <EventsSection />
    </main>
  );
};

export default Index;
