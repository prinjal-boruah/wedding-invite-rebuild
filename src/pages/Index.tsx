import HeroCountdownSection from '@/components/HeroCountdownSection';
import LoveStorySection from '@/components/LoveStorySection';
import EventsSection from '@/components/EventsSection';
import RsvpSection from '@/components/RsvpSection';

const Index = () => {
  return (
    <main>
      <h1 className="sr-only">Aarav & Ananya Wedding Invitation</h1>
      <HeroCountdownSection />
      <LoveStorySection />
      <EventsSection />
      <RsvpSection />
    </main>
  );
};

export default Index;
