import vibeNeon from "@/assets/vibe-neon.jpg";
import vibeBonsai from "@/assets/vibe-bonsai.jpg";

export type ZoneId = "neon" | "bonsai" | "vip" | "bar";

export type Zone = {
  id: ZoneId;
  name: string;
  description: string;
  image: string;
  stroke: string;     // hsl
  glow: string;       // shadow color
};

export type Table = {
  id: string;
  zone: ZoneId;
  label: string;
  title: string;       // "Neon Couch N1"
  seats: number;
  // SVG layout (viewBox 0 0 800 600)
  cx: number;          // center x
  cy: number;          // center y
};

export const zones: Record<ZoneId, Zone> = {
  neon: {
    id: "neon",
    name: "Neon Lounge",
    description: "Beneath the pink Members Only sign, framed by warm wood. Long curved couches, low light.",
    image: vibeNeon,
    stroke: "hsl(338 100% 62%)",
    glow: "hsl(338 100% 62% / 0.55)",
  },
  bonsai: {
    id: "bonsai",
    name: "The Bonsai",
    description: "Three round tables circling the backlit olive bonsai. The luminous heart of the room.",
    image: vibeBonsai,
    stroke: "hsl(42 80% 65%)",
    glow: "hsl(42 90% 65% / 0.55)",
  },
  vip: {
    id: "vip",
    name: "VIP Red Velvet",
    description: "Plush red velvet booths in the most private corner of the lounge.",
    image: vibeNeon,
    stroke: "hsl(0 100% 27%)",          // #8B0000
    glow: "hsl(0 100% 50% / 0.45)",
  },
  bar: {
    id: "bar",
    name: "Copper Bar",
    description: "High seating along the bar, beneath the copper pendant lights.",
    image: vibeNeon,
    stroke: "hsl(19 47% 53%)",          // #C07851
    glow: "hsl(19 70% 55% / 0.5)",
  },
};

export const tables: Table[] = [
  // Neon Lounge — long curved couches across the top
  { id: "N1", zone: "neon", label: "N1", title: "Neon Couch N1", seats: 6, cx: 170, cy: 95 },
  { id: "N2", zone: "neon", label: "N2", title: "Neon Couch N2", seats: 6, cx: 400, cy: 95 },
  { id: "N3", zone: "neon", label: "N3", title: "Neon Couch N3", seats: 6, cx: 630, cy: 95 },

  // Bonsai — perfect triangle around center (400, 320)
  { id: "B1", zone: "bonsai", label: "B1", title: "Bonsai Table B1", seats: 4, cx: 400, cy: 215 }, // top
  { id: "B2", zone: "bonsai", label: "B2", title: "Bonsai Table B2", seats: 4, cx: 305, cy: 380 }, // bottom-left
  { id: "B3", zone: "bonsai", label: "B3", title: "Bonsai Table B3", seats: 4, cx: 495, cy: 380 }, // bottom-right

  // VIP Red Velvet — right side
  { id: "V1", zone: "vip", label: "V1", title: "VIP V1 — Premium Booth", seats: 6, cx: 690, cy: 235 },
  { id: "V2", zone: "vip", label: "V2", title: "VIP V2 — Premium Booth", seats: 6, cx: 690, cy: 330 },
  { id: "V3", zone: "vip", label: "V3", title: "VIP V3 — Premium Booth", seats: 6, cx: 690, cy: 425 },

  // Copper Bar — stools tucked under the curved counter
  { id: "C1", zone: "bar", label: "C1", title: "Bar Seat C1", seats: 2, cx: 180, cy: 555 },
  { id: "C2", zone: "bar", label: "C2", title: "Bar Seat C2", seats: 2, cx: 320, cy: 545 },
  { id: "C3", zone: "bar", label: "C3", title: "Bar Seat C3", seats: 2, cx: 480, cy: 545 },
  { id: "C4", zone: "bar", label: "C4", title: "Bar Seat C4", seats: 2, cx: 620, cy: 555 },
];
