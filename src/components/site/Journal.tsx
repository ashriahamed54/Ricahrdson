import { motion } from "framer-motion";
import b1 from "@/assets/blog-1.jpg";
import b2 from "@/assets/blog-2.jpg";
import b3 from "@/assets/blog-3.jpg";
import b4 from "@/assets/blog-4.jpg";

const posts = [
  { title: "Upgrades worth doing in 2026", tag: "Guide", img: b1, size: "tall" },
  { title: "Inside our custom builds", tag: "Studio", img: b2, size: "wide" },
  { title: "The repair-first workspace", tag: "Setup", img: b3, size: "tall" },
  { title: "Phones we brought back", tag: "Repair", img: b4, size: "wide" },
];

export function Journal() {
  return (
    <section id="journal" className="px-6 md:px-10 py-24 md:py-40 border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-14">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-muted-foreground">— Journal</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="display text-4xl md:text-6xl leading-[1.02]">
              Field notes from <em className="italic">the bench.</em>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((p, i) => (
            <motion.a
              key={p.title} href="#"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-sm bg-secondary ${
                i === 0 ? "md:row-span-2 aspect-[4/5] md:aspect-auto" : "aspect-[4/3]"
              }`}
            >
              <img src={p.img} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0" />
              <div className="absolute top-4 left-4 eyebrow text-background bg-ink/40 backdrop-blur px-2 py-1 rounded-sm">{p.tag}</div>
              <div className="absolute bottom-5 left-5 right-5 text-background">
                <h3 className="display text-2xl md:text-3xl leading-tight">{p.title}</h3>
                <span className="mt-2 inline-block text-xs opacity-80">Read story →</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}