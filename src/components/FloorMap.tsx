import { Table, ZoneId, tables, zones } from "@/data/floorplan";

type Props = {
  selected: string | null;
  onSelect: (id: string) => void;
  hovered: string | null;
  onHover: (id: string | null) => void;
};

const VIEW_W = 800;
const VIEW_H = 600;

/* ---------------- Icon shapes ---------------- */

// Long curved couch (for Neon Lounge) — width 180, height 60
const CouchCurved = ({ filled }: { filled: boolean }) => (
  <g>
    {/* seat back, curved */}
    <path
      d="M -90 -20 Q 0 -50 90 -20 L 90 25 Q 0 5 -90 25 Z"
      fill={filled ? "url(#gold-grad)" : "hsl(0 0% 100% / 0.06)"}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    {/* cushion line */}
    <path
      d="M -75 0 Q 0 -22 75 0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      opacity={0.5}
    />
  </g>
);

// Round table (for Bonsai)
const RoundTable = ({ filled }: { filled: boolean }) => (
  <g>
    <circle
      r={32}
      fill={filled ? "url(#gold-grad)" : "hsl(0 0% 100% / 0.06)"}
      stroke="currentColor"
      strokeWidth={1.5}
    />
    <circle r={20} fill="none" stroke="currentColor" strokeWidth={0.8} opacity={0.4} />
  </g>
);

// Plush VIP couch — wider, with armrests
const PlushCouch = ({ filled }: { filled: boolean }) => (
  <g>
    {/* armrests */}
    <rect x={-58} y={-26} width={14} height={52} rx={6}
      fill={filled ? "url(#gold-grad)" : "hsl(0 0% 100% / 0.08)"} stroke="currentColor" strokeWidth={1.2} />
    <rect x={44} y={-26} width={14} height={52} rx={6}
      fill={filled ? "url(#gold-grad)" : "hsl(0 0% 100% / 0.08)"} stroke="currentColor" strokeWidth={1.2} />
    {/* main seat */}
    <rect x={-46} y={-22} width={92} height={44} rx={10}
      fill={filled ? "url(#gold-grad)" : "hsl(0 0% 100% / 0.06)"} stroke="currentColor" strokeWidth={1.5} />
    {/* tufting lines */}
    <line x1={-20} y1={-12} x2={-20} y2={14} stroke="currentColor" strokeWidth={0.7} opacity={0.4} />
    <line x1={20} y1={-12} x2={20} y2={14} stroke="currentColor" strokeWidth={0.7} opacity={0.4} />
  </g>
);

// Bar seating unit — counter + 2 stools
const BarUnit = ({ filled }: { filled: boolean }) => (
  <g>
    {/* counter */}
    <rect x={-40} y={-20} width={80} height={14} rx={4}
      fill={filled ? "url(#gold-grad)" : "hsl(0 0% 100% / 0.08)"} stroke="currentColor" strokeWidth={1.5} />
    {/* stools */}
    <circle cx={-22} cy={14} r={11}
      fill={filled ? "url(#gold-grad)" : "hsl(0 0% 100% / 0.06)"} stroke="currentColor" strokeWidth={1.3} />
    <circle cx={22} cy={14} r={11}
      fill={filled ? "url(#gold-grad)" : "hsl(0 0% 100% / 0.06)"} stroke="currentColor" strokeWidth={1.3} />
  </g>
);

// Stylized bonsai tree icon (center)
const BonsaiIcon = () => (
  <g transform="translate(400 320)">
    {/* glow halo */}
    <circle r={70} fill="url(#bonsai-halo)" />
    {/* pot */}
    <path
      d="M -22 22 L 22 22 L 18 34 L -18 34 Z"
      fill="hsl(19 47% 30%)"
      stroke="hsl(19 47% 53%)"
      strokeWidth={1}
    />
    {/* trunk */}
    <path d="M 0 22 C -2 10 4 0 0 -10" stroke="hsl(25 35% 30%)" strokeWidth={3} fill="none" strokeLinecap="round" />
    {/* canopy clusters */}
    <g fill="hsl(130 35% 30%)" stroke="hsl(42 80% 65%)" strokeWidth={0.8} opacity={0.95}>
      <ellipse cx={-18} cy={-14} rx={16} ry={10} />
      <ellipse cx={16} cy={-18} rx={18} ry={11} />
      <ellipse cx={0} cy={-26} rx={14} ry={9} />
      <ellipse cx={-6} cy={-6} rx={12} ry={8} />
    </g>
    {/* tiny gold leaves */}
    <g fill="hsl(42 90% 70%)" opacity={0.9}>
      <circle cx={-12} cy={-20} r={1.2} />
      <circle cx={6} cy={-24} r={1.2} />
      <circle cx={14} cy={-12} r={1.2} />
      <circle cx={-4} cy={-2} r={1.2} />
    </g>
  </g>
);

/* ---------------- Renderer ---------------- */

const renderIcon = (zone: ZoneId, filled: boolean) => {
  switch (zone) {
    case "neon": return <CouchCurved filled={filled} />;
    case "bonsai": return <RoundTable filled={filled} />;
    case "vip": return <PlushCouch filled={filled} />;
    case "bar": return <BarUnit filled={filled} />;
  }
};

export const FloorMap = ({ selected, onSelect, hovered, onHover }: Props) => {
  return (
    <div className="glass-strong rounded-2xl p-3 md:p-5">
      {/* Map title */}
      <div className="flex items-center justify-between px-2 mb-3">
        <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/55">Floor Plan</p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 md:hidden">↔ scroll</p>
      </div>

      {/* Scroll container on mobile */}
      <div className="overflow-x-auto -mx-1 px-1">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="block min-w-[640px] w-full h-auto"
          role="img"
          aria-label="Members Only floor plan with selectable tables"
          style={{ touchAction: "pan-x pan-y pinch-zoom" }}
        >
          <defs>
            <linearGradient id="gold-grad" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(42 95% 75%)" />
              <stop offset="100%" stopColor="hsl(35 80% 50%)" />
            </linearGradient>
            <radialGradient id="bonsai-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(42 90% 65% / 0.45)" />
              <stop offset="100%" stopColor="hsl(42 90% 65% / 0)" />
            </radialGradient>
            <radialGradient id="vip-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(0 100% 40% / 0.18)" />
              <stop offset="100%" stopColor="hsl(0 100% 40% / 0)" />
            </radialGradient>
            <filter id="glow-sm" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-gold" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Floor base */}
          <rect x="10" y="10" width={VIEW_W - 20} height={VIEW_H - 20} rx="18"
            fill="hsl(0 0% 3%)" stroke="hsl(0 0% 100% / 0.06)" strokeWidth="1" />

          {/* Zone hint regions (very subtle) */}
          <rect x="40" y="40" width="560" height="120" rx="14" fill="hsl(338 100% 62% / 0.04)" />
          <rect x="635" y="180" width="135" height="300" rx="14" fill="url(#vip-halo)" />
          <rect x="635" y="180" width="135" height="300" rx="14" fill="hsl(0 100% 27% / 0.08)" />
          <rect x="40" y="490" width="560" height="80" rx="14" fill="hsl(19 47% 53% / 0.05)" />

          {/* Bonsai centerpiece */}
          <BonsaiIcon />

          {/* Zone labels (positioned in dead-space, never on tables) */}
          <text x="50" y="34" fill="hsl(338 100% 62% / 0.7)" fontSize="11" letterSpacing="4">NEON LOUNGE</text>
          <text x="645" y="172" fill="hsl(0 100% 70% / 0.75)" fontSize="11" letterSpacing="4">VIP</text>
          <text x="50" y="484" fill="hsl(19 60% 65% / 0.8)" fontSize="11" letterSpacing="4">COPPER BAR</text>
          <text x="345" y="455" fill="hsl(42 80% 70% / 0.75)" fontSize="11" letterSpacing="4">THE BONSAI</text>

          {/* Tables */}
          {tables.map((t) => (
            <TableNode
              key={t.id}
              table={t}
              selected={selected === t.id}
              hovered={hovered === t.id}
              onSelect={onSelect}
              onHover={onHover}
            />
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.3em] text-foreground/55 mt-4">
        <LegendDot color="hsl(338 100% 62%)" label="Pink · Neon Lounge" />
        <LegendDot color="hsl(42 80% 65%)" label="Gold · Bonsai" />
        <LegendDot color="hsl(0 100% 50%)" label="Red · VIP" />
        <LegendDot color="hsl(19 47% 53%)" label="Copper · Bar" />
        <LegendDot color="hsl(var(--gold))" label="Filled · Selected" gold />
      </div>
    </div>
  );
};

/* ---------------- Table node ---------------- */

const TableNode = ({
  table,
  selected,
  hovered,
  onSelect,
  onHover,
}: {
  table: Table;
  selected: boolean;
  hovered: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) => {
  const zone = zones[table.zone];
  const color = selected ? "hsl(var(--gold))" : zone.stroke;
  const filter = selected ? "url(#glow-gold)" : "url(#glow-sm)";
  // breathing animation for available tables
  const animationName = selected ? "selected-pulse" : `breathe-${table.zone}`;

  return (
    <g
      transform={`translate(${table.cx} ${table.cy}) scale(${selected ? 1.05 : hovered ? 1.03 : 1})`}
      style={{
        cursor: "pointer",
        transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        color,
        filter,
        animation: `${animationName} 3.2s ease-in-out infinite`,
        transformOrigin: `${table.cx}px ${table.cy}px`,
        transformBox: "fill-box" as any,
      }}
      onClick={() => onSelect(table.id)}
      onMouseEnter={() => onHover(table.id)}
      onMouseLeave={() => onHover(null)}
      role="button"
      aria-label={`${table.title}, seats ${table.seats}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(table.id);
        }
      }}
    >
      {/* Invisible 44px touch target */}
      <circle r={28} fill="transparent" />
      {renderIcon(table.zone, selected)}
      <text
        x={0}
        y={4}
        textAnchor="middle"
        fontSize="13"
        fontWeight={700}
        fill={selected ? "hsl(0 0% 7%)" : "hsl(0 0% 100% / 0.85)"}
        style={{ pointerEvents: "none", letterSpacing: "1px" }}
      >
        {table.label}
      </text>
    </g>
  );
};

const LegendDot = ({ color, label, gold }: { color: string; label: string; gold?: boolean }) => (
  <span className="inline-flex items-center gap-2">
    <span
      className="inline-block h-2 w-2 rounded-full"
      style={{
        background: color,
        boxShadow: gold ? "0 0 8px hsl(var(--gold))" : `0 0 6px ${color}`,
      }}
    />
    {label}
  </span>
);
