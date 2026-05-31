import { motion } from "framer-motion";
import eco from "@/assets/eco-box.jpg";

export function Eco() {
  return (
    <section className="px-6 md:px-10 py-24 md:py-40">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6 mb-12">
        <div className="col-span-12 md:col-span-3">
          <p className="eyebrow text-muted-foreground">— Special About Us</p>
        </div>
        <div className="col-span-12 md:col-span-6">
          <h2 className="display text-4xl md:text-6xl leading-[1.02]">
            Eco-friendly <em className="italic">packaging.</em>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-3 text-sm text-muted-foreground leading-relaxed">
          Recycled fibers, soy inks, and zero plastics. The first object you hold should already
          tell the story.
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1400px] mx-auto aspect-[16/9] overflow-hidden rounded-sm bg-secondary"
      >
        <img src={eco} alt="Eco packaging" loading="lazy" className="w-full h-full object-cover" />
      </motion.div>
    </section>
  );
}