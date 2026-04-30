import hero from "@/assets/hero-exterior.jpg";

export const Hero = () => {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center"
    >
      <img
        src={hero}
        alt="Members Only lounge entrance at night with pink neon sign reflecting on rain-dampened pavement"
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-background/40" />

      <div className="relative z-10 text-center px-6 animate-fade-up">
        <p className="text-xs md:text-sm uppercase tracking-[0.5em] text-copper mb-6">
          Exclusivity is a lifestyle
        </p>
        <h1 className="font-display text-6xl sm:text-7xl md:text-9xl uppercase tracking-[0.08em] text-neon neon-flicker">
          Members Only
        </h1>
        <address className="not-italic mt-6 text-foreground/80 text-sm md:text-base tracking-[0.25em] uppercase">
          str. Nicolae G. Caramfil 74A · Bucharest
        </address>
        <div className="mt-12">
          <a href="#reserve" className="btn-neon">
            Reserve your place
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[10px] tracking-[0.4em] uppercase text-foreground/50">
        Scroll
      </div>
    </section>
  );
};
