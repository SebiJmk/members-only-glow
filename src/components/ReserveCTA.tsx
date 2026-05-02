import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export const ReserveCTA = () => {
  return (
    <section id="reserve" className="relative py-40 md:py-56">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <p className="text-xs uppercase tracking-[0.5em] text-primary mb-6">The Gates</p>
          <h2 className="font-display text-5xl md:text-7xl leading-[1.05] mb-10">
            Experience the <em className="text-neon-soft not-italic">exclusivity.</em>
          </h2>
          <div className="hairline w-40 mb-10" />
          <p className="text-foreground/70 leading-relaxed max-w-xl mb-14">
            A curated floor plan. Velvet seats under copper light. Reserve your
            table inside the lounge — every seat tells a different story.
          </p>

          <Link
            to="/reserve"
            className="group relative inline-flex items-center gap-4 px-12 py-6 text-sm font-medium tracking-[0.4em] uppercase transition-all duration-500 bg-card/40 text-foreground border border-border hover:border-primary hover:text-neon-soft"
            style={{ boxShadow: "inset 0 0 0 1px hsl(var(--border))" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 24px hsl(var(--neon-pink) / 0.45), inset 0 0 30px hsl(var(--neon-pink) / 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "inset 0 0 0 1px hsl(var(--border))";
            }}
          >
            <span>Reserve your table</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
