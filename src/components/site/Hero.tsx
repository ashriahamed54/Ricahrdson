import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import hero from "@/assets/hero-laptop-cutout.png";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const laptopY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const laptopRotate = useTransform(scrollYProgress, [0, 1], [0, -6]);
  const wordY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const word = "RICHARDSON";

  return (
    <section ref={ref} className="relative min-h-screen pt-24 pb-10 overflow-hidden bg-background">
      {/* soft radial wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, color-mix(in oklab, var(--accent) 8%, transparent) 0%, transparent 60%)",
        }}
      />
      <div className="relative max-w-[1400px] mx-auto">
        {/* top row */}
        <div className="grid grid-cols-12 gap-6 mb-6 md:mb-8 px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="col-span-12 md:col-span-7"
          >
            <p className="eyebrow text-muted-foreground mb-4">— Refurbished &amp; Repaired</p>
            <h1 className="display text-5xl md:text-7xl leading-[0.95]">
              Honest repair.<br /><em className="italic text-accent">Revived</em> tech.
            </h1>
            <motion.a href="#shop"
              whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}
              className="mt-8 inline-flex items-center gap-3 border border-ink/80 rounded-full pl-5 pr-2 py-2 text-sm group"
            >
              <span>Go to shop</span>
              <span className="w-8 h-8 rounded-full bg-ink text-background flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.4 }}
            className="col-span-12 md:col-span-4 md:col-start-9 self-end text-sm text-muted-foreground leading-relaxed max-w-xs"
          >
            Be the most reliable with our service. Over 20 years repairing,
            refurbishing and reviving the machines you love — honest pricing,
            same-day turnaround, no upsell.
          </motion.div>
        </div>

        {/* product stage — wordmark + cutout laptop on shared light bg */}
        <div className="relative h-[62vh] md:h-[68vh] min-h-[420px] overflow-hidden">
          {/* floating laptop cutout */}
          <motion.img
            src={hero}
            alt="Refurbished laptop — Richardson Computers"
            style={{ y: laptopY, rotate: laptopRotate }}
            initial={{ opacity: 0, scale: 0.92, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.5 }}
            className="absolute left-1/2 -translate-x-1/2 top-[6%] md:top-[2%] w-[120%] md:w-[92%] max-w-[1280px] object-contain drop-shadow-[0_40px_60px_rgba(24,1,96,0.25)]"
          />

          {/* big wordmark on top — knockout via mix-blend-difference */}
          <motion.div
            style={{ y: wordY }}
            className="absolute inset-x-0 top-[2%] md:-top-[2%] flex justify-center pointer-events-none mix-blend-difference z-10"
          >
            <span className="display leading-none tracking-tighter text-white whitespace-nowrap text-[13vw] md:text-[14vw]">
              {word.split("").map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 180, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.1, ease, delay: 0.3 + i * 0.05 }}
                  className="inline-block"
                >{c}</motion.span>
              ))}
            </span>
          </motion.div>

          {/* corner meta */}
          <motion.div
            style={{ y: textY }}
            className="absolute left-4 md:left-10 bottom-2 text-xs text-muted-foreground"
          >
            <p className="eyebrow">Est. 2003</p>
            <p className="mt-1">Richardson, TX</p>
          </motion.div>
          <motion.div
            style={{ y: textY }}
            className="absolute right-4 md:right-10 bottom-2 text-right text-xs text-muted-foreground"
          >
            <p className="eyebrow">4.8 ★ · 350+ reviews</p>
            <p className="mt-1">90-day warranty</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}