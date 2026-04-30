import { useEffect, useRef, useState } from "react";
import { menuData, MenuCategory } from "@/data/menu";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";

const accentClass = (a: MenuCategory["accent"]) =>
  a === "neon" ? "text-neon-soft" : a === "gold" ? "text-gold" : "text-primary";

const Menu = () => {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);

  // SEO meta
  useEffect(() => {
    document.title = "Menu — Members Only Bucharest · Shisha, Cocktails, Dining";
    const meta =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    meta.setAttribute(
      "content",
      "The Members Only menu: signature shisha, craft cocktails, fine dining and bottle service in Bucharest."
    );
    if (!meta.parentElement) document.head.appendChild(meta);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 60) {
      setActive((i) =>
        Math.min(menuData.length - 1, Math.max(0, i + (dx < 0 ? 1 : -1)))
      );
    }
    touchStart.current = null;
  };

  const cat = menuData[active];

  return (
    <main className="min-h-screen bg-background text-foreground pb-safe-nav">
      <Navbar />

      {/* Hero header */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img
          key={cat.id}
          src={cat.image}
          alt={`${cat.label} vibe`}
          width={1600}
          height={900}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background" />
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-12 md:pb-16">
          <p className="text-xs uppercase tracking-[0.5em] text-primary mb-4">The Menu</p>
          <h1 className={`font-display text-5xl md:text-7xl uppercase tracking-[0.04em] ${accentClass(cat.accent)}`}>
            {cat.label}
          </h1>
          <p className="mt-4 max-w-xl text-foreground/75">{cat.tagline}</p>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-16 z-40 backdrop-blur-md bg-background/70 border-y border-border">
        <div className="container mx-auto px-3 overflow-x-auto">
          <div role="tablist" className="flex gap-1 py-2 min-w-max">
            {menuData.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className={`px-5 py-2.5 text-[10px] md:text-xs uppercase tracking-[0.3em] rounded-full transition-all duration-300 ${
                    isActive
                      ? "text-neon"
                      : "text-foreground/55 hover:text-foreground"
                  }`}
                  style={
                    isActive
                      ? {
                          background: "hsl(var(--neon-pink) / 0.08)",
                          boxShadow: "var(--glow-neon-soft)",
                          border: "1px solid hsl(var(--neon-pink) / 0.5)",
                        }
                      : { border: "1px solid transparent" }
                  }
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Items grid (swipeable) */}
      <section
        ref={trackRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="container mx-auto px-6 py-16 md:py-24"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {cat.items.map((item, idx) => (
            <article
              key={item.name}
              className="glass rounded-2xl p-7 group cursor-pointer transition-all duration-500 hover:-translate-y-1"
              style={{
                animation: `fade-in 0.5s ease-out ${idx * 60}ms both`,
              }}
              onClick={(e) => {
                const el = e.currentTarget;
                el.classList.remove("neon-pulse");
                void el.offsetWidth;
                el.classList.add("neon-pulse");
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-display text-2xl leading-tight">{item.name}</h3>
                {item.tag && (
                  <span className="shrink-0 text-[9px] uppercase tracking-[0.3em] text-gold border border-gold/40 px-2 py-1 rounded-full">
                    {item.tag}
                  </span>
                )}
              </div>
              <p className="text-foreground/65 text-sm leading-relaxed mb-6">{item.desc}</p>
              <div className="flex items-center justify-between">
                <span className="hairline flex-1 mr-4" />
                <span className={`text-sm tracking-[0.2em] ${accentClass(cat.accent)}`}>
                  {item.price}
                </span>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-[10px] uppercase tracking-[0.4em] text-foreground/40 mt-12 md:hidden">
          ← Swipe between categories →
        </p>
      </section>

      <Footer />
      <BottomNav />
    </main>
  );
};

export default Menu;
