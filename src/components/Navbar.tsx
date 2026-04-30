import { useEffect, useState } from "react";
import gorilla from "@/assets/gorilla-logo.png";

const links = [
  { href: "#vibe", label: "The Vibe" },
  { href: "#menu", label: "The Menu" },
  { href: "#reserve", label: "Reserve a Table" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-background/70 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-4">
        <a href="#top" className="flex items-center gap-3 group">
          <img
            src={gorilla}
            alt="Members Only gorilla emblem"
            width={36}
            height={36}
            className="h-9 w-9 opacity-90 group-hover:opacity-100 transition"
            style={{ filter: "drop-shadow(0 0 6px hsl(var(--copper) / 0.4))" }}
          />
          <span className="font-display text-lg tracking-[0.35em] uppercase">
            <span className="text-copper">Members</span>{" "}
            <span className="text-foreground/90">Only</span>
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.3em]">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-foreground/70 hover:text-neon-soft transition-colors duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#reserve"
          className="hidden md:inline-block text-xs uppercase tracking-[0.3em] px-4 py-2 border border-neon/60 text-neon hover:bg-neon/10 transition"
          style={{ boxShadow: "var(--glow-neon-soft)" }}
        >
          Reserve
        </a>
      </nav>
    </header>
  );
};
