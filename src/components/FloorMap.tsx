import { Table, Zone, tables, zones } from "@/data/floorplan";

type Props = {
  selected: string | null;
  onSelect: (id: string) => void;
  hovered: string | null;
  onHover: (id: string | null) => void;
};

const zoneColor: Record<Zone["id"], string> = {
  bonsai: "hsl(130 50% 18% / 0.55)",
  neon: "hsl(338 100% 62% / 0.12)",
  vip: "hsl(0 60% 30% / 0.45)",
  bar: "hsl(19 47% 35% / 0.4)",
};

export const FloorMap = ({ selected, onSelect, hovered, onHover }: Props) => {
  return (
    <div className="glass-strong rounded-2xl p-3 md:p-5">
      <svg
        viewBox="0 0 600 400"
        className="w-full h-auto"
        role="img"
        aria-label="Members Only floor plan with selectable tables"
      >
        <defs>
          <radialGradient id="bonsai-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(42 90% 70% / 0.5)" />
            <stop offset="100%" stopColor="hsl(42 90% 70% / 0)" />
          </radialGradient>
          <linearGradient id="gold-grad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(42 90% 70%)" />
            <stop offset="100%" stopColor="hsl(35 80% 50%)" />
          </linearGradient>
        </defs>

        {/* Floor */}
        <rect x="20" y="20" width="560" height="360" rx="14"
          fill="hsl(0 0% 8%)" stroke="hsl(var(--border))" strokeWidth="1" />

        {/* Zones */}
        <rect x="40" y="40" width="420" height="80" rx="8" fill={zoneColor.neon} />
        <text x="60" y="62" fill="hsl(var(--neon-pink) / 0.7)" fontSize="10" letterSpacing="3">NEON LOUNGE</text>

        <rect x="465" y="115" width="100" height="170" rx="8" fill={zoneColor.vip} />
        <text x="478" y="135" fill="hsl(0 70% 80% / 0.85)" fontSize="10" letterSpacing="3">VIP</text>

        <rect x="40" y="300" width="420" height="60" rx="8" fill={zoneColor.bar} />
        <text x="60" y="322" fill="hsl(var(--copper) / 0.85)" fontSize="10" letterSpacing="3">COPPER BAR</text>

        {/* Bonsai area */}
        <circle cx="300" cy="200" r="95" fill={zoneColor.bonsai} />
        <circle cx="300" cy="200" r="80" fill="url(#bonsai-glow)" />
        <text x="232" y="135" fill="hsl(42 80% 70% / 0.85)" fontSize="10" letterSpacing="3">THE BONSAI</text>
        {/* tree marker */}
        <circle cx="300" cy="170" r="8" fill="hsl(42 80% 65%)" opacity="0.9" />

        {/* Tables */}
        {tables.map((t) => {
          const isSelected = selected === t.id;
          const isHovered = hovered === t.id;
          const fill = isSelected
            ? "url(#gold-grad)"
            : isHovered
            ? "hsl(var(--neon-pink) / 0.35)"
            : "hsl(0 0% 100% / 0.06)";
          const stroke = isSelected
            ? "hsl(var(--gold))"
            : "hsl(0 0% 100% / 0.25)";
          const filter = isSelected ? "drop-shadow(0 0 8px hsl(var(--gold) / 0.9))" : undefined;

          const common = {
            fill,
            stroke,
            strokeWidth: 1.5,
            style: { cursor: "pointer", transition: "all 0.25s", filter } as React.CSSProperties,
            onClick: () => onSelect(t.id),
            onMouseEnter: () => onHover(t.id),
            onMouseLeave: () => onHover(null),
            role: "button",
            "aria-label": `Table ${t.label} in ${zones[t.zone].name}, seats ${t.seats}`,
          };

          return t.shape === "circle" ? (
            <g key={t.id}>
              <circle cx={t.x} cy={t.y} r={t.r} {...common} />
              <text
                x={t.x}
                y={t.y + 4}
                textAnchor="middle"
                fontSize="11"
                fill={isSelected ? "hsl(0 0% 7%)" : "hsl(0 0% 100% / 0.7)"}
                style={{ pointerEvents: "none", fontWeight: 600 }}
              >
                {t.label}
              </text>
            </g>
          ) : (
            <g key={t.id}>
              <rect
                x={t.x}
                y={t.y}
                width={t.w}
                height={t.h}
                rx="6"
                {...common}
              />
              <text
                x={(t.x ?? 0) + (t.w ?? 0) / 2}
                y={(t.y ?? 0) + (t.h ?? 0) / 2 + 4}
                textAnchor="middle"
                fontSize="11"
                fill={isSelected ? "hsl(0 0% 7%)" : "hsl(0 0% 100% / 0.7)"}
                style={{ pointerEvents: "none", fontWeight: 600 }}
              >
                {t.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.3em] text-foreground/55 mt-3">
        <LegendDot color="hsl(var(--neon-pink))" label="Neon" />
        <LegendDot color="hsl(0 70% 60%)" label="VIP" />
        <LegendDot color="hsl(42 80% 65%)" label="Bonsai" />
        <LegendDot color="hsl(var(--copper))" label="Bar" />
        <LegendDot color="hsl(var(--gold))" label="Selected" gold />
      </div>
    </div>
  );
};

const LegendDot = ({ color, label, gold }: { color: string; label: string; gold?: boolean }) => (
  <span className="inline-flex items-center gap-2">
    <span
      className="inline-block h-2 w-2 rounded-full"
      style={{
        background: color,
        boxShadow: gold ? "0 0 8px hsl(var(--gold))" : undefined,
      }}
    />
    {label}
  </span>
);
