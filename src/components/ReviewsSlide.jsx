import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Heart, Leaf, Star } from "lucide-react";
import { dir } from "../data/heroes";
import Floater from "./Floater";

// background items (hero 1 wali images)
import lemon from "../assets/hero_1_components/lemon.png";
import leaves from "../assets/hero_1_components/green_leaves_under_800kb.png";

export const REVIEWS_MID = "#3d4c0f";

/*
  Avatar photos ke liye: image import karo aur `avatar` me daalo, jaise
  import sarah from "../assets/reviews/sarah.jpg";  ->  avatar: sarah
  Jab tak `avatar` null hai, initials wala avatar dikhega.
*/
const REVIEWS = [
  {
    name: "Sarah Khan",
    initials: "SK",
    avatar: null,
    quote: "“Absolutely delicious!\nThe pistachio cake is a must-try.”",
  },
  {
    name: "Ahmed Raza",
    initials: "AR",
    avatar: null,
    quote: "“Fresh, tasty and beautifully\npresented. Love it!”",
  },
];

const BG_ITEMS = [
  { src: leaves, left: -1, top: 3, size: 6, rotate: -20, blur: 4, depth: 1.1 },
  { src: leaves, left: 31.5, top: 43, size: 4.5, rotate: -10, blur: 1.2, depth: 0.5 },
  { src: lemon, left: -3, top: 62, size: 8.5, rotate: 40, blur: 8, depth: 1.2 },
  { src: lemon, left: 91, top: 32, size: 8, rotate: 20, blur: 6, depth: 1 },
  { src: lemon, left: 93, top: 84, size: 7.5, rotate: -25, blur: 5, depth: 1.1 },
];

/* ---------- social icons (inline SVG, koi extra package nahi) ---------- */
const FacebookIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.6V3.5c-.3 0-1.2-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H7.6V13h2.7v8h3.2z" />
  </svg>
);
const InstagramIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);
const YoutubeIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path
      fillRule="evenodd"
      d="M6 5h12a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4zm4 4.2v5.6l5-2.8-5-2.8z"
    />
  </svg>
);
const XIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SOCIALS = [
  { Icon: FacebookIcon, label: "Facebook" },
  { Icon: InstagramIcon, label: "Instagram" },
  { Icon: YoutubeIcon, label: "YouTube" },
  { Icon: XIcon, label: "X" },
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

const labelV = {
  enter: { x: -30, opacity: 0, filter: BLUR },
  center: { x: 0, opacity: 1, filter: NO_BLUR, transition: soft(0.5) },
  exit: { x: -30, opacity: 0, filter: BLUR, transition: leave(0) },
};

const lineV = {
  enter: { scaleX: 0 },
  center: { scaleX: 1, transition: { duration: 1 * S, ease: EASE, delay: 0.7 * S } },
  exit: { scaleX: 0, transition: { duration: 0.3 } },
};

const wordV = {
  enter: () => ({ y: `${off(70)}%`, rotate: off(4), opacity: 0, filter: BLUR }),
  center: (i) => ({
    y: "0%",
    rotate: 0,
    opacity: 1,
    filter: NO_BLUR,
    transition: bouncy(0.6 + i * 0.12),
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
  center: { y: 0, opacity: 1, filter: NO_BLUR, transition: soft(0.95) },
  exit: () => ({ y: off(-30), opacity: 0, filter: BLUR, transition: leave(0.05) }),
};

const btnV = {
  enter: () => ({ y: off(30), scale: 0.8, opacity: 0, filter: BLUR }),
  center: { y: 0, scale: 1, opacity: 1, filter: NO_BLUR, transition: bouncy(1.1) },
  exit: () => ({ y: off(-30), scale: 0.9, opacity: 0, filter: BLUR, transition: leave(0.1) }),
};

const cardV = {
  enter: (i) => ({
    y: off(130),
    scale: 0.88,
    rotate: i ? 5 : -5,
    opacity: 0,
    filter: "blur(18px)",
  }),
  center: (i) => ({
    y: 0,
    scale: 1,
    rotate: 0,
    opacity: 1,
    filter: NO_BLUR,
    transition: bouncy(0.55 + i * 0.18),
  }),
  exit: (i) => ({
    y: off(-110),
    scale: 0.92,
    opacity: 0,
    filter: "blur(16px)",
    transition: leave(i * 0.05),
  }),
};

const avatarV = {
  enter: { scale: 0, rotate: -90, opacity: 0 },
  center: (i) => ({
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 11,
      delay: (1.1 + i * 0.18) * S,
      opacity: { duration: 0.3, delay: (1.1 + i * 0.18) * S },
    },
  }),
  exit: { scale: 0, opacity: 0, transition: leave(0) },
};

const starV = {
  enter: { scale: 0, rotate: -90, opacity: 0 },
  center: (d) => ({
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 10,
      delay: d * S,
      opacity: { duration: 0.2, delay: d * S },
    },
  }),
  exit: { scale: 0, opacity: 0, transition: leave(0) },
};

const footerV = {
  enter: () => ({ y: off(120), opacity: 0, filter: "blur(16px)" }),
  center: { y: 0, opacity: 1, filter: NO_BLUR, transition: bouncy(0.9) },
  exit: () => ({ y: off(-90), opacity: 0, filter: BLUR, transition: leave(0) }),
};

const footItemV = {
  enter: { y: 24, opacity: 0, filter: BLUR },
  center: (d) => ({ y: 0, opacity: 1, filter: NO_BLUR, transition: soft(d) }),
  exit: { opacity: 0, filter: BLUR, transition: leave(0) },
};

const socialV = {
  enter: { scale: 0, rotate: -120, opacity: 0 },
  center: (i) => ({
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 9,
      delay: (1.85 + i * 0.08) * S,
      opacity: { duration: 0.25, delay: (1.85 + i * 0.08) * S },
    },
  }),
  exit: { scale: 0, opacity: 0, transition: leave(0) },
};

const dividerV = {
  enter: { scaleX: 0, opacity: 0 },
  center: { scaleX: 1, opacity: 1, transition: { duration: 1.2 * S, ease: EASE, delay: 1.9 * S } },
  exit: { scaleX: 0, opacity: 0, transition: { duration: 0.3 } },
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

function ReviewCard({ r, i }) {
  // 3D tilt + glare jo mouse ko follow karta hai
  const rxv = useMotionValue(0);
  const ryv = useMotionValue(0);
  const rx = useSpring(rxv, { stiffness: 140, damping: 16 });
  const ry = useSpring(ryv, { stiffness: 140, damping: 16 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.26), transparent 60%)`;

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ryv.set((px - 0.5) * 12);
    rxv.set((0.5 - py) * 12);
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
    <motion.div variants={cardV} custom={i}>
      {/* halka idle float */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5 + i * 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          whileHover={{ y: -8, scale: 1.03, transition: jump }}
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, transformStyle: "preserve-3d" }}
          className="group relative cursor-pointer rounded-3xl p-4 md:rounded-[1.8vw] md:p-[1.5vw]"
        >
          {/* glass */}
          <span className="absolute inset-0 rounded-[inherit] border border-white/15 bg-white/[0.08] shadow-[0_18px_50px_rgba(0,0,0,0.2)] backdrop-blur-md transition-colors duration-300 group-hover:border-white/35 group-hover:bg-white/[0.13]" />
          {/* glare */}
          <motion.span
            style={{ background: glare }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          <div
            className="relative flex items-center gap-4 md:gap-[1.2vw]"
            style={{ transform: "translateZ(30px)" }}
          >
            {/* avatar */}
            <motion.div variants={avatarV} custom={i} className="relative shrink-0">
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#c6e65c]"
                animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: i * 0.6 }}
              />
              <motion.div
                whileHover={{ scale: 1.12, rotate: -6, transition: jump }}
                className="relative grid size-16 place-items-center overflow-hidden rounded-full border-2 border-[#c6e65c]/70 bg-gradient-to-br from-[#a9c92f] to-[#4d6212] text-lg font-extrabold text-white shadow-[0_10px_24px_rgba(0,0,0,0.3)] md:size-[6vw] md:text-[1.7vw]"
              >
                {r.avatar ? (
                  <img src={r.avatar} alt={r.name} draggable={false} className="size-full object-cover" />
                ) : (
                  r.initials
                )}
              </motion.div>
            </motion.div>

            {/* text */}
            <div className="min-w-0">
              <p className="text-sm leading-snug text-white/95 md:whitespace-pre-line md:text-[max(12px,1.15vw)]">
                {r.quote}
              </p>
              <p className="mt-3 text-sm font-bold md:mt-[1vw] md:text-[max(12px,1.1vw)]">— {r.name}</p>
              <div className="mt-2 flex gap-1 md:mt-[0.7vw] md:gap-[0.3vw]">
                {[0, 1, 2, 3, 4].map((j) => (
                  <motion.span
                    key={j}
                    variants={starV}
                    custom={1.45 + i * 0.18 + j * 0.08}
                    className="inline-block"
                  >
                    <span
                      className="block text-[#b9e43a] transition-transform duration-300 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] group-hover:-translate-y-1 group-hover:scale-125 group-hover:rotate-12"
                      style={{ transitionDelay: `${j * 45}ms` }}
                    >
                      <Star className="size-4 md:size-[1.3vw]" fill="currentColor" strokeWidth={1.5} />
                    </span>
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- section ---------- */
export default function ReviewsSlide({ mx, my, scrollRef, links = [], onGo }) {
  const [year] = useState(() => new Date().getFullYear());

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
            "radial-gradient(circle at 12% 12%, rgba(135,158,32,0.55) 0%, rgba(135,158,32,0) 48%), linear-gradient(180deg, #57681a 0%, #3d4c0f 55%, #2c3909 100%)",
        }}
      />

      {/* soft ambient blob */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[30%] top-[-10%] size-[36vw] rounded-full bg-[#b7d83a]/10 blur-[90px]"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
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
        <div className="mx-auto flex min-h-full w-full max-w-[1900px] flex-col">
          {/* TOP: reviews */}
          <div className="flex flex-1 items-center px-5 pb-8 pt-12 md:px-[9.2vw] md:py-[3vw]">
            <div className="grid w-full items-center gap-8 md:grid-cols-[0.49fr_1fr] md:gap-[3vw]">
              {/* left text */}
              <div>
                <motion.div
                  variants={labelV}
                  className="flex items-center gap-3 text-sm font-semibold md:text-[max(13px,1.1vw)]"
                >
                  What Our Customers Say
                  <motion.span variants={lineV} className="h-px w-12 origin-left bg-white md:w-[3.5vw]" />
                </motion.div>

                <h2 className="mt-4 text-[clamp(2.2rem,3.4vw,4.6rem)] font-extrabold leading-[1.05] tracking-tight md:mt-[1vw]">
                  <Words text="Sweet" base={0} />
                  <span className="text-[#c9ea5c]">
                    <Words text="Words" base={1} />
                  </span>
                </h2>

                <motion.p
                  variants={descV}
                  className="mt-4 max-w-[22rem] text-sm leading-relaxed text-white/90 md:mt-[1.2vw] md:max-w-[24vw] md:text-[max(13px,1.12vw)]"
                >
                  Real stories from real customers who love Pearry’s bakery treats.
                </motion.p>

                <motion.a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  variants={btnV}
                  whileHover={{ scale: 1.07, y: -3, transition: jump }}
                  whileTap={{ scale: 0.92 }}
                  className="group relative mt-6 inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-[#ece9d9] px-6 py-3 text-sm font-bold text-[#2f3a0c] shadow-[0_14px_30px_rgba(0,0,0,0.25)] md:mt-[1.8vw] md:px-[1.7vw] md:py-[0.8vw] md:text-[max(13px,1.05vw)]"
                >
                  <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/70 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
                  <span className="relative">Read More Reviews</span>
                  <ArrowRight
                    className="relative size-4 transition-transform duration-300 group-hover:translate-x-1.5 md:size-[1.2vw]"
                    strokeWidth={2.4}
                  />
                </motion.a>
              </div>

              {/* review cards */}
              <div className="grid gap-4 md:grid-cols-2 md:gap-[1.6vw]">
                {REVIEWS.map((r, i) => (
                  <ReviewCard key={r.name} r={r} i={i} />
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM: footer */}
          <motion.footer variants={footerV} className="relative mx-5 mt-4 md:mx-[5vw] md:mt-0">
            {/* curved glass top border (right side me fade hota hai) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-t-[2.5rem] border-l border-t border-[#c6e65c]/55 bg-gradient-to-b from-white/[0.07] to-transparent md:rounded-t-[4.6vw] [mask-image:linear-gradient(90deg,#000_55%,transparent_100%)]"
            />

            <div className="relative px-6 pt-8 md:px-[3.6vw] md:pt-[2.2vw]">
              <div className="grid gap-7 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-[2vw]">
                {/* logo */}
                <motion.div variants={footItemV} custom={1.4}>
                  <motion.div
                    whileHover={{ scale: 1.05, transition: jump }}
                    className="group inline-flex cursor-pointer items-center gap-2 md:gap-[0.6vw]"
                  >
                    <Leaf
                      className="size-9 text-[#e3f4a0] transition-transform duration-500 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] group-hover:-rotate-[18deg] group-hover:scale-110 md:size-[3.2vw]"
                      strokeWidth={2.2}
                      fill="currentColor"
                      fillOpacity={0.25}
                    />
                    <span className="text-3xl font-semibold tracking-tight md:text-[3vw]">Pearry</span>
                  </motion.div>
                  <p className="mt-2 text-sm text-white/90 md:mt-[0.5vw] md:text-[max(12px,1.1vw)]">
                    Baked with love. Always.
                  </p>
                </motion.div>

                {/* nav links */}
                <nav className="flex flex-wrap gap-x-6 gap-y-3 md:gap-x-[2.6vw]">
                  {links.map((l, i) => (
                    <motion.a
                      key={l.label}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onGo?.(l.to);
                      }}
                      variants={footItemV}
                      custom={1.5 + i * 0.07}
                      whileHover={{ y: -3, transition: jump }}
                      whileTap={{ scale: 0.92 }}
                      className="group relative cursor-pointer text-sm font-semibold md:text-[max(12px,1.05vw)]"
                    >
                      {l.label}
                      <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-center scale-x-0 rounded-full bg-[#c6e65c] transition-transform duration-300 group-hover:scale-x-100" />
                    </motion.a>
                  ))}
                </nav>

                {/* socials */}
                <div className="flex gap-2.5 md:justify-self-end md:gap-[0.8vw]">
                  {SOCIALS.map(({ Icon, label }, i) => (
                    <motion.a
                      key={label}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      aria-label={label}
                      variants={socialV}
                      custom={i}
                      whileHover={{ scale: 1.2, rotate: i % 2 ? 10 : -10, y: -4, transition: jump }}
                      whileTap={{ scale: 0.82 }}
                      className="grid size-11 cursor-pointer place-items-center rounded-full border border-white/10 bg-[#2b380a]/70 text-white shadow-[0_8px_18px_rgba(0,0,0,0.25)] transition-colors duration-300 hover:bg-[#d8ee8f] hover:text-[#2f3a0c] md:size-[3.4vw]"
                    >
                      <Icon className="size-5 md:size-[1.5vw]" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* divider */}
              <motion.div
                variants={dividerV}
                className="mt-7 h-px origin-left bg-white/10 md:mt-[1.8vw]"
              />

              {/* bottom row */}
              <motion.div
                variants={footItemV}
                custom={2.1}
                className="flex flex-col gap-2 py-5 text-xs text-white/90 md:flex-row md:items-center md:justify-between md:py-[1.4vw] md:text-[max(11px,0.95vw)]"
              >
                <span>© {year} Pearry. All rights reserved.</span>
                <span className="inline-flex items-center gap-1.5">
                  Made with
                  <motion.span
                    className="inline-flex"
                    animate={{ scale: [1, 1.3, 1, 1.3, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <Heart className="size-3.5 text-[#f08a2c] md:size-[1.1vw]" fill="currentColor" strokeWidth={0} />
                  </motion.span>
                  for sweet lovers
                </span>
              </motion.div>
            </div>
          </motion.footer>
        </div>
      </div>
    </motion.section>
  );
}