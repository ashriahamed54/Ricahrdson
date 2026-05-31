import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import repair from "@/assets/repair-hand.jpg";

const services = [
  "LCD screen replacement",
  "Battery swaps (same-day)",
  "DC jack micro-soldering",
  "RAM & SSD upgrades",
  "Virus & ransomware removal",
  "Data recovery",
  "OS reload & password reset",
  "Phone screen & unlocking",
];

export function Repair() {
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgWrapRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <section id="repair" className="px-6 md:px-10 py-24 md:py-40 bg-secondary/60 relative noise">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6 md:gap-10">
        <div className="col-span-12 md:col-span-6">
          <p className="eyebrow text-muted-foreground mb-6">— Repair Atelier</p>
          <h2 className="display text-4xl md:text-6xl leading-[1.02] mb-8">
            Repaired until<br />it feels <em className="italic">brand new.</em>
          </h2>
          <p className="text-muted-foreground max-w-md mb-10 leading-relaxed">
            Every device is treated like an heirloom. Diagnostics in 24 hours, transparent quotes,
            and parts sourced for longevity — not turnover.
          </p>

          <ul className="grid grid-cols-2 gap-y-3 gap-x-6 mb-10">
            {services.map((s, i) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="flex items-center gap-2 text-sm"
              >
                <Check className="w-3.5 h-3.5 text-accent" /> {s}
              </motion.li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-ink text-background rounded-full px-6 py-3 text-sm"
          >
            Book a diagnostic
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-12 md:col-span-6"
        >
          <div ref={imgWrapRef} className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <motion.img
              src={repair} alt="Repairing a device" loading="lazy"
              style={{ y: imgY }}
              className="absolute inset-0 w-full h-[124%] object-cover will-change-transform"
            />
            {/* floating tag */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute bottom-6 left-6 right-6 bg-background/95 backdrop-blur rounded-sm p-5 flex items-center justify-between"
            >
              <div>
                <p className="eyebrow text-muted-foreground">Avg. turnaround</p>
                <p className="display text-3xl mt-1">48 hrs</p>
              </div>
              <div className="text-right">
                <p className="eyebrow text-muted-foreground">Warranty</p>
                <p className="display text-3xl mt-1">12 mo</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}