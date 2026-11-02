import { useEffect, useState } from "react";
import { AnimatePresence, motion, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { dir } from "../data/heroes";
import Floater from "./Floater";

// background items (hero 1 wali images)
import lemon from "../assets/hero_1_components/lemon.png";
import leaves from "../assets/hero_1_components/green_leaves_under_800kb.png";

// about section images
import cake from "../assets/about/pistachio_cake_under300kb.png";
import pistachio from "../assets/about/pistachio_under_200kb.png";

export const ABOUT_MID = "#5b6e18";
export const ABOUT_IMAGES = [cake, pistachio];

// offer countdown: 12 days 08 hours 45 min 30 sec (page load se chalta hai)
const OFFER_MS = (((12 * 24 + 8) * 60 + 45) * 60 + 30) * 1000;
const OFFER_END = Date.now() + OFFER_MS;

const BG_ITEMS = [
  { src: leaves, left: 4, top: 7, size: 5, rotate: -25, blur: 5, depth: 1.1 },
  { src: lemon, left: 91, top: 26, size: 6.5, rotate: 12, depth: 0.6, z: 40 },
  { src: leaves, left: 80, top: 51, size: 6, rotate: -20, blur: 1.5, depth: 0.5 },
  { src: leaves, left: 93, top: 49, size: 6.5, rotate: 25, blur: 2, depth: 0.8 },
];

/* ---------- animation helpers ---------- */
const S = 1; // speed: 1 = normal, 1.3 = aur slow, 0.8 = thoda fast
const EASE = [0.22, 1, 0.36, 1];
const BLUR = "blur(14px)";
const NO_BLUR = "blur(0px)";
const jump = { type: "spring", stiffness: 300, damping: 14 };
const off = (n) => (dir.v > 0 ? n : -n);

const soft = (delay = 0) => ({
  default: { type: "spring", stiffness: 60, damping: 15, mass: 1, delay: delay * S },
  opacity: { duration: 0.9 * S, ease: EASE, delay: delay * S },
  filter: { duration: 1.1 * S, ease: EASE, delay: delay * S },
});

const bouncy = (delay = 0) => ({
  default: { type: "spring", stiffness: 90, damping: 11, mass: 1, delay: delay * S },
  opacity: { duration: 0.8 * S, ease: EASE, delay: delay * S },
  filter: { duration: 1 * S, ease: EASE, delay: delay * S },
});

const leave = (delay = 0) => ({ duration: 0.6 * S, ease: [0.4, 0, 0.2, 1], delay: delay * S });

/* ---------- variants ---------- */
// background: slide nahi, sirf fade + halka zoom
const fadeSlideV = {
  enter: { zIndex: 2 },
  center: { zIndex: 2 },
  exit: { zIndex: 1, transition: { duration: 0 } },
};

const fadeBgV = {
  enter: { opacity: 0, scale: 1.06 },
  center: { opacity: 1, scale: 1, transition: { duration: 1.4 * S, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.6 * S, delay: 0.8 * S, ease: "linear" } },
};

const cakeV = {
  enter: () => ({ y: off(120), scale: 0.85, rotate: -8, opacity: 0, filter: "blur(18px)" }),
  center: { y: 0, scale: 1, rotate: 0, opacity: 1, filter: NO_BLUR, transition: bouncy(0.35) },
  exit: () => ({
    y: off(-100),
    scale: 0.9,
    opacity: 0,
    filter: "blur(16px)",
    transition: leave(0),
  }),
};

const labelV = {
  enter: { x: -30, opacity: 0, filter: BLUR },
  center: { x: 0, opacity: 1, filter: NO_BLUR, transition: soft(0.6) },
  exit: { x: -30, opacity: 0, filter: BLUR, transition: leave(0) },
};

const lineV = {
  enter: { scaleX: 0 },
  center: { scaleX: 1, transition: { duration: 1 * S, ease: EASE, delay: 0.8 * S } },
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
  center: { y: 0, opacity: 1, filter: NO_BLUR, transition: soft(1.1) },
  exit: () => ({ y: off(-30), opacity: 0, filter: BLUR, transition: leave(0.05) }),
};

const makeBtnV = (delay) => ({
  enter: () => ({ y: off(30), scale: 0.8, opacity: 0, filter: BLUR }),
  center: { y: 0, scale: 1, opacity: 1, filter: NO_BLUR, transition: bouncy(delay) },
  exit: () => ({ y: off(-30), scale: 0.9, opacity: 0, filter: BLUR, transition: leave(0.1) }),
});
const learnV = makeBtnV(1.3);
const shopV = makeBtnV(1.9);

const bannerV = {
  enter: () => ({ y: off(110), scale: 0.94, opacity: 0, filter: BLUR }),
  center: { y: 0, scale: 1, opacity: 1, filter: NO_BLUR, transition: bouncy(0.8) },
  exit: () => ({ y: off(-90), opacity: 0, filter: BLUR, transition: leave(0.05) }),
};

const tabV = {
  enter: { x: -24, opacity: 0, filter: BLUR },
  center: { x: 0, opacity: 1, filter: NO_BLUR, transition: soft(1.15) },
  exit: { x: -24, opacity: 0, filter: BLUR, transition: leave(0) },
};

const subV = {
  enter: { y: 20, opacity: 0, filter: BLUR },
  center: { y: 0, opacity: 1, filter: NO_BLUR, transition: soft(1.9) },
  exit: { opacity: 0, filter: BLUR, transition: leave(0) },
};

const boxV = {
  enter: { y: 30, scale: 0.8, opacity: 0, filter: BLUR },
  center: (i) => ({
    y: 0,
    scale: 1,
    opacity: 1,
    filter: NO_BLUR,
    transition: bouncy(1.55 + i * 0.1),
  }),
  exit: { opacity: 0, filter: BLUR, transition: leave(0) },
};

const pistV = {
  enter: () => ({ y: off(90), scale: 0.5, rotate: 30, opacity: 0, filter: BLUR }),
  center: { y: 0, scale: 1, rotate: 0, opacity: 1, filter: NO_BLUR, transition: bouncy(1.9) },
  exit: () => ({ y: off(-60), scale: 0.7, opacity: 0, filter: BLUR, transition: leave(0) }),
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

function calc(end) {
  const total = Math.max(0, Math.floor((end - Date.now()) / 1000));
  return {
    d: Math.floor(total / 86400),
    h: Math.floor((total % 86400) / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
  };
}

const pad = (n) => String(n).padStart(2, "0");

function TimeBox({ value, label, i }) {
  return (
    <motion.div
      variants={boxV}
      custom={i}
      whileHover={{ y: -6, scale: 1.08, transition: jump }}
      className="relative flex h-16 w-14 cursor-default flex-col items-center justify-center rounded-xl border border-white/10 bg-white/10 shadow-[0_10px_24px_rgba(0,0,0,0.15)] backdrop-blur-sm transition-colors duration-300 hover:bg-white/20 md:h-[6vw] md:w-[5.6vw] md:rounded-[1vw]"
    >
      <div className="relative h-[1.2em] overflow-hidden text-xl font-extrabold tabular-nums md:text-[2.3vw]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: "60%", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-60%", opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: EASE }}
            className="block leading-[1.2]"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] leading-none text-white/70 md:text-[max(10px,1.05vw)]">{label}</span>
    </motion.div>
  );
}

// sirf ye chhota part har second re-render hota hai
function Countdown() {
  const [t, setT] = useState(() => calc(OFFER_END));

  useEffect(() => {
    const id = setInterval(() => setT(calc(OFFER_END)), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    [pad(t.d), "Days"],
    [pad(t.h), "Hours"],
    [pad(t.m), "Min"],
    [pad(t.s), "Sec"],
  ];

  return (
    <div className="flex items-center gap-1.5 md:gap-[0.55vw]">
      {units.map(([v, label], i) => (
        <div key={label} className="flex items-center gap-1.5 md:gap-[0.55vw]">
          <TimeBox value={v} label={label} i={i} />
          {i < units.length - 1 && (
            <motion.span
              className="size-1 rounded-full bg-white/70 md:size-[0.35vw]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------- section ---------- */
export default function AboutSlide({ mx, my, scrollRef }) {
  // cake mouse parallax
  const cx = useTransform(mx, (v) => v * -28);
  const cy = useTransform(my, (v) => v * -18);

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
            "radial-gradient(circle at 24% 38%, rgba(175,200,50,0.5) 0%, rgba(175,200,50,0) 55%), linear-gradient(180deg, #70851a 0%, #5b6e18 55%, #43550f 100%)",
        }}
      />

      {/* soft ambient blob */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-[12vw] bottom-[-12%] size-[42vw] rounded-full bg-[#27340a]/45 blur-[100px]"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* floating items */}
      {BG_ITEMS.map((f, i) => (
        <Floater key={i} index={i} mx={mx} my={my} {...f} />
      ))}

      {/* content (chhoti screen par yahi scroll hota hai) */}
      <div
        ref={scrollRef}
        className="absolute inset-0 z-30 overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="mx-auto flex min-h-full w-full max-w-[1900px] flex-col justify-center gap-10 px-5 pb-24 pt-10 md:gap-[3.4vw] md:px-[5vw] md:pb-[3vw] md:pt-[3vw]">
          {/* TOP: cake + about text */}
          <div className="grid items-center gap-8 md:grid-cols-[1.12fr_1fr] md:gap-[1vw]">
            {/* cake */}
            <motion.div variants={cakeV} className="relative md:-ml-[1vw]">
              <motion.div style={{ x: cx, y: cy }} className="relative">
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-[55%] size-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9e24a]/25 blur-[70px]"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.img
                  src={cake}
                  alt="Pistachio cake"
                  draggable={false}
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{
                    scale: 1.04,
                    rotate: -2,
                    transition: { type: "spring", stiffness: 200, damping: 14 },
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="relative block h-auto w-full cursor-pointer select-none drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)] md:w-[min(46vw,74dvh)] md:max-w-none"
                />
              </motion.div>
            </motion.div>

            {/* text */}
            <div className="md:pl-[1vw]">
              <motion.div
                variants={labelV}
                className="flex items-center gap-3 text-sm font-semibold md:text-[max(13px,1.1vw)]"
              >
                About Pearry
                <motion.span variants={lineV} className="h-px w-14 origin-left bg-white md:w-[4.5vw]" />
              </motion.div>

              <h2 className="mt-4 text-[clamp(2.2rem,3.4vw,4.6rem)] font-extrabold leading-[1.05] tracking-tight md:mt-[1vw]">
                <Words text="More Than a" base={0} />
                <span className="text-[#b9e43a]">
                  <Words text="Bakery" base={3} />
                </span>
              </h2>

              <motion.p
                variants={descV}
                className="mt-5 max-w-[26rem] text-sm leading-relaxed text-white/90 md:mt-[1.4vw] md:max-w-[34vw] md:text-[max(13px,1.12vw)]"
              >
                At Pearry, we believe in the power of good food. Our bakery items are made with the
                finest ingredients, bringing you taste, health, and happiness in every bite.
              </motion.p>

              <motion.a
                href="#"
                onClick={(e) => e.preventDefault()}
                variants={learnV}
                whileHover={{ scale: 1.07, y: -3, transition: jump }}
                whileTap={{ scale: 0.92 }}
                className="group relative mt-6 inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-[#ece9d9] px-6 py-3 text-sm font-bold text-[#2f3a0c] shadow-[0_14px_30px_rgba(0,0,0,0.25)] md:mt-[2vw] md:px-[1.9vw] md:py-[0.85vw] md:text-[max(13px,1.05vw)]"
              >
                <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/70 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
                <span className="relative">Learn More</span>
                <ArrowRight
                  className="relative size-4 transition-transform duration-300 group-hover:translate-x-1.5 md:size-[1.2vw]"
                  strokeWidth={2.4}
                />
              </motion.a>
            </div>
          </div>

          {/* BOTTOM: special offer banner */}
          <motion.div
            variants={bannerV}
            whileHover={{ y: -4, transition: jump }}
            className="relative mt-4 flex flex-col gap-6 rounded-[2rem] border border-white/15 bg-[#2f3d0b]/40 p-6 pb-8 pt-12 shadow-[0_24px_60px_rgba(0,0,0,0.2)] backdrop-blur-md transition-colors duration-300 hover:border-white/30 md:ml-[1.5vw] md:-mr-[1.6vw] md:mt-0 md:h-[11.8vw] md:flex-row md:items-center md:justify-between md:gap-[2vw] md:rounded-[6vw] md:p-0 md:pl-[3.5vw] md:pr-[11.5vw]"
          >
            {/* tab */}
            <motion.div
              variants={tabV}
              className="absolute -top-3 left-5 rounded-t-2xl rounded-br-2xl bg-[#b6de30] px-5 py-2 text-sm font-extrabold text-[#2a3607] shadow-[0_8px_18px_rgba(0,0,0,0.2)] md:-top-[0.9vw] md:left-[1.8vw] md:rounded-t-[1.4vw] md:rounded-br-[1.4vw] md:px-[1.6vw] md:py-[0.55vw] md:text-[max(13px,1.55vw)]"
            >
              Special Offer
            </motion.div>

            {/* title */}
            <div>
              <h3 className="text-[clamp(1.9rem,3.4vw,4.4rem)] font-extrabold leading-none tracking-tight">
                <Words text="Get" base={6} />
                <span className="text-[#c4ea45]">
                  <Words text="20%" base={7} />
                </span>
                <Words text="OFF" base={8} />
              </h3>
              <motion.p
                variants={subV}
                className="mt-2 text-sm text-white/90 md:mt-[0.7vw] md:text-[max(12px,1.1vw)]"
              >
                On Our Pistachio Collection
              </motion.p>
            </div>

            {/* countdown */}
            <Countdown />

            {/* shop button */}
            <motion.a
              href="#"
              onClick={(e) => e.preventDefault()}
              variants={shopV}
              whileHover={{ scale: 1.08, y: -3, transition: jump }}
              whileTap={{ scale: 0.92 }}
              className="group relative inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-[#d8ee8f] px-5 py-2.5 text-sm font-bold text-[#2f3a0c] shadow-[0_14px_30px_rgba(0,0,0,0.25)] md:px-[1.6vw] md:py-[0.8vw] md:text-[max(13px,1.15vw)]"
            >
              {/* attention ring */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#d8ee8f]"
                animate={{ scale: [1, 1.25], opacity: [0.7, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
              <span className="relative">Shop the Offer</span>
              <ArrowRight
                className="relative size-4 transition-transform duration-300 group-hover:translate-x-1.5 md:size-[1.15vw]"
                strokeWidth={2.4}
              />
            </motion.a>

            {/* pistachio */}
            <motion.div
              variants={pistV}
              className="absolute -top-10 right-3 w-24 md:-top-[2.6vw] md:right-[1.2vw] md:w-[9vw]"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 8, -4, 0], scale: 1.12, transition: { duration: 0.7 } }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer"
              >
                <motion.img
                  src={pistachio}
                  alt="Pistachio"
                  draggable={false}
                  animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="block h-auto w-full select-none drop-shadow-[0_14px_14px_rgba(0,0,0,0.35)]"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}