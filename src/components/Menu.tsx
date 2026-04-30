import { Link } from "react-router-dom";

const categories = [
  {
    title: "Premium Shisha",
    desc: "Curated tobacco blends served on hand-finished pipes — delivered with copper-tipped ceremony.",
  },
  {
    title: "Signature Cocktails",
    desc: "Slow-built classics and house originals from the bar, mixed under warm copper light.",
  },
  {
    title: "Refined Desserts",
    desc: "A short, considered list of plated finishes — designed to close an evening with quiet luxury.",
  },
];

export const Menu = () => {
  return (
    <section id="menu" className="relative py-32 md:py-48 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-xs uppercase tracking-[0.5em] text-copper mb-5">The Menu</p>
          <h2 className="font-display text-5xl md:text-7xl leading-[1.05]">
            A short list, <em className="text-neon-soft not-italic">done well.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          {categories.map((c) => (
            <article
              key={c.title}
              className="bg-background/80 p-10 md:p-12 group hover:bg-background transition-colors duration-500"
            >
              <div className="text-copper text-xs tracking-[0.4em] uppercase mb-8">
                · 0{categories.indexOf(c) + 1}
              </div>
              <h3 className="font-display text-3xl md:text-4xl uppercase tracking-wider mb-6 group-hover:text-neon-soft transition-colors duration-500">
                {c.title}
              </h3>
              <p className="text-foreground/65 leading-relaxed">{c.desc}</p>
            </article>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link to="/menu" className="btn-neon rounded-full">
            Explore all options
          </Link>
        </div>
      </div>
    </section>
  );
};
