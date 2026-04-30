export type MenuItem = {
  name: string;
  desc: string;
  price: string;
  tag?: string;
};

export type MenuCategory = {
  id: "shisha" | "cocktails" | "dining" | "bottles";
  label: string;
  tagline: string;
  vibe: string;
  image: string;
  accent: "neon" | "copper" | "gold";
  items: MenuItem[];
};

import shisha from "@/assets/menu-shisha.jpg";
import cocktails from "@/assets/menu-cocktails.jpg";
import dining from "@/assets/menu-dining.jpg";
import bottles from "@/assets/menu-bottle.jpg";

export const menuData: MenuCategory[] = [
  {
    id: "shisha",
    label: "Signature Shisha",
    tagline: "Hand-finished pipes. Curated tobacco. Copper-tipped ceremony.",
    vibe: "Moody, low-lit, neon pink.",
    image: shisha,
    accent: "neon",
    items: [
      { name: "Caramfil 74A", desc: "House blend — dark grape, mint, hint of rose.", price: "120 lei", tag: "House" },
      { name: "Bonsai Smoke", desc: "Olive leaf infusion, lemon zest, soft tobacco.", price: "140 lei" },
      { name: "Copper Veil", desc: "Toasted apple, cinnamon bark, vanilla bourbon.", price: "130 lei" },
      { name: "Velvet Noir", desc: "Blackberry, cardamom, hint of pine.", price: "145 lei", tag: "New" },
      { name: "Members' Reserve", desc: "Aged tobacco, fig, rare oud — limited.", price: "220 lei", tag: "Reserve" },
      { name: "Pink Smoke", desc: "Rose, lychee, white peach.", price: "135 lei" },
    ],
  },
  {
    id: "cocktails",
    label: "Craft Cocktails",
    tagline: "Slow-built classics. House originals. Always under copper light.",
    vibe: "Warm, golden, glassware glinting.",
    image: cocktails,
    accent: "copper",
    items: [
      { name: "Olive Branch", desc: "Gin, dry vermouth, brined olive oil, lemon.", price: "55 lei", tag: "Signature" },
      { name: "Neon Negroni", desc: "Mezcal, Campari, sweet vermouth, grapefruit oil.", price: "60 lei" },
      { name: "Copper Sour", desc: "Bourbon, citrus, demerara, egg white.", price: "55 lei" },
      { name: "Caramfil Spritz", desc: "Prosecco, elderflower, basil, soda.", price: "48 lei" },
      { name: "Velvet Old Fashioned", desc: "Aged rye, smoked cherry, bitters.", price: "65 lei" },
      { name: "Members' Martini", desc: "Vodka or gin, vermouth wash, citrus twist.", price: "58 lei" },
    ],
  },
  {
    id: "dining",
    label: "Fine Dining",
    tagline: "A short list. Plated with intent. Designed to pair with the night.",
    vibe: "Quiet drama, slate and copper.",
    image: dining,
    accent: "copper",
    items: [
      { name: "Burrata · Fig", desc: "Aged balsamic, toasted walnut, sourdough.", price: "58 lei" },
      { name: "Tuna Tartare", desc: "Yuzu, avocado, sesame crisp.", price: "78 lei" },
      { name: "Wagyu Sliders", desc: "Truffle aioli, aged cheddar, brioche.", price: "95 lei", tag: "Chef" },
      { name: "Black Risotto", desc: "Squid ink, scallop, lemon zest.", price: "82 lei" },
      { name: "Lamb Carré", desc: "Herb crust, smoked aubergine, jus.", price: "120 lei" },
      { name: "Dark Chocolate", desc: "70% ganache, sea salt, olive oil.", price: "42 lei" },
    ],
  },
  {
    id: "bottles",
    label: "Bottle Service",
    tagline: "For the table that wants the room to know.",
    vibe: "Sparklers, copper buckets, gold light.",
    image: bottles,
    accent: "gold",
    items: [
      { name: "Dom Pérignon Vintage", desc: "Served on copper, with sparklers.", price: "2.400 lei", tag: "Signature" },
      { name: "Veuve Clicquot Brut", desc: "Champagne, ice bucket, glassware.", price: "950 lei" },
      { name: "Hennessy XO", desc: "Cognac, snifters, dark chocolate pairing.", price: "2.100 lei" },
      { name: "Macallan 18", desc: "Single malt, water, hand-cut ice.", price: "2.800 lei", tag: "Reserve" },
      { name: "Belvedere Magnum", desc: "Vodka, mixers, citrus garnish.", price: "1.400 lei" },
      { name: "Members' Tower", desc: "Champagne tower for the table — by request.", price: "POA", tag: "On request" },
    ],
  },
];
