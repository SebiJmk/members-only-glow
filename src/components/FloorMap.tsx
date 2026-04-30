import { Table, ZoneId, tables, zones } from "@/data/floorplan";

type Props = {
  selected: string | null;
  onSelect: (id: string) => void;
  hovered: string | null;
  onHover: (id: string | null) => void;
};

const VIEW_W = 800;
const VIEW_H = 640;

/* ==========================================================
   Realistic top-down furniture pieces
   Each piece is centered at (0,0) and uses currentColor for stroke.
   Selected state swaps fill to a gold gradient + gold stroke.
   ========================================================== */

// NEON LOUNGE — Long curved C-shaped booth with segmented cushions
const NeonBooth = ({ filled }: { filled: boolean }) => (
  <g>
    {/* outer plush back (curved C) */}
    <path
      d="M -110 -28 Q 0 -64 110 -28 L 110 6 Q 0 -30 -110 6 Z"
      fill={filled ? "url(#gold-grad)" : "hsl(0 0% 9%)"}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
      filter={filled ? undefined : "url(#neon-edge)"}
    />
    {/* seat cushion row */}
    <path
      d="M -100 4 Q 0 -22 100 4 L 100 26 Q 0 0 -100 26 Z"
      fill={filled ? "url(#gold-grad-soft)" : "hsl(0 0% 12%)"}
      stroke="currentColor"
      strokeWidth={1.2}
      opacity={0.95}
    />
    {/* segmented cushion divisions */}
    <path d="M -55 -10 Q -55 8 -55 22" stroke="currentColor" strokeWidth={0.8} opacity={0.55} fill="none" />
    <path d="M 0 -18 Q 0 6 0 24" stroke="currentColor" strokeWidth={0.8} opacity={0.55} fill="none" />
    <path d="M 55 -10 Q 55 8 55 22" stroke="currentColor" strokeWidth={0.8} opacity={0.55} fill="none" />
    {/* low table in front */}
    <ellipse cx={0} cy={36} rx={42} ry={9}
      fill="hsl(25 35% 18%)" stroke="hsl(42 60% 55% / 0.5)" strokeWidth={0.8} />
  </g>
);

// VIP — U-shaped velvet booth
const VipBooth = ({ filled }: { filled: boolean }) => (
  <g>
    {/* U-shaped plush couch */}
    <path
      d="M -56 -34 L -56 28 Q -56 36 -48 36 L 48 36 Q 56 36 56 28 L 56 -34 Q 56 -42 48 -42 L 40 -42 L 40 22 L -40 22 L -40 -42 L -48 -42 Q -56 -42 -56 -34 Z"
      fill={filled ? "url(#gold-grad)" : "hsl(0 60% 18%)"}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinejoin="round"
      style={{
        filter: filled
          ? "drop-shadow(0 0 8px hsl(var(--gold) / 0.6))"
          : "drop-shadow(inset 0 0 6px hsl(0 0% 0% / 0.6))",
      }}
    />
    {/* velvet tufting dots */}
    <g fill={filled ? "hsl(0 0% 7% / 0.5)" : "hsl(0 80% 35% / 0.7)"}>
      <circle cx={-38} cy={-20} r={1.4} />
      <circle cx={-20} cy={-20} r={1.4} />
      <circle cx={0}   cy={-20} r={1.4} />
      <circle cx={20}  cy={-20} r={1.4} />
      <circle cx={38}  cy={-20} r={1.4} />
      <circle cx={-44} cy={0}   r={1.4} />
      <circle cx={44}  cy={0}   r={1.4} />
      <circle cx={-44} cy={16}  r={1.4} />
      <circle cx={44}  cy={16}  r={1.4} />
    </g>
    {/* center round table */}
    <circle cx={0} cy={0} r={14}
      fill="hsl(25 35% 16%)" stroke="hsl(42 60% 55% / 0.6)" strokeWidth={0.8} />
    <circle cx={0} cy={0} r={9} fill="none" stroke="hsl(42 60% 55% / 0.4)" strokeWidth={0.5} />
  </g>
);

// BONSAI — round wood table surrounded by 4 chairs
const BonsaiSet = ({ filled }: { filled: boolean }) => (
  <g>
    {/* 4 chairs around */}
    {[0, 90, 180, 270].map((a) => {
      const r = 36;
      const rad = (a * Math.PI) / 180;
      const x = Math.cos(rad) * r;
      const y = Math.sin(rad) * r;
      return (
        <circle
          key={a}
          cx={x}
          cy={y}
          r={9}
          fill={filled ? "url(#gold-grad-soft)" : "hsl(0 0% 11%)"}
          stroke="currentColor"
          strokeWidth={1.1}
        />
      );
    })}
    {/* wood-textured round table */}
    <circle r={22}
      fill={filled ? "url(#gold-grad)" : "url(#wood-grad)"}
      stroke="currentColor"
      strokeWidth={1.6} />
    {/* wood rings */}
    <circle r={16} fill="none" stroke="hsl(25 40% 35% / 0.5)" strokeWidth={0.6} />
    <circle r={10} fill="none" stroke="hsl(25 40% 35% / 0.4)" strokeWidth={0.5} />
    <circle r={5}  fill="none" stroke="hsl(25 40% 35% / 0.4)" strokeWidth={0.5} />
  </g>
);

// COPPER BAR — single curved bar with a stool tucked under it (per unit)
const BarStool = ({ filled }: { filled: boolean }) => (
  <g>
    {/* stool seat */}
    <circle r={13}
      fill={filled ? "url(#gold-grad)" : "hsl(0 0% 10%)"}
      stroke="currentColor"
      strokeWidth={1.4} />
    <circle r={7} fill="none" stroke="currentColor" strokeWidth={0.7} opacity={0.5} />
    {/* footrest ring */}
    <circle r={4} fill="currentColor" opacity={filled ? 0.3 : 0.55} />
  </g>
);

// Continuous curved bar counter (drawn once behind stools)
const CopperBarCounter = () => (
  <g>
    {/* main curved counter */}
    <path
      d="M 70 555 Q 400 510 730 555 L 730 580 Q 400 538 70 580 Z"
      fill="hsl(19 35% 14%)"
      stroke="hsl(19 60% 55%)"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    {/* glossy top edge */}
    <path
      d="M 80 558 Q 400 518 720 558"
      fill="none"
      stroke="hsl(30 80% 70% / 0.55)"
      strokeWidth={0.8}
    />
    {/* pendant lights above bar */}
    <g opacity={0.85}>
      <line x1={180} y1={500} x2={180} y2={520} stroke="hsl(19 60% 55% / 0.5)" strokeWidth={0.6} />
      <circle cx={180} cy={524} r={3} fill="hsl(30 90% 65%)" />
      <line x1={400} y1={500} x2={400} y2={510} stroke="hsl(19 60% 55% / 0.5)" strokeWidth={0.6} />
      <circle cx={400} cy={514} r={3} fill="hsl(30 90% 65%)" />
      <line x1={620} y1={500} x2={620} y2={520} stroke="hsl(19 60% 55% / 0.5)" strokeWidth={0.6} />
      <circle cx={620} cy={524} r={3} fill="hsl(30 90% 65%)" />
    </g>
  </g>
);

// Stylized bonsai centerpiece
const BonsaiIcon = () => (
  <g transform="translate(400 320)">
    <circle r={62} fill="url(#bonsai-halo)" />
    {/* pot */}
    <path d="M -22 22 L 22 22 L 18 34 L -18 34 Z"
      fill="hsl(19 47% 30%)" stroke="hsl(19 47% 53%)" strokeWidth={1} />
    {/* trunk */}
    <path d="M 0 22 C -2 10 4 0 0 -10" stroke="hsl(25 35% 30%)" strokeWidth={3} fill="none" strokeLinecap="round" />
    {/* canopy */}
    <g fill="hsl(130 35% 30%)" stroke="hsl(42 80% 65%)" strokeWidth={0.8}>
      <ellipse cx={-18} cy={-14} rx={16} ry={10} />
      <ellipse cx={16} cy={-18} rx={18} ry={11} />
      <ellipse cx={0} cy={-26} rx={14} ry={9} />
      <ellipse cx={-6} cy={-6} rx={12} ry={8} />
    </g>
    <g fill="hsl(42 90% 70%)">
      <circle cx={-12} cy={-20} r={1.2} />
      <circle cx={6} cy={-24} r={1.2} />
      <circle cx={14} cy={-12} r={1.2} />
      <circle cx={-4} cy={-2} r={1.2} />
    </g>
  </g>
);

const renderIcon = (zone: ZoneId, filled: boolean) => {
  switch (zone) {
    case "neon": return <NeonBooth filled={filled} />;
    case "bonsai": return <BonsaiSet filled={filled} />;
    case "vip": return <VipBooth filled={filled} />;
    case "bar": return <BarStool filled={filled} />;
  }
};

export const FloorMap = ({ selected, onSelect, hovered, onHover }: Props) => {
  return (
    <div className="glass-strong rounded-2xl p-3 md:p-5">
      {/* Header */}
      <div className="flex items-center justify-between px-2 mb-3">
        <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/55">Floor Plan</p>
        <p className="text-[10px] uppercase tracking-[0.35em] text-gold/80">Tap a table to select</p>
      </div>

      {/* Fluid SVG — no horizontal scrolling */}
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="block w-full h-auto select-none"
        role="img"
        aria-label="Members Only floor plan with selectable tables"
      >
        <defs>
          <linearGradient id="gold-grad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(42 95% 75% / 0.85)" />
            <stop offset="100%" stopColor="hsl(35 80% 50% / 0.85)" />
          </linearGradient>
          <linearGradient id="gold-grad-soft" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(42 95% 75% / 0.55)" />
            <stop offset="100%" stopColor="hsl(35 80% 50% / 0.55)" />
          </linearGradient>
          <linearGradient id="wood-grad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(25 40% 28%)" />
            <stop offset="100%" stopColor="hsl(25 35% 18%)" />
          </linearGradient>
          <radialGradient id="bonsai-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(42 90% 65% / 0.4)" />
            <stop offset="100%" stopColor="hsl(42 90% 65% / 0)" />
          </radialGradient>
          <radialGradient id="vip-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(0 100% 40% / 0.18)" />
            <stop offset="100%" stopColor="hsl(0 100% 40% / 0)" />
          </radialGradient>
          <filter id="glow-sm" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-gold" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="neon-edge" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Floor base */}
        <rect x="10" y="10" width={VIEW_W - 20} height={VIEW_H - 20} rx="18"
          fill="hsl(0 0% 4%)" stroke="hsl(0 0% 100% / 0.06)" strokeWidth="1" />

        {/* Subtle zone tints */}
        <rect x="40" y="40" width="560" height="120" rx="14" fill="hsl(338 100% 62% / 0.04)" />
        <rect x="635" y="180" width="135" height="320" rx="14" fill="url(#vip-halo)" />
        <rect x="635" y="180" width="135" height="320" rx="14" fill="hsl(0 100% 27% / 0.07)" />

        {/* Bar counter + bonsai */}
        <CopperBarCounter />
        <BonsaiIcon />

        {/* Zone labels — placed in dead-space only */}
        <text x="50" y="34" fill="hsl(338 100% 62% / 0.7)" fontSize="11" letterSpacing="4">NEON LOUNGE</text>
        <text x="645" y="172" fill="hsl(0 100% 70% / 0.75)" fontSize="11" letterSpacing="4">VIP</text>
        <text x="50" y="494" fill="hsl(19 60% 65% / 0.8)" fontSize="11" letterSpacing="4">COPPER BAR</text>
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

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.3em] text-foreground/55 mt-4">
        <LegendDot color="hsl(338 100% 62%)" label="Pink · Neon" />
        <LegendDot color="hsl(42 80% 65%)" label="Gold · Bonsai" />
        <LegendDot color="hsl(0 100% 50%)" label="Red · VIP" />
        <LegendDot color="hsl(19 47% 53%)" label="Copper · Bar" />
        <LegendDot color="hsl(var(--gold))" label="Filled · Selected" gold />
      </div>
    </div>
  );
};

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
      {/* Larger transparent touch target for mobile */}
      <circle r={36} fill="transparent" />
      {renderIcon(table.zone, selected)}
      <text
        x={0}
        y={4}
        textAnchor="middle"
        fontSize="12"
        fontWeight={700}
        fill={selected ? "hsl(0 0% 7%)" : "hsl(0 0% 100% / 0.9)"}
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
