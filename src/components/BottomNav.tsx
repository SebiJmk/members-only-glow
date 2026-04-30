import { NavLink } from "react-router-dom";
import { Home, UtensilsCrossed, CalendarHeart } from "lucide-react";

const items = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/menu", label: "Menu", Icon: UtensilsCrossed },
  { to: "/reserve", label: "Reserve", Icon: CalendarHeart },
];

export const BottomNav = () => (
  <nav
    aria-label="Primary"
    className="fixed inset-x-3 z-50 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-auto"
    style={{
      bottom: "max(0.75rem, env(safe-area-inset-bottom))",
    }}
  >
    <ul className="glass-strong rounded-full flex items-center justify-around md:gap-2 px-2 py-2 shadow-elegant">
      {items.map(({ to, label, Icon }) => (
        <li key={to} className="flex-1 md:flex-none">
          <NavLink
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex md:flex-row flex-col items-center justify-center gap-1 md:gap-2 px-4 md:px-6 py-2.5 rounded-full text-[10px] md:text-xs uppercase tracking-[0.25em] transition-all duration-300 ${
                isActive
                  ? "text-neon"
                  : "text-foreground/60 hover:text-foreground"
              }`
            }
            style={({ isActive }) =>
              isActive
                ? { textShadow: "var(--glow-neon-soft)" }
                : undefined
            }
          >
            <Icon className="h-4 w-4" strokeWidth={1.5} />
            <span>{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);
