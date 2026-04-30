import vibeNeon from "@/assets/vibe-neon.jpg";
import vibeBonsai from "@/assets/vibe-bonsai.jpg";

export type ZoneId = "neon" | "bonsai" | "vip" | "bar";

export type Zone = {
  id: ZoneId;
  name: string;
  description: string;
  image: string;
  stroke: string;
  glow: string;
};

export type Table = {
  id: string;
  zone: ZoneId;
  label: string;
  title: string;
  seats: number;
  cx: number;
  cy: number;
};

export const zones: Record<ZoneId, Zone> = {
  neon: {
    id: "neon",
    name: "Neon Lounge",
    description:
      "Beneath the pink Members Only sign, framed by warm wood. Long curved couches, low light, the loudest corner of the room.",
    image: vibeNeon,
    stroke: "hsl(338 100% 62%)",
    glow: "hsl(338 100% 62% / 0.55)",
  },
  bonsai: {
    id: "bonsai",
    name: "The Bonsai",
    description:
      "Three round wood tables circling the backlit olive bonsai. The luminous, conversational heart of the lounge.",
    image: vibeBonsai,
    stroke: "hsl(42 80% 65%)",
    glow: "hsl(42 90% 65% / 0.55)",
  },
  vip: {
    id: "vip",
    name: "VIP Red Velvet",
    description:
      "Plush red velvet booths in the most private corner. Minimum spend applies. Discreet service, deep shadows.",
    image: vibeNeon,
    stroke: "hsl(0 100% 32%)",
    glow: "hsl(0 100% 50% / 0.45)",
  },
  bar: {
    id: "bar",
    name: "Copper Bar",
    description:
      "High seating along the curved bar, beneath copper pendant lights. Best seat to watch the bartenders work.",
    image: vibeNeon,
    stroke: "hsl(19 60% 58%)",
    glow: "hsl(19 70% 55% / 0.5)",
  },
};

/* ViewBox is 900 x 720 — generous breathing room between zones. */
export const tables: Table[] = [
  // Neon Lounge — top, well spaced
  { id: "N1", zone: "neon",   label: "N1", title: "Neon Couch N1", seats: 6, cx: 180, cy: 110 },
  { id: "N2", zone: "neon",   label: "N2", title: "Neon Couch N2", seats: 6, cx: 450, cy: 110 },
  { id: "N3", zone: "neon",   label: "N3", title: "Neon Couch N3", seats: 6, cx: 720, cy: 110 },

  // Bonsai — perfect triangle around (450, 380)
  { id: "B1", zone: "bonsai", label: "B1", title: "Bonsai Table B1", seats: 4, cx: 450, cy: 270 },
  { id: "B2", zone: "bonsai", label: "B2", title: "Bonsai Table B2", seats: 4, cx: 320, cy: 460 },
  { id: "B3", zone: "bonsai", label: "B3", title: "Bonsai Table B3", seats: 4, cx: 580, cy: 460 },

  // VIP Red Velvet — right column, generous vertical space
  { id: "V1", zone: "vip",    label: "V1", title: "VIP V1 — Premium Booth", seats: 6, cx: 790, cy: 280 },
  { id: "V2", zone: "vip",    label: "V2", title: "VIP V2 — Premium Booth", seats: 6, cx: 790, cy: 410 },
  { id: "V3", zone: "vip",    label: "V3", title: "VIP V3 — Premium Booth", seats: 6, cx: 790, cy: 540 },

  // Copper Bar — bottom, evenly spaced under the curved counter
  { id: "C1", zone: "bar",    label: "C1", title: "Bar Seat C1", seats: 2, cx: 180, cy: 640 },
  { id: "C2", zone: "bar",    label: "C2", title: "Bar Seat C2", seats: 2, cx: 320, cy: 630 },
  { id: "C3", zone: "bar",    label: "C3", title: "Bar Seat C3", seats: 2, cx: 540, cy: 630 },
  { id: "C4", zone: "bar",    label: "C4", title: "Bar Seat C4", seats: 2, cx: 680, cy: 640 },
];
