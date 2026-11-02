import { motion } from "framer-motion";

const WORD = "PEARRY";

export default function Loader({ progress }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center"
      style={{ background: "radial-gradient(circle at 50% 50%, #b4cb2c 0%, #93aa20 45%, #55701a 100%)" }}
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: "blur(18px)",
        scale: 1.05,
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="flex font-display text-6xl leading-none text-white md:text-[6vw]">
          {WORD.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            >
              {ch}
            </motion.span>
          ))}
        </div>

        <div className="h-1.5 w-56 overflow-hidden rounded-full bg-white/25 md:w-[16vw]">
          <motion.div
            className="h-full rounded-full bg-white"
            animate={{ width: `${Math.max(progress, 0.06) * 100}%` }}
            transition={{ type: "spring", stiffness: 70, damping: 18 }}
          />
        </div>
      </div>
    </motion.div>
  );
}