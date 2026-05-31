import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag, Heart, GitCompare, Check } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { uiStore, useUI } from "@/lib/ui-store";

const ease = [0.22, 1, 0.36, 1] as const;

export function QuickView() {
  const p = useUI((s) => s.quickView);
  const inWish = useUI((s) => (p ? s.wishlist.some((x) => x.id === p.id) : false));
  const inCmp = useUI((s) => (p ? s.compare.some((x) => x.id === p.id) : false));

  const [selected, setSelected] = useState<Record<string, string>>({});
  const [img, setImg] = useState(0);

  useEffect(() => {
    if (!p) return;
    const init: Record<string, string> = {};
    p.options?.forEach((o) => (init[o.name] = ""));
    setSelected(init);
    setImg(0);
  }, [p?.id]);

  const images = useMemo(
    () => (p ? (p.images && p.images.length ? p.images : [p.img]) : []),
    [p],
  );

  const allSelected = !p?.options || p.options.every((o) => !!selected[o.name]);

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/50 backdrop-blur-md"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={uiStore.closeQuickView}
          />
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease }}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-background rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2"
          >
            <button
              onClick={uiStore.closeQuickView}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center hover:bg-ink hover:text-background transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Image */}
            <div className="relative bg-secondary aspect-square md:aspect-auto md:h-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={img}
                  src={images[img]}
                  alt={p.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((src, i) => (
                    <button
                      key={i} onClick={() => setImg(i)}
                      className={`w-12 h-12 rounded-sm overflow-hidden border-2 transition-colors ${
                        i === img ? "border-ink" : "border-transparent opacity-60"
                      }`}
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-6 md:p-8 flex flex-col">
              <p className="eyebrow text-muted-foreground">{p.tag}</p>
              <h2 className="display text-3xl md:text-4xl mt-2 leading-tight">{p.name}</h2>
              <p className="text-2xl mt-3 tabular-nums">${p.price.toLocaleString()}</p>

              <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-muted-foreground border-y border-border py-4">
                {Object.entries(p.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <span className="uppercase tracking-wider">{k}</span>
                    <span className="text-ink">{v}</span>
                  </div>
                ))}
              </div>

              {p.options && p.options.length > 0 && (
                <div className="mt-5 space-y-4">
                  {p.options.map((o) => (
                    <div key={o.name}>
                      <div className="flex items-baseline justify-between mb-2">
                        <p className="eyebrow text-muted-foreground">{o.name}</p>
                        <span className="text-xs">{selected[o.name] || "Select"}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {o.values.map((v) => {
                          const active = selected[o.name] === v;
                          return (
                            <motion.button
                              key={v}
                              whileTap={{ scale: 0.96 }}
                              onClick={() => setSelected((s) => ({ ...s, [o.name]: v }))}
                              className={`px-3.5 py-2 rounded-full text-xs border transition-colors ${
                                active
                                  ? "bg-ink text-background border-ink"
                                  : "border-border hover:border-ink"
                              }`}
                            >
                              {v}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-auto pt-6 flex items-center gap-3">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  disabled={!allSelected}
                  onClick={() => {
                    uiStore.addToCart(p, p.options ? selected : undefined);
                    uiStore.closeQuickView();
                  }}
                  className="flex-1 inline-flex items-center justify-between bg-ink text-background rounded-full pl-5 pr-1.5 py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>{allSelected ? "Add to bag" : "Select options"}</span>
                  <span className="w-8 h-8 rounded-full bg-background text-ink flex items-center justify-center">
                    {allSelected ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  </span>
                </motion.button>
                <button
                  aria-label="Wishlist"
                  onClick={() => uiStore.toggleWishlist(p)}
                  className={`w-11 h-11 rounded-full border border-border flex items-center justify-center transition-colors ${
                    inWish ? "bg-accent text-background border-accent" : "hover:border-ink"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${inWish ? "fill-current" : ""}`} />
                </button>
                <button
                  aria-label="Compare"
                  onClick={() => uiStore.toggleCompare(p)}
                  className={`w-11 h-11 rounded-full border border-border flex items-center justify-center transition-colors ${
                    inCmp ? "bg-accent text-background border-accent" : "hover:border-ink"
                  }`}
                >
                  <GitCompare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}