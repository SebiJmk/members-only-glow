import { Table, ZoneId, tables, zones } from "@/data/floorplan";

type Props = {
  selected: string | null;
  onSelect: (id: string) => void;
  hovered: string | null;
  onHover: (id: string | null) => void;
};

const VIEW_W = 900;
const VIEW_H = 720;

/* ============================================================
   Realistic top-down furniture pieces.
   All pieces are centered at (0,0) so the parent <g translate>
   is the only positional transform — preventing hover jitter.
   ============================================================ */

// NEON LOUNGE — long curved C-shaped booth with segmented cushions
const NeonBooth = ({ filled }: { filled: boolean }) => (
  <g>
    <path
      d="M -120 -32 Q 0 -70 120 -32 L 120 4 Q 0 -32 -120 4 Z"
      fill={filled ? "url(#gold-grad)" : "hsl(0 0% 9%)"}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <path
      d="M -110 4 Q 0 -22 110 4 L 110 28 Q 0 0 -110 28 Z"
      fill={filled ? "url(#gold-grad-soft)" : "hsl(0 0% 12%)"}
      stroke="currentColor"
      strokeWidth={1.2}
      opacity={0.95}
    />
    {/* segmented cushion lines */}
    <line x1={-60} y1={-12} x2={-60} y2={22} stroke="currentColor" strokeWidth={0.7} opacity={0.5} />
    <line x1={0}   y1={-20} x2={0}   y2={24} stroke="currentColor" strokeWidth={0.7} opacity={0.5} />
    <line x1={60}  y1={-12} x2={60}  y2={22} stroke="currentColor" strokeWidth={0.7} opacity={0.5} />
    {/* low table in front */}
    <ellipse cx={0} cy={42} rx={46} ry={9}
      fill="hsl(25 35% 18%)" stroke="hsl(42 60% 55% / 0.5)" strokeWidth={0.8} />
  </g>
);

// VIP — U-shaped velvet booth around a small table
const VipBooth = ({ filled }: { filled: boolean }) => (
  <g>
    <path
      d="M -60 -40 L -60 28 Q -60 38 -50 38 L 50 38 Q 60 38 60 28 L 60 -40 Q 60 -48 52 -48 L 42 -48 L 42 22 L -42 22 L -42 -48 L -52 -48 Q -60 -48 -60 -40 Z"
      fill={filled ? "url(#gold-grad)" : "hsl(0 60% 18%)"}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinejoin="round"
    />
    {/* tufting */}
    <g fill={filled ? "hsl(0 0% 7% / 0.5)" : "hsl(0 80% 38% / 0.7)"}>
      <circle cx={-40} cy={-22} r={1.4} />
      <circle cx={-20} cy={-22} r={1.4} />
      <circle cx={0}   cy={-22} r={1.4} />
      <circle cx={20}  cy={-22} r={1.4} />
      <circle cx={40}  cy={-22} r={1.4} />
      <circle cx={-48} cy={0}   r={1.4} />
      <circle cx={48}  cy={0}   r={1.4} />
      <circle cx={-48} cy={18}  r={1.4} />
      <circle cx={48}  cy={18}  r={1.4} />
    </g>
    {/* table */}
    <circle cx={0} cy={-2} r={14}
      fill="hsl(25 35% 16%)" stroke="hsl(42 60% 55% / 0.6)" strokeWidth={0.8} />
    <circle cx={0} cy={-2} r={8}
      fill="none" stroke="hsl(42 60% 55% / 0.4)" strokeWidth={0.5} />
  </g>
);

// BONSAI — wood round table with 4 chair circles tucked around it
const BonsaiSet = ({ filled }: { filled: boolean }) => (
  <g>
    {[0, 90, 180, 270].map((a) => {
      const r = 38;
      const rad = (a * Math.PI) / 180;
      return (
        <circle
          key={a}
          cx={Math.cos(rad) * r}
          cy={Math.sin(rad) * r}
          r={10}
          fill={filled ? "url(#gold-grad-soft)" : "hsl(0 0% 11%)"}
          stroke="currentColor"
          strokeWidth={1.1}
        />
      );
    })}
    <circle r={24}
      fill={filled ? "url(#gold-grad)" : "url(#wood-grad)"}
      stroke="currentColor"
      strokeWidth={1.6} />
    <circle r={17} fill="none" stroke="hsl(25 40% 35% / 0.5)" strokeWidth={0.6} />
    <circle r={11} fill="none" stroke="hsl(25 40% 35% / 0.4)" strokeWidth={0.5} />
    <circle r={5}  fill="none" stroke="hsl(25 40% 35% / 0.4)" strokeWidth={0.5} />
  </g>
);

// COPPER BAR — single stool seat (counter is drawn separately)
const BarStool = ({ filled }: { filled: boolean }) => (
  <g>
    <circle r={14}
      fill={filled ? "url(#gold-grad)" : "hsl(0 0% 10%)"}
      stroke="currentColor"
      strokeWidth={1.4} />
    <circle r={8}
      fill="none" stroke="currentColor" strokeWidth={0.7} opacity={0.55} />
    <circle r={3.5} fill="currentColor" opacity={filled ? 0.3 : 0.55} />
  </g>
);

// Continuous curved copper bar counter, drawn beneath the stools
const CopperBarCounter = () => (
  <g>
    <path
      d="M 70 660 Q 450 600 830 660 L 830 690 Q 450 632 70 690 Z"
      fill="hsl(19 35% 14%)"
      stroke="hsl(19 60% 55%)"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <path
      d="M 80 663 Q 450 608 820 663"
      fill="none"
      stroke="hsl(30 80% 70% / 0.55)"
      strokeWidth={0.8}
    />
    {/* pendant lights */}
    <g opacity={0.85}>
      {[200, 450, 700].map((x) => (
        <g key={x}>
          <line x1={x} y1={585} x2={x} y2={605} stroke="hsl(19 60% 55% / 0.5)" strokeWidth={0.6} />
          <circle cx={x} cy={609} r={3} fill="hsl(30 90% 65%)" />
        </g>
      ))}
    </g>
  </g>
);

// Stylized bonsai centerpiece
const BonsaiIcon = () => (
  <g transform="translate(450 380)">
    <circle r={66} fill="url(#bonsai-halo)" />
    <path d="M -22 22 L 22 22 L 18 34 L -18 34 Z"
      fill="hsl(19 47% 30%)" stroke="hsl(19 47% 53%)" strokeWidth={1} />
    <path d="M 0 22 C -2 10 4 0 0 -10"
      stroke="hsl(25 35% 30%)" strokeWidth={3} fill="none" strokeLinecap="round" />
    <g fill="hsl(130 35% 30%)" stroke="hsl(42 80% 65%)" strokeWidth={0.8}>
      <ellipse cx={-18} cy={-14} rx={16} ry={10} />
      <ellipse cx={16}  cy={-18} rx={18} ry={11} />
      <ellipse cx={0}   cy={-26} rx={14} ry={9} />
      <ellipse cx={-6}  cy={-6}  rx={12} ry={8} />
    </g>
    <g fill="hsl(42 90% 70%)">
      <circle cx={-12} cy={-20} r={1.2} />
      <circle cx={6}   cy={-24} r={1.2} />
      <circle cx={14}  cy={-12} r={1.2} />
      <circle cx={-4}  cy={-2}  r={1.2} />
    </g>
  </g>
);

const renderIcon = (zone: ZoneId, filled: boolean) => {
  switch (zone) {
    case "neon":   return <NeonBooth filled={filled} />;
    case "bonsai": return <BonsaiSet filled={filled} />;
    case "vip":    return <VipBooth filled={filled} />;
    case "bar":    return <BarStool filled={filled} />;
  }
};

/* Per-zone hit-box radius — must NOT overlap neighboring tables */
const hitRadius: Record<ZoneId, number> = {
  neon: 60,
  bonsai: 46,
  vip: 56,
  bar: 22,
};

export const FloorMap = ({ selected, onSelect, hovered, onHover }: Props) => (
  <div className="glass-strong rounded-2xl p-3 md:p-5">
    {/* Header */}
    <div className="flex items-center justify-between gap-3 px-2 mb-3 flex-wrap">
      <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/55">Floor Plan</p>
      <p className="text-[10px] uppercase tracking-[0.32em] text-gold/80">
        Tap a table to select · pinch to zoom
      </p>
    </div>

    {/* Swipe-to-pan container — preserves true icon size on mobile */}
    <div className="relative">
      <div
        className="-mx-1 px-1"
        style={{ touchAction: "pinch-zoom" }}
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMid meet"
          className="block h-auto select-none w-full"
          role="img"
          aria-label="Members Only floor plan with selectable tables"
        >
          <defs>
            <linearGradient id="gold-grad" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%"   stopColor="hsl(35 80% 60% / 0.55)" />
              <stop offset="100%" stopColor="hsl(19 47% 53% / 0.55)" />
            </linearGradient>
            <linearGradient id="gold-grad-soft" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%"   stopColor="hsl(35 80% 60% / 0.35)" />
              <stop offset="100%" stopColor="hsl(19 47% 53% / 0.35)" />
            </linearGradient>
            <linearGradient id="wood-grad" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%"   stopColor="hsl(25 40% 28%)" />
              <stop offset="100%" stopColor="hsl(25 35% 18%)" />
            </linearGradient>
            <radialGradient id="bonsai-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="hsl(42 90% 65% / 0.4)" />
              <stop offset="100%" stopColor="hsl(42 90% 65% / 0)" />
            </radialGradient>
            <radialGradient id="vip-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="hsl(0 100% 40% / 0.18)" />
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
          </defs>

          {/* Floor base */}
          <rect x="10" y="10" width={VIEW_W - 20} height={VIEW_H - 20} rx="20"
            fill="hsl(0 0% 4%)" stroke="hsl(0 0% 100% / 0.06)" strokeWidth="1" />

          {/* Zone tints */}
          <rect x="40"  y="40"  width="640" height="140" rx="16" fill="hsl(338 100% 62% / 0.04)" />
          <rect x="710" y="200" width="150" height="400" rx="16" fill="url(#vip-halo)" />
          <rect x="710" y="200" width="150" height="400" rx="16" fill="hsl(0 100% 27% / 0.07)" />

          {/* Bar counter + bonsai */}
          <CopperBarCounter />
          <BonsaiIcon />

          {/* Zone labels — placed only in dead-space */}
          <text x="50"  y="34"  fill="hsl(338 100% 62% / 0.7)" fontSize="12" letterSpacing="5">NEON LOUNGE</text>
          <text x="720" y="192" fill="hsl(0 100% 70% / 0.75)" fontSize="12" letterSpacing="5">VIP</text>
          <text x="50"  y="580" fill="hsl(19 60% 65% / 0.8)"  fontSize="12" letterSpacing="5">COPPER BAR</text>
          <text x="385" y="555" fill="hsl(42 80% 70% / 0.75)" fontSize="12" letterSpacing="5">THE BONSAI</text>

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
    </div>

    {/* Legend */}
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.3em] text-foreground/55 mt-4">
      <LegendDot color="hsl(338 100% 62%)" label="Pink · Neon" />
      <LegendDot color="hsl(42 80% 65%)"   label="Gold · Bonsai" />
      <LegendDot color="hsl(0 100% 50%)"   label="Red · VIP" />
      <LegendDot color="hsl(19 60% 58%)"   label="Copper · Bar" />
      <LegendDot color="hsl(var(--gold))"  label="Filled · Selected" gold />
    </div>
  </div>
);

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

  // Inner scale (around local origin 0,0) — never moves the group's translate.
  const scale = selected ? 1.05 : hovered ? 1.03 : 1;

  return (
    <g
      transform={`translate(${table.cx} ${table.cy})`}
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
      style={{ cursor: "pointer", color }}
    >
      {/* Hit area: single solid circle, sized per zone. pointer-events only on this + furniture. */}
      <circle r={hitRadius[table.zone]} fill="transparent" pointerEvents="all" />

      {/* Furniture scales around (0,0) — no positional translate, no jitter */}
      <g
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
          transformBox: "fill-box" as any,
          transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
          filter: selected ? "url(#glow-gold)" : "url(#glow-sm)",
          pointerEvents: "none",
        }}
      >
        {renderIcon(table.zone, selected)}
      </g>

      {/* Label — small, centered, fixed in place (does not move on hover/select) */}
      <text
        textAnchor="middle"
        y={4}
        fontSize="13"
        fontWeight={700}
        fill={selected ? "hsl(42 95% 75%)" : "hsl(0 0% 100% / 0.9)"}
        style={{
          pointerEvents: "none",
          letterSpacing: "1px",
          transition: "fill 220ms ease",
        }}
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
