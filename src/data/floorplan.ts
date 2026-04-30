import vibeNeon from "@/assets/vibe-neon.jpg";
import vibeBonsai from "@/assets/vibe-bonsai.jpg";

export type Zone = {
  id: "bonsai" | "neon" | "vip" | "bar";
  name: string;
  description: string;
  image: string;
};

export type Table = {
  id: string;
  zone: Zone["id"];
  label: string;
  seats: number;
  // SVG layout (viewBox 0 0 600 400)
  shape: "circle" | "rect";
  x: number;
  y: number;
  w?: number;
  h?: number;
  r?: number;
};

export const zones: Record<Zone["id"], Zone> = {
  bonsai: {
    id: "bonsai",
    name: "The Bonsai Area",
    description: "Around the backlit olive tree — the calm, luminous heart of the lounge.",
    image: vibeBonsai,
  },
  neon: {
    id: "neon",
    name: "Neon Lounge",
    description: "Beneath the pink Members Only sign, framed by warm wood paneling.",
    image: vibeNeon,
  },
  vip: {
    id: "vip",
    name: "VIP Red Velvet",
    description: "Premium booths in deep red velvet — the most private corner of the room.",
    image: vibeNeon,
  },
  bar: {
    id: "bar",
    name: "Copper Bar",
    description: "High seating along the bar, under the copper pendant lights.",
    image: vibeNeon,
  },
};

export const tables: Table[] = [
  // Bonsai area (center)
  { id: "B1", zone: "bonsai", label: "B1", seats: 4, shape: "circle", x: 300, y: 200, r: 26 },
  { id: "B2", zone: "bonsai", label: "B2", seats: 2, shape: "circle", x: 230, y: 240, r: 20 },
  { id: "B3", zone: "bonsai", label: "B3", seats: 2, shape: "circle", x: 370, y: 240, r: 20 },

  // Neon lounge (top wall)
  { id: "N1", zone: "neon", label: "N1", seats: 4, shape: "rect", x: 90, y: 60, w: 90, h: 40 },
  { id: "N2", zone: "neon", label: "N2", seats: 4, shape: "rect", x: 220, y: 60, w: 90, h: 40 },
  { id: "N3", zone: "neon", label: "N3", seats: 4, shape: "rect", x: 350, y: 60, w: 90, h: 40 },

  // VIP red velvet (right side)
  { id: "V1", zone: "vip", label: "V1", seats: 6, shape: "rect", x: 480, y: 130, w: 80, h: 60 },
  { id: "V2", zone: "vip", label: "V2", seats: 6, shape: "rect", x: 480, y: 220, w: 80, h: 60 },

  // Bar (bottom)
  { id: "C1", zone: "bar", label: "C1", seats: 2, shape: "circle", x: 130, y: 340, r: 18 },
  { id: "C2", zone: "bar", label: "C2", seats: 2, shape: "circle", x: 200, y: 340, r: 18 },
  { id: "C3", zone: "bar", label: "C3", seats: 2, shape: "circle", x: 270, y: 340, r: 18 },
  { id: "C4", zone: "bar", label: "C4", seats: 2, shape: "circle", x: 340, y: 340, r: 18 },
];
