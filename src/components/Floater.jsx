import { motion, useTransform } from "framer-motion";
import { dir } from "../data/heroes";

const EASE = [0.22, 1, 0.36, 1];

const pop = {
  enter: (c) => ({
    y: (dir.v > 0 ? 1 : -1) * (60 + c.depth * 70),
    scale: 0.7,
    rotate: c.rotate - 25,
    opacity: 0,
    filter: `blur(${12 + c.depth * 6}px)`,
  }),
  center: (c) => {
    const delay = 0.55 + c.index * 0.08;
    return {
      y: 0,
      scale: 1,
      rotate: c.rotate,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        default: { type: "spring", stiffness: 60, damping: 15, mass: 1, delay },
        opacity: { duration: 0.9, ease: EASE, delay },
        filter: { duration: 1.1, ease: EASE, delay },
      },
    };
  },
  exit: (c) => ({
    y: (dir.v > 0 ? -1 : 1) * (60 + c.depth * 70),
    scale: 0.8,
    opacity: 0,
    filter: `blur(${12 + c.depth * 6}px)`,
    transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1], delay: c.index * 0.02 },
  }),
};

export default function Floater({
  src,
  left,
  top,
  size,
  rotate = 0,
  blur = 0,
  depth = 0.5,
  z = 20,
  index,
  mx,
  my,
}) {
  // mouse parallax: closer (blurred) items move more
  const px = useTransform(mx, (v) => v * depth * -90);
  const py = useTransform(my, (v) => v * depth * -90);
  const interactive = !blur;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `calc(${size}vw * var(--fs, 1))`,
        x: px,
        y: py,
        zIndex: z,
        pointerEvents: "none",
      }}
    >
      <motion.div
        variants={pop}
        custom={{ rotate, depth, index }}
        whileHover={
          interactive
            ? { scale: 1.18, rotate: rotate + 14, transition: { type: "spring", stiffness: 260, damping: 12 } }
            : undefined
        }
        whileTap={interactive ? { scale: 0.85 } : undefined}
        style={{ pointerEvents: interactive ? "auto" : "none" }}
        className="cursor-pointer"
      >
        <motion.img
          src={src}
          alt=""
          draggable={false}
          className={`block h-auto w-full select-none ${
            blur ? "" : "drop-shadow-[0_14px_16px_rgba(0,0,0,0.28)]"
          }`}
          style={blur ? { filter: `blur(${blur}px)` } : undefined}
          animate={{ y: [0, -10, 0, 8, 0], rotate: [0, 4, 0, -4, 0] }}
          transition={{ duration: 6 + (index % 4), repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}