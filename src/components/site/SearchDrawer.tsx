import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Search, X, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { uiStore, useUI } from "@/lib/ui-store";
import { sampleProducts } from "@/lib/sample-products";

const ease = [0.22, 1, 0.36, 1] as const;
const suggestions = ["Laptop repair", "Screen replacement", "SSD upgrade", "Data recovery", "Refurbished MacBook"];

export function SearchDrawer() {
  const open = useUI((s) => s.searchOpen);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
    else setQ("");
  }, [open]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return sampleProducts.filter(
      (p) => p.name.toLowerCase().includes(s) || p.tag.toLowerCase().includes(s),
    );
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={uiStore.closeSearch}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease }}
            className="absolute top-0 inset-x-0 bg-background border-b border-border"
          >
            <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-6 md:py-10">
              <div className="flex items-center justify-between mb-4">
                <p className="eyebrow text-muted-foreground">— Search</p>
                <button onClick={uiStore.closeSearch} aria-label="Close" className="p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-3 border-b border-ink pb-3">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search products, repairs, parts…"
                  className="flex-1 bg-transparent outline-none display text-2xl md:text-4xl placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="mt-6 min-h-[120px]">
                {q.trim() === "" ? (
                  <div>
                    <p className="eyebrow text-muted-foreground mb-3">Popular</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => setQ(s)}
                          className="text-xs border border-border rounded-full px-3 py-1.5 hover:border-ink transition-colors"
                        >{s}</button>
                      ))}
                    </div>
                  </div>
                ) : results.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No matches for "{q}". Try a different keyword.</p>
                ) : (
                  <ul className="divide-y divide-border">
                    {results.map((p, i) => (
                      <motion.li
                        key={p.id}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.05, ease }}
                      >
                        <Link
                          to="/shop"
                          onClick={uiStore.closeSearch}
                          className="flex items-center gap-4 py-3 group"
                        >
                          <div className="w-14 h-16 overflow-hidden rounded-sm bg-secondary shrink-0">
                            <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{p.name}</p>
                            <p className="text-xs text-muted-foreground">{p.tag} · ${p.price.toLocaleString()}</p>
                          </div>
                          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}