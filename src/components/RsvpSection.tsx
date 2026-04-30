const RsvpSection = () => {
  return (
    <section className="py-32 px-6 bg-cream text-center">
      <h2 className="text-sm uppercase tracking-[0.4em] text-gold font-sans font-medium mb-6">
        Kindly Respond
      </h2>
      <h3 className="text-5xl md:text-7xl font-script text-dark-brown mb-8">RSVc</h3>
      <p className="max-w-md mx-auto text-soft-brown/70 font-serif italic">
        Please let us know if you'll be joining us by November 15, 2026.
      </p>
      <button className="mt-10 px-10 py-3 border border-gold text-dark-brown font-sans tracking-[0.2em] text-xs uppercase hover:bg-gold hover:text-cream transition-colors">
        Confirm Attendance
      </button>
    </section>
  );
};

export default RsvpSection;
