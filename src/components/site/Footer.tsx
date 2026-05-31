import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="px-6 md:px-10 pt-24 md:pt-32 pb-10 bg-navy text-background relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
          <div className="col-span-12 md:col-span-6">
            <h2 className="display text-5xl md:text-7xl leading-[0.95]">
              Bring it in.<br />We'll <em className="italic">revive it.</em>
            </h2>
            <p className="mt-6 text-sm opacity-70 max-w-sm">
              346 S Central Expy Ste A, Richardson, TX 75080 · (972) 671-8050
            </p>
          </div>
          <div className="col-span-12 md:col-span-6">
            <p className="text-sm opacity-70 mb-4">Let us know to receive our newsletter</p>
            <form className="flex items-center gap-2 border-b border-background/30 pb-2">
              <input
                type="email" placeholder="your@email.com"
                className="flex-1 bg-transparent outline-none placeholder:text-background/40 py-2"
              />
              <motion.button
                whileHover={{ rotate: 45 }} transition={{ type: "spring", stiffness: 200 }}
                type="submit"
                className="w-11 h-11 rounded-full bg-background text-ink flex items-center justify-center"
              ><ArrowUpRight className="w-4 h-4" /></motion.button>
            </form>
          </div>
        </div>

        {/* huge logotype */}
        <div className="mt-20 md:mt-32 border-t border-background/20 pt-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <span className="display text-[13vw] md:text-[12vw] leading-none tracking-tighter">RICHARDSON</span>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-between gap-4 text-xs opacity-60">
          <span>© 2026 Richardson Computers · Locally owned since 2003</span>
          <div className="flex gap-6">
            <a href="tel:+19726718050">Call</a>
            <a href="mailto:info@richardsoncomputers.com">Email</a>
            <a href="#visit">Hours</a>
            <a href="#repair">Book repair</a>
          </div>
        </div>
      </div>
    </footer>
  );
}