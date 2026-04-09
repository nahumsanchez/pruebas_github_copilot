import { motion } from "framer-motion";
import { useClock } from "../hooks/useClock";

export default function Clock() {
  const { time, date } = useClock();

  return (
    <motion.section
      className="cyber-card col-span-1"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <p className="card-label">System Time</p>
      <h2 className="font-display text-5xl tracking-[0.25em] text-neon-cyan sm:text-6xl">
        {time}
      </h2>
      <p className="mt-4 text-lg capitalize text-white/75">{date}</p>
      <div className="mt-6 h-[2px] w-full rounded-full bg-gradient-to-r from-neon-cyan/10 via-neon-cyan to-neon-cyan/10" />
    </motion.section>
  );
}
