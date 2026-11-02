// ---------- Hero 1 (Pearry / kiwi) ----------
import kiwiBowl from "../assets/hero_1_components/kiwi_bowl_under_800kb.png";
import kiwi from "../assets/hero_1_components/kiwi_under_800kb.png";
import greenLeaves1 from "../assets/hero_1_components/green_leaves_under_800kb.png";
import lemon from "../assets/hero_1_components/lemon.png";

// ---------- Hero 2 (Strawberry) ----------
import strawberryBowl from "../assets/hero_2/strawberry_bowl_256.png";
import strawberryHalf from "../assets/hero_2/strawberry_under_800kb.png";
import strawberryWhole from "../assets/hero_2/strawberry_under_800kb (1).png";
import leaf2 from "../assets/hero_2/leaf_optimized.png";

// ---------- Hero 3 (Blueberry) ----------
import blueberryBowl from "../assets/hero_3/blueberry_bowl_yogurt_under_800kb.png";
import blueberry from "../assets/hero_3/blueberry_under_800kb.png";
import leaf3 from "../assets/hero_3/leaf_under_800kb.png";
import oats from "../assets/hero_3/penat_beens.png";

// ---------- Hero 4 (Pink Berry) ----------
import raspberryBowl from "../assets/hero_4/raspberry_bowl_transparent_under_800kb.png";
import raspberries from "../assets/hero_4/raspberries_under_800kb.png";
import greenLeaves4 from "../assets/hero_4/green_leaves_under_800kb.png";
import leaf4a from "../assets/hero_4/leaf_optimized.png";
import leaf4b from "../assets/hero_4/leaf_under_800kb.png";

// scroll direction shared with the exit animations (1 = down, -1 = up)
export const dir = { v: 1 };

export const HEROES = [
  {
    id: "pearry",
    brand: { text: "Pearry", icon: true, className: "text-2xl md:text-[1.7vw] font-semibold" },
    nav: ["Home", "Products", "About", "Offers", "Contact"],
    title: { left: "PEA", right: "RRY", full: "PEARRY" },
    titleTop: 47,
    pad: [12.5, 11],
    bg: "radial-gradient(circle at 50% 50%, #b4cb2c 0%, #93aa20 45%, #55701a 100%)",
    mid: "#7f9a1d",
    accent: "#1c1c1c",
    cta: "Shop Now",
    price: "$12$",
    ctaPos: { left: 8.7, top: 66 },
    desc: ["Freshly baked, naturally delicious.", "A perfect blend of taste and health."],
    descPos: { left: 8.7, top: 77 },
    line: false,
    arrows: "horizontal",
    ctrlTop: 65,
    bowl: { src: kiwiBowl, x: 51, y: 47, size: 33 },
    floaters: [
      { src: kiwi, left: 28.5, top: 13, size: 10.5, rotate: -8, depth: 0.5 },
      { src: lemon, left: 64, top: 12.5, size: 9.5, rotate: 12, depth: 0.6 },
      { src: greenLeaves1, left: 9, top: 6, size: 8, rotate: 15, depth: 0.4 },
      { src: greenLeaves1, left: 81, top: 3, size: 9.5, rotate: -25, depth: 0.7 },
      { src: lemon, left: 0, top: 78, size: 11, rotate: 30, blur: 6, depth: 1.1 },
      { src: greenLeaves1, left: 64, top: 68, size: 8, rotate: -10, depth: 0.5, z: 45 },
      { src: kiwi, left: 79, top: 86, size: 12, rotate: 20, blur: 5, depth: 1.2 },
    ],
  },
  {
    id: "strawberry",
    brand: { text: "Tasty", className: "text-2xl md:text-[2vw] font-black uppercase tracking-tight" },
    nav: ["Home", "Menu", "About", "Contact"],
    title: { left: "STR", right: "RRY", full: "STRAWBERRY" },
    titleTop: 45.7,
    pad: [11, 11],
    bg: "radial-gradient(circle at 50% 50%, #e00000 0%, #c50000 45%, #7a0000 100%)",
    mid: "#b00000",
    accent: "#111827",
    cta: "Buy Now",
    price: "$12.5",
    ctaPos: { left: 7.2, top: 64 },
    desc: [
      "Fresh, Healthy & Delicious Strawberry Bowl",
      "Made with Love – A Perfect Blend of Taste",
      "and Nutrition.",
    ],
    descPos: { left: 7.2, top: 77 },
    line: true,
    arrows: "vertical",
    ctrlTop: 64,
    bowl: { src: strawberryBowl, x: 49.6, y: 50, size: 31 },
    floaters: [
      { src: strawberryHalf, left: 30, top: 14, size: 9, rotate: -6, depth: 0.5 },
      { src: strawberryWhole, left: 61, top: 14.5, size: 8.5, rotate: 10, depth: 0.6 },
      { src: leaf2, left: 84, top: 10, size: 6, rotate: 20, depth: 0.5 },
      { src: leaf2, left: -2, top: 8, size: 10, rotate: -30, blur: 5, depth: 1.1 },
      { src: leaf2, left: 71, top: 52, size: 4.5, rotate: 35, depth: 0.4, z: 45 },
      { src: leaf2, left: 34, top: 71, size: 6, rotate: -15, depth: 0.5 },
      { src: strawberryHalf, left: 74, top: 69, size: 9, rotate: 15, depth: 0.7 },
      { src: strawberryWhole, left: 2, top: 78, size: 8, rotate: 5, blur: 5, depth: 1.2 },
    ],
  },
  {
    id: "blueberry",
    brand: { text: "Tasty", className: "text-2xl md:text-[2vw] font-black uppercase tracking-tight" },
    nav: ["Home", "Menu", "About", "Contact"],
    title: { left: "BLU", right: "RY", full: "BLUEBERRY" },
    titleTop: 46.5,
    pad: [13.5, 13],
    bg: "radial-gradient(circle at 52% 50%, #0b6dff 0%, #0a4fe0 45%, #0a2a9c 100%)",
    mid: "#0a4fe0",
    accent: "#0b2a8f",
    cta: "Buy Now",
    price: "$12.5",
    ctaPos: { left: 7.2, top: 64.5 },
    desc: [
      "Sweet, Nutritious and Absolutely Delicious!",
      "Fresh Blueberry Yogurt with a Perfect Blend of",
      "Granola & Honey.",
    ],
    descPos: { left: 7.2, top: 78 },
    line: true,
    arrows: "vertical",
    ctrlTop: 65,
    bowl: { src: blueberryBowl, x: 51.7, y: 50, size: 34 },
    floaters: [
      { src: blueberry, left: 30, top: 17, size: 6.5, rotate: 0, depth: 0.5 },
      { src: oats, left: 39, top: 15, size: 6, rotate: 10, depth: 0.7 },
      { src: leaf3, left: 57.5, top: 15, size: 6, rotate: -10, depth: 0.5 },
      { src: blueberry, left: 69, top: 23, size: 5, rotate: 20, depth: 0.6 },
      { src: oats, left: 73.5, top: 31, size: 3.5, rotate: -30, depth: 0.8 },
      { src: blueberry, left: 66, top: 70, size: 6, rotate: 0, depth: 0.5 },
      { src: blueberry, left: 38, top: 81, size: 4.8, rotate: 10, depth: 0.6 },
      { src: leaf3, left: 16, top: -3, size: 13, rotate: -20, blur: 4, depth: 1.1 },
      { src: leaf3, left: 95, top: 10, size: 7, rotate: 40, blur: 3, depth: 1 },
      { src: blueberry, left: -1, top: 86, size: 8, rotate: 0, blur: 4, depth: 1.2 },
      { src: leaf3, left: 5.5, top: 89, size: 9, rotate: 25, blur: 3, depth: 1 },
    ],
  },
  {
    id: "pinkberry",
    brand: { text: "Nutri's", className: "text-2xl md:text-[2vw] font-extrabold" },
    nav: ["Home", "About", "Product", "Contact"],
    title: { left: "PIN", right: "BRRY", full: "PINKBERRY" },
    titleTop: 51,
    pad: [12.7, 8.5],
    bg: "radial-gradient(circle at 50% 50%, #e50020 0%, #cc0018 45%, #98000f 100%)",
    mid: "#c80019",
    accent: "#b0001a",
    cta: "Buy Now",
    price: "$8.99",
    ctaPos: { left: 5.7, top: 72 },
    desc: [
      "Taste the freshness in every bite. Our Pink Berry",
      "Smoothie is a perfect blend of natural berries and",
      "creamy goodness.",
    ],
    descPos: { left: 5.7, top: 85 },
    line: false,
    arrows: "horizontal",
    ctrlTop: 72,
    bowl: { src: raspberryBowl, x: 49.8, y: 52.4, size: 33 },
    floaters: [
      { src: raspberries, left: 26, top: 8, size: 6.5, rotate: 0, depth: 0.5 },
      { src: raspberries, left: 34, top: 15, size: 7, rotate: 30, depth: 0.7 },
      { src: raspberries, left: 26.5, top: 24, size: 6.5, rotate: -20, depth: 0.6 },
      { src: leaf4a, left: 66, top: 15, size: 10, rotate: 15, depth: 0.5 },
      { src: leaf4b, left: 73, top: 30, size: 6.5, rotate: -25, depth: 0.7 },
      { src: greenLeaves4, left: 29, top: 70, size: 9, rotate: 10, depth: 0.5, z: 45 },
    ],
  },
];