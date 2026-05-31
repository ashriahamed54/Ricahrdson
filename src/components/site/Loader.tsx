import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ease = [0.76, 0, 0.24, 1] as const;

export function Loader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = gone ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [gone]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={gone ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.9, ease }}
      className="fixed inset-0 z-[100] bg-navy text-background flex items-end overflow-hidden pointer-events-none"
      style={{ pointerEvents: gone ? "none" : "auto" }}
    >
      <div className="w-full px-6 md:px-10 pb-8 md:pb-12">
        <div className="flex items-end justify-between text-xs opacity-60 mb-6">
          <span className="eyebrow">Est. 2003</span>
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >Richardson, TX</motion.span>
        </div>
        <div className="relative overflow-hidden">
          <span className="display block handwrite leading-[0.95] tracking-tighter text-[13vw] md:text-[14vw] whitespace-nowrap">
            Richardson
          </span>
        </div>
      </div>
    </motion.div>
  );
}