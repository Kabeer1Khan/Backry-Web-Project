import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  Check,
  Gem,
  Heart,
  Leaf,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { dir } from "../data/heroes";
import Floater from "./Floater";

// background items (hero 1 wali images)
import lemon from "../assets/hero_1_components/lemon.png";
import kiwi from "../assets/hero_1_components/kiwi_under_800kb.png";
import leaves from "../assets/hero_1_components/green_leaves_under_800kb.png";

// food items
import cake from "../assets/secdond_section_item_imgs/pistachio_cake_under_600kb.png";
import croissant from "../assets/secdond_section_item_imgs/croissant_under_500kb.png";
import donut from "../assets/secdond_section_item_imgs/pistachio_donut_under_400kb.png";

export const PRODUCTS_MID = "#5d7019";
export const PRODUCT_IMAGES = [cake, croissant, donut];

const FEATURES = [
  { Icon: Leaf, title: "100% Natural", sub: "Pure ingredients" },
  { Icon: Gem, title: "Premium Quality", sub: "Baked with love" },
  { Icon: Truck, title: "Fast Delivery", sub: "Door to door" },
  { Icon: Heart, title: "Healthy Choice", sub: "Goodness in every bite" },
];

const PRODUCTS = [
  { name: "Pistachio Cake", price: "$8.99", img: cake },
  { name: "Pistachio Croissant", price: "$6.99", img: croissant },
  { name: "Pistachio Donut", price: "$4.99", img: donut },
];

// blurred background items (same style as reference)
const BG_ITEMS = [
  { src: lemon, left: 3, top: -5, size: 8.5, rotate: 20, blur: 7, depth: 1.1 },
  { src: kiwi, left: 77, top: -4, size: 8, rotate: -10, blur: 5, depth: 1.2 },
  { src: leaves, left: 93, top: 9, size: 6, rotate: 30, blur: 2.5, depth: 1 },
  {
    src: leaves,
    left: 29,
    top: 83,
    size: 4.5,
    rotate: -15,
    blur: 1.5,
    depth: 0.5,
  },
];

/* ---------- animation helpers ---------- */
const S = 1; // speed: 1 = normal, 1.3 = aur slow, 0.8 = thoda fast
const EASE = [0.22, 1, 0.36, 1];
const BLUR = "blur(14px)";
const NO_BLUR = "blur(0px)";
const jump = { type: "spring", stiffness: 300, damping: 14 };
const off = (n) => (dir.v > 0 ? n : -n);

const soft = (delay = 0) => ({
  default: {
    type: "spring",
    stiffness: 60,
    damping: 15,
    mass: 1,
    delay: delay * S,
  },
  opacity: { duration: 0.9 * S, ease: EASE, delay: delay * S },
  filter: { duration: 1.1 * S, ease: EASE, delay: delay * S },
});

// halka sa jumpy (soft bounce)
const bouncy = (delay = 0) => ({
  default: {
    type: "spring",
    stiffness: 90,
    damping: 11,
    mass: 1,
    delay: delay * S,
  },
  opacity: { duration: 0.8 * S, ease: EASE, delay: delay * S },
  filter: { duration: 1 * S, ease: EASE, delay: delay * S },
});

const leave = (delay = 0) => ({
  duration: 0.6 * S,
  ease: [0.4, 0, 0.2, 1],
  delay: delay * S,
});

/* ---------- variants ---------- */
const slideV = {
  enter: { zIndex: 2 },
  center: { zIndex: 2 },
  exit: { zIndex: 1, transition: { duration: 0 } },
};

const bgV = {
  enter: { opacity: 0, scale: 1.06 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.3 * S, ease: EASE },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4 * S, delay: 0.9 * S, ease: "linear" },
  },
};

const barV = {
  enter: () => ({ y: off(70), scale: 0.95, opacity: 0, filter: BLUR }),
  center: {
    y: 0,
    scale: 1,
    opacity: 1,
    filter: NO_BLUR,
    transition: bouncy(0.35),
  },
  exit: () => ({ y: off(-60), opacity: 0, filter: BLUR, transition: leave(0) }),
};

const featV = {
  enter: { y: 26, opacity: 0, filter: BLUR },
  center: (i) => ({
    y: 0,
    opacity: 1,
    filter: NO_BLUR,
    transition: soft(0.75 + i * 0.1),
  }),
  exit: { opacity: 0, filter: BLUR, transition: leave(0) },
};

const labelV = {
  enter: { x: -30, opacity: 0, filter: BLUR },
  center: { x: 0, opacity: 1, filter: NO_BLUR, transition: soft(0.6) },
  exit: { x: -30, opacity: 0, filter: BLUR, transition: leave(0) },
};

const lineV = {
  enter: { scaleX: 0 },
  center: {
    scaleX: 1,
    transition: { duration: 1 * S, ease: EASE, delay: 0.8 * S },
  },
  exit: { scaleX: 0, transition: { duration: 0.3 } },
};

const wordV = {
  enter: () => ({ y: `${off(70)}%`, rotate: off(4), opacity: 0, filter: BLUR }),
  center: (i) => ({
    y: "0%",
    rotate: 0,
    opacity: 1,
    filter: NO_BLUR,
    transition: bouncy(0.7 + i * 0.12),
  }),
  exit: (i) => ({
    y: `${off(-70)}%`,
    opacity: 0,
    filter: BLUR,
    transition: leave(i * 0.04),
  }),
};

const descV = {
  enter: () => ({ y: off(30), opacity: 0, filter: BLUR }),
  center: { y: 0, opacity: 1, filter: NO_BLUR, transition: soft(1.05) },
  exit: () => ({
    y: off(-30),
    opacity: 0,
    filter: BLUR,
    transition: leave(0.05),
  }),
};

const btnV = {
  enter: () => ({ y: off(30), scale: 0.8, opacity: 0, filter: BLUR }),
  center: {
    y: 0,
    scale: 1,
    opacity: 1,
    filter: NO_BLUR,
    transition: bouncy(1.2),
  },
  exit: () => ({
    y: off(-30),
    scale: 0.9,
    opacity: 0,
    filter: BLUR,
    transition: leave(0.1),
  }),
};

const cardV = {
  enter: (i) => ({
    y: off(130),
    scale: 0.86,
    rotate: (i - 1) * 7,
    opacity: 0,
    filter: "blur(18px)",
  }),
  center: (i) => ({
    y: 0,
    scale: 1,
    rotate: 0,
    opacity: 1,
    filter: NO_BLUR,
    transition: bouncy(0.6 + i * 0.15),
  }),
  exit: (i) => ({
    y: off(-110),
    scale: 0.9,
    opacity: 0,
    filter: "blur(16px)",
    transition: leave(i * 0.05),
  }),
};

/* ---------- small pieces ---------- */
function Words({ text, base = 0 }) {
  return text.split(" ").map((w, i) => (
    <span key={i} className="mr-[0.25em] inline-block align-bottom">
      <motion.span
        custom={base + i}
        variants={wordV}
        whileHover={{ y: "-6%", scale: 1.05, transition: jump }}
        className="inline-block cursor-default"
      >
        {w}
      </motion.span>
    </span>
  ));
}

function ProductCard({ p, i }) {
  const [added, setAdded] = useState(false);

  // 3D tilt + glare jo mouse ko follow karta hai
  const rxv = useMotionValue(0);
  const ryv = useMotionValue(0);
  const rx = useSpring(rxv, { stiffness: 140, damping: 16 });
  const ry = useSpring(ryv, { stiffness: 140, damping: 16 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.28), transparent 60%)`;

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1400);
    return () => clearTimeout(t);
  }, [added]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ryv.set((px - 0.5) * 14);
    rxv.set((0.5 - py) * 14);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const onLeave = () => {
    rxv.set(0);
    ryv.set(0);
    gx.set(50);
    gy.set(50);
  };

  return (
    <motion.div
      variants={cardV}
      custom={i}
      className="min-w-[66vw] snap-center sm:min-w-[40vw] md:min-w-0"
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={{ y: -12, scale: 1.03, transition: jump }}
        style={{
          rotateX: rx,
          rotateY: ry,
          transformPerspective: 900,
          transformStyle: "preserve-3d",
        }}
        className="group relative cursor-pointer rounded-3xl p-4 md:rounded-[1.8vw] md:p-[1.3vw]"
      >
        {/* glass */}
        <span className="absolute inset-0 rounded-[inherit] border border-white/15 bg-white/[0.08] shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-md transition-colors duration-300 group-hover:border-white/35 group-hover:bg-white/[0.13]" />
        {/* glare */}
        <motion.span
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="relative" style={{ transformStyle: "preserve-3d" }}>
          {/* image */}
          <div
            className="relative grid aspect-[1.2/1] place-items-center"
            style={{ transform: "translateZ(50px)" }}
          >
            <span className="absolute bottom-[6%] h-[7%] w-[62%] rounded-full bg-black/35 blur-md transition-all duration-500 group-hover:w-[48%] group-hover:opacity-60" />
            <div className="relative size-full transition-transform duration-500 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] group-hover:-translate-y-2 group-hover:-rotate-6 group-hover:scale-[1.12]">
              <motion.img
                src={p.img}
                alt={p.name}
                draggable={false}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4 + i * 0.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="size-full select-none object-contain drop-shadow-[0_14px_14px_rgba(0,0,0,0.3)]"
              />
            </div>
          </div>

          {/* info */}
          <div
            className="mt-3 md:mt-[0.8vw]"
            style={{ transform: "translateZ(25px)" }}
          >
            <h3 className="text-sm font-bold md:text-[max(13px,1.12vw)]">
              {p.name}
            </h3>
            <div className="mt-2 flex items-center justify-between md:mt-[0.7vw]">
              <motion.span
                whileHover={{ scale: 1.12, x: 4, transition: jump }}
                className="origin-left text-xl font-extrabold md:text-[max(17px,1.7vw)]"
              >
                {p.price}
              </motion.span>

              <motion.button
                type="button"
                aria-label={`Add ${p.name} to cart`}
                onClick={() => setAdded(true)}
                whileHover={{ scale: 1.2, rotate: 12, transition: jump }}
                whileTap={{ scale: 0.82 }}
                className="grid size-10 cursor-pointer place-items-center rounded-full bg-[#d9ee8e] text-[#34430c] shadow-[0_8px_18px_rgba(0,0,0,0.25)] md:size-[2.8vw]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={added ? "ok" : "cart"}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ type: "spring", stiffness: 400, damping: 16 }}
                    className="grid place-items-center"
                  >
                    {added ? (
                      <Check
                        className="size-5 md:size-[1.4vw]"
                        strokeWidth={3}
                      />
                    ) : (
                      <ShoppingCart
                        className="size-5 md:size-[1.4vw]"
                        strokeWidth={2.4}
                      />
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- section ---------- */
// section entry/exit: background sirf fade hota hai (slide nahi)
const fadeSlideV = {
  enter: { zIndex: 2 },
  center: { zIndex: 2 },
  exit: { zIndex: 1, transition: { duration: 0 } },
};

const fadeBgV = {
  enter: { opacity: 0, scale: 1.06 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4 * S, ease: EASE },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.6 * S, delay: 0.8 * S, ease: "linear" },
  },
};

export default function ProductsSlide({ mx, my, scrollRef }) {
  return (
    <motion.section
      variants={fadeSlideV}
      initial="enter"
      animate="center"
      exit="exit"
      className="stage absolute inset-0 overflow-hidden font-body text-white"
    >
      {/* background: fade + color change (no slide) */}
      <motion.div
        variants={fadeBgV}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 8%, rgba(160,182,40,0.55) 0%, rgba(160,182,40,0) 45%), linear-gradient(180deg, #70851c 0%, #5d7019 50%, #44550f 100%)",
        }}
      />

      {/* soft ambient blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-[12vw] top-[28%] size-[38vw] rounded-full bg-[#c5de4a]/15 blur-[90px]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-[10vw] bottom-[-10%] size-[40vw] rounded-full bg-[#2c3a08]/40 blur-[100px]"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* blurred floating items */}
      {BG_ITEMS.map((f, i) => (
        <Floater key={i} index={i} mx={mx} my={my} {...f} />
      ))}

      {/* content (chhoti screen par yahi scroll hota hai) */}
      <div
        ref={scrollRef}
        className="absolute inset-0 z-30 overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="mx-auto flex min-h-full w-full max-w-[1900px] flex-col justify-center gap-7 pb-20 pt-10 md:gap-[3.6vw] md:pb-[3vw] md:pt-[3vw]">
          {/* FEATURES BAR */}
          <motion.div
            variants={barV}
            className="mx-5 grid grid-cols-2 gap-y-6 rounded-3xl border border-white/15 bg-white/[0.07] px-2 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-md md:mx-auto md:w-[80vw] md:grid-cols-4 md:rounded-[2vw] md:py-[1.6vw]"
          >
            {FEATURES.map(({ Icon, title, sub }, i) => (
              <motion.div
                key={title}
                variants={featV}
                custom={i}
                whileHover={{ y: -4, transition: jump }}
                className="group relative flex cursor-default flex-col items-center gap-1 px-2 text-center"
              >
                {i > 0 && (
                  <span className="absolute left-0 top-1/2 hidden h-[58%] w-px -translate-y-1/2 bg-white/25 md:block" />
                )}
                <span className="mb-1 text-white/90 transition-transform duration-300 group-hover:-translate-y-1 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon className="size-8 md:size-[2.5vw]" strokeWidth={1.5} />
                </span>
                <h4 className="text-sm font-bold md:text-[max(13px,1.2vw)]">
                  {title}
                </h4>
                <p className="text-xs text-white/65 md:text-[max(11px,0.95vw)]">
                  {sub}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* PRODUCTS ROW */}
          <div className="mx-5 grid items-center gap-8 md:ml-[9.4vw] md:mr-[6.6vw] md:grid-cols-[1fr_2.1fr] md:gap-[2vw]">
            {/* left text */}
            <div>
              <motion.div
                variants={labelV}
                className="flex items-center gap-3 text-sm font-semibold md:text-[max(13px,1.1vw)]"
              >
                Our Products
                <motion.span
                  variants={lineV}
                  className="h-px w-14 origin-left bg-white md:w-[4.5vw]"
                />
              </motion.div>

              <h2 className="mt-4 font-body text-[clamp(2.2rem,3.4vw,4.6rem)] font-extrabold leading-[1.05] tracking-tight md:mt-[1vw]">
                <span className="block">
                  <Words text="A New Bakery" base={0} />
                </span>
                <span className="block text-[#dcef8c]">
                  <Words text="Experience" base={3} />
                </span>
              </h2>

              <motion.p
                variants={descV}
                className="mt-5 max-w-[22rem] text-sm leading-relaxed text-white/85 md:mt-[1.4vw] md:max-w-[26vw] md:text-[max(13px,1.12vw)]"
              >
                Discover our latest range of bakery items, crafted to bring
                happiness in every bite.
              </motion.p>

              <motion.a
                href="#"
                onClick={(e) => e.preventDefault()}
                variants={btnV}
                whileHover={{ scale: 1.07, y: -3, transition: jump }}
                whileTap={{ scale: 0.92 }}
                className="group relative mt-6 inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-[#ece9d9] px-6 py-3 text-sm font-bold text-[#2f3a0c] shadow-[0_14px_30px_rgba(0,0,0,0.25)] md:mt-[2vw] md:px-[1.9vw] md:py-[0.85vw] md:text-[max(13px,1.05vw)]"
              >
                <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/70 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
                <span className="relative">Explore All Products</span>
                <ArrowRight
                  className="relative size-4 transition-transform duration-300 group-hover:translate-x-1.5 md:size-[1.2vw]"
                  strokeWidth={2.4}
                />
              </motion.a>
            </div>

            {/* cards */}
            <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 pt-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-[1.9vw] md:overflow-visible md:p-0 [&::-webkit-scrollbar]:hidden">
              {PRODUCTS.map((p, i) => (
                <ProductCard key={p.name} p={p} i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
