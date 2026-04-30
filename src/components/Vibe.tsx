import neonImg from "@/assets/vibe-neon.jpg";
import bonsaiImg from "@/assets/vibe-bonsai.jpg";

export const Vibe = () => {
  return (
    <section id="vibe" className="relative py-32 md:py-48">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-24">
          <p className="text-xs uppercase tracking-[0.5em] text-copper mb-5">The Vibe</p>
          <h2 className="font-display text-5xl md:text-7xl leading-[1.05]">
            A refined interior <em className="text-neon-soft not-italic">sanctuary.</em>
          </h2>
          <div className="hairline mt-10 max-w-xs" />
        </div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center mb-32">
          <div className="md:col-span-7 relative overflow-hidden">
            <img
              src={neonImg}
              alt="Pink Members Only neon sign on wood-paneled wall, red velvet chairs and modern bar"
              width={1080}
              height={1620}
              loading="lazy"
              decoding="async"
              className="w-full h-[520px] md:h-[720px] object-cover transition-transform duration-[2000ms] hover:scale-105"
              style={{ boxShadow: "var(--shadow-elegant)" }}
            />
          </div>
          <div className="md:col-span-5">
            <h3 className="font-display text-3xl md:text-4xl mb-6">
              Neon on warm wood.
            </h3>
            <p className="text-foreground/70 leading-relaxed">
              The signature pink neon hums against rich wood paneling. Red velvet
              chairs frame a sculpted black bar — a stage set for slow evenings,
              quiet conversations, and the unmistakable glow of <span className="text-neon-soft">Members Only</span>.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-5 md:order-1 order-2">
            <h3 className="font-display text-3xl md:text-4xl mb-6">
              The olive at the heart.
            </h3>
            <p className="text-foreground/70 leading-relaxed">
              At the centre of the lounge stands a backlit indoor olive bonsai —
              silver leaves catching light from copper-gold pendant lamps suspended
              above. A living centerpiece, deliberate and serene.
            </p>
          </div>
          <div className="md:col-span-7 md:order-2 order-1 relative overflow-hidden">
            <img
              src={bonsaiImg}
              alt="Backlit indoor olive bonsai tree under copper-gold pendant lamps"
              width={1080}
              height={1620}
              loading="lazy"
              decoding="async"
              className="w-full h-[520px] md:h-[720px] object-cover transition-transform duration-[2000ms] hover:scale-105"
              style={{ boxShadow: "var(--shadow-elegant)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
