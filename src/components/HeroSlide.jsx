import { motion, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Leaf,
  User,
} from "lucide-react";
import { dir } from "../data/heroes";
import Floater from "./Floater";

const jump = { type: "spring", stiffness: 300, damping: 14 };

/* ---------- animation helpers ---------- */
const S = 1; // speed: 1 = normal, 1.3 = aur slow, 0.8 = thoda fast
const EASE = [0.22, 1, 0.36, 1];
const BLUR = "blur(14px)";
const NO_BLUR = "blur(0px)";

// smooth "fade + blur in" with soft spring for movement
const soft = (delay = 0) => {
  const d = delay * S;
  return {
    default: { type: "spring", stiffness: 60, damping: 15, mass: 1, delay: d },
    opacity: { duration: 0.9 * S, ease: EASE, delay: d },
    filter: { duration: 1.1 * S, ease: EASE, delay: d },
  };
};

// smooth "fade + blur out"
const leave = (delay = 0) => ({
  duration: 0.6 * S,
  ease: [0.4, 0, 0.2, 1],
  delay: delay * S,
});

/* ---------- variants ---------- */
// new slide always stays on top while old one fades out
const slideV = {
  enter: { zIndex: 2 },
  center: { zIndex: 2 },
  exit: { zIndex: 1, transition: { duration: 0 } },
};

// background: no sliding, only soft fade + tiny zoom
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

const bowlV = {
  enter: () => ({
    y: dir.v > 0 ? "16vh" : "-16vh",
    scale: 0.8,
    rotate: dir.v > 0 ? -18 : 18,
    opacity: 0,
    filter: "blur(18px)",
  }),
  center: {
    y: "0vh",
    scale: 1,
    rotate: 0,
    opacity: 1,
    filter: NO_BLUR,
    transition: soft(0.25),
  },
  exit: () => ({
    y: dir.v > 0 ? "-16vh" : "16vh",
    scale: 0.85,
    rotate: dir.v > 0 ? 14 : -14,
    opacity: 0,
    filter: "blur(18px)",
    transition: leave(0),
  }),
};

const letterV = {
  enter: () => ({
    y: dir.v > 0 ? "55%" : "-55%",
    scale: 0.9,
    opacity: 0,
    filter: "blur(16px)",
  }),
  center: (i) => ({
    y: "0%",
    scale: 1,
    opacity: 1,
    filter: NO_BLUR,
    transition: soft(0.4 + i * 0.08),
  }),
  exit: (i) => ({
    y: dir.v > 0 ? "-55%" : "55%",
    scale: 0.95,
    opacity: 0,
    filter: "blur(16px)",
    transition: leave(i * 0.04),
  }),
};

const navV = {
  enter: { y: -30, opacity: 0, filter: BLUR },
  center: { y: 0, opacity: 1, filter: NO_BLUR, transition: soft(0.6) },
  exit: { y: -30, opacity: 0, filter: BLUR, transition: leave(0) },
};

const ctaV = {
  enter: () => ({ y: dir.v > 0 ? 40 : -40, opacity: 0, filter: BLUR }),
  center: { y: 0, opacity: 1, filter: NO_BLUR, transition: soft(0.95) },
  exit: () => ({ y: dir.v > 0 ? -40 : 40, opacity: 0, filter: BLUR, transition: leave(0.05) }),
};

const textV = {
  enter: () => ({ y: dir.v > 0 ? 40 : -40, opacity: 0, filter: BLUR }),
  center: { y: 0, opacity: 1, filter: NO_BLUR, transition: soft(1.1) },
  exit: () => ({ y: dir.v > 0 ? -40 : 40, opacity: 0, filter: BLUR, transition: leave(0.1) }),
};

const ctrlV = {
  enter: { scale: 0.7, opacity: 0, filter: BLUR },
  center: { scale: 1, opacity: 1, filter: NO_BLUR, transition: soft(1.25) },
  exit: { scale: 0.7, opacity: 0, filter: BLUR, transition: leave(0) },
};

/* ---------- small pieces ---------- */
function Letters({ text, offset = 0, className = "", style }) {
  return (
    <div
      className={`flex select-none font-display leading-none text-white [text-shadow:0_0.06em_0_rgba(0,0,0,0.14)] ${className}`}
      style={style}
    >
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          custom={offset + i}
          variants={letterV}
          whileHover={{
            y: "-8%",
            scale: 1.1,
            rotate: i % 2 ? 5 : -5,
            transition: { type: "spring", stiffness: 300, damping: 14 },
          }}
          className="inline-block cursor-pointer"
        >
          {ch}
        </motion.span>
      ))}
    </div>
  );
}

function CircleBtn({ Icon, onClick, disabled, label }) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.14, rotate: 6, transition: jump }}
      whileTap={disabled ? undefined : { scale: 0.88 }}
      className="grid size-12 cursor-pointer place-items-center rounded-full border-2 border-white text-white transition-colors duration-200 hover:bg-white hover:text-(--accent) disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-white md:size-[3.8vw]"
    >
      <Icon className="size-5 md:size-[1.6vw]" strokeWidth={2.4} />
    </motion.button>
  );
}

/* ---------- slide ---------- */
export default function HeroSlide({ hero: h, index, total, onPrev, onNext, mx, my }) {
  const bx = useTransform(mx, (v) => v * -26);
  const by = useTransform(my, (v) => v * -26);
  const tx = useTransform(mx, (v) => v * 18);
  const ty = useTransform(my, (v) => v * 10);

  const ctrls =
    h.arrows === "vertical"
      ? [
          { Icon: ArrowUp, fn: onPrev, off: index === 0, label: "Previous" },
          { Icon: ArrowDown, fn: onNext, off: index === total - 1, label: "Next" },
        ]
      : [
          { Icon: ChevronRight, fn: onNext, off: index === total - 1, label: "Next" },
          { Icon: ChevronLeft, fn: onPrev, off: index === 0, label: "Previous" },
        ];

  const mobileTitleSize = `${(88 / (h.title.full.length * 0.68)).toFixed(1)}vw`;

  return (
    <motion.section
      variants={slideV}
      initial="enter"
      animate="center"
      exit="exit"
      className="stage absolute inset-0 overflow-hidden font-body text-white"
      style={{ "--accent": h.accent }}
    >
      {/* background: fade + zoom (no slide) */}
      <motion.div variants={bgV} className="absolute inset-0" style={{ background: h.bg }} />

      {/* NAV */}
      <motion.header
        variants={navV}
        className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-[5.5vw] md:py-7"
      >
        <motion.div
          whileHover={{ scale: 1.06, rotate: -2, transition: jump }}
          className={`flex cursor-pointer items-center gap-2 ${h.brand.className}`}
        >
          {h.brand.icon && <Leaf className="size-7 md:size-[2vw]" strokeWidth={2.4} />}
          {h.brand.text}
        </motion.div>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex">
          {h.nav.map((item, i) => (
            <motion.a
              key={item}
              href="#"
              onClick={(e) => e.preventDefault()}
              whileHover={{ y: -3, scale: 1.08, transition: jump }}
              whileTap={{ scale: 0.94 }}
              className={`rounded-full px-5 py-2 text-[max(13px,0.9vw)] ${
                i === 0 ? "bg-white font-semibold text-(--accent)" : "px-3 font-medium text-white/95"
              }`}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        <motion.button
          type="button"
          aria-label="Account"
          whileHover={{ scale: 1.15, rotate: 8, transition: jump }}
          whileTap={{ scale: 0.88 }}
          className="cursor-pointer text-white"
        >
          <User className="size-7 md:size-[2vw]" fill="currentColor" strokeWidth={0} />
        </motion.button>
      </motion.header>

      {/* BIG TITLE (behind the bowl) */}
      <motion.div
        className="absolute inset-x-0 z-10 -translate-y-1/2"
        style={{ top: `${h.titleTop}%`, x: tx, y: ty }}
      >
        <div
          className="hidden justify-between md:flex"
          style={{ paddingLeft: `${h.pad[0]}vw`, paddingRight: `${h.pad[1]}vw` }}
        >
          <Letters text={h.title.left} className="text-[min(11.5vw,21vh)]" />
          <Letters text={h.title.right} offset={h.title.left.length} className="text-[min(11.5vw,21vh)]" />
        </div>
        <div className="flex justify-center md:hidden">
          <Letters text={h.title.full} style={{ fontSize: mobileTitleSize }} />
        </div>
      </motion.div>

      {/* BOWL */}
      <div
        className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${h.bowl.x}%`, top: `${h.bowl.y}%`, "--bw": `${h.bowl.size}vw` }}
      >
        <motion.div style={{ x: bx, y: by }}>
          <motion.div variants={bowlV}>
            <motion.img
              src={h.bowl.src}
              alt={`${h.title.full} bowl`}
              draggable={false}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05, rotate: 6, transition: { type: "spring", stiffness: 200, damping: 14 } }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto block h-auto w-[min(74vw,44vh)] cursor-pointer select-none drop-shadow-[0_35px_45px_rgba(0,0,0,0.35)] md:w-[min(var(--bw),62vh)]"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* FLOATING INGREDIENTS */}
      {h.floaters.map((f, i) => (
        <Floater key={i} index={i} mx={mx} my={my} {...f} />
      ))}

      {/* CTA + PRICE */}
      <motion.div
        variants={ctaV}
        className="absolute z-40 flex items-center gap-4 max-md:bottom-40 max-md:left-6 md:left-(--l) md:top-(--t) md:gap-[1.2vw]"
        style={{ "--l": `${h.ctaPos.left}vw`, "--t": `${h.ctaPos.top}%` }}
      >
        <motion.button
          type="button"
          whileHover={{ scale: 1.07, rotate: -2, transition: jump }}
          whileTap={{ scale: 0.92 }}
          className="group flex cursor-pointer items-center gap-3 rounded-full bg-white px-6 py-3 text-base font-bold text-(--accent) shadow-[0_14px_30px_rgba(0,0,0,0.25)] md:px-[1.9vw] md:py-[0.85vw] md:text-[max(16px,1.2vw)]"
        >
          {h.cta}
          <ArrowRight
            className="size-5 transition-transform duration-300 group-hover:translate-x-1.5 md:size-[1.4vw]"
            strokeWidth={2.6}
          />
        </motion.button>
        <motion.span
          whileHover={{ scale: 1.15, rotate: -3, transition: jump }}
          className="cursor-default text-lg font-bold md:text-[max(17px,1.35vw)]"
        >
          {h.price}
        </motion.span>
      </motion.div>

      {/* DESCRIPTION */}
      <motion.div
        variants={textV}
        className="absolute z-40 max-md:bottom-10 max-md:left-6 max-md:right-24 md:left-(--l) md:top-(--t)"
        style={{ "--l": `${h.descPos.left}vw`, "--t": `${h.descPos.top}%` }}
      >
        {h.line && <span className="mb-3 block h-px w-14 bg-white/70" />}
        <p className="text-sm leading-snug text-white/95 md:text-[max(14px,1.3vw)] md:leading-[1.35]">
          <span className="md:hidden">{h.desc.join(" ")}</span>
          <span className="hidden md:block">
            {h.desc.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
        </p>
      </motion.div>

      {/* ARROWS */}
      <motion.div
        variants={ctrlV}
        className="absolute z-40 flex flex-col gap-3 max-md:bottom-8 max-md:right-5 md:right-[4.2vw] md:top-(--t) md:gap-[0.9vw]"
        style={{ "--t": `${h.ctrlTop}%` }}
      >
        {ctrls.map((c) => (
          <CircleBtn key={c.label} Icon={c.Icon} onClick={c.fn} disabled={c.off} label={c.label} />
        ))}
      </motion.div>
    </motion.section>
  );
}