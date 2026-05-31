import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Heart, GitCompare, Plus, Check, SlidersHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { uiStore, useUI } from "@/lib/ui-store";
import type { SampleProduct } from "@/lib/sample-products";

export type ProductView = "grid" | "compact" | "list";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProductCard({
  p, index = 0, view = "grid",
}: { p: SampleProduct; index?: number; view?: ProductView }) {
  const inWish = useUI((s) => s.wishlist.some((x) => x.id === p.id));
  const inCmp = useUI((s) => s.compare.some((x) => x.id === p.id));
  const inCart = useUI((s) => s.cart.some((x) => x.id === p.id));

  const images = p.images && p.images.length ? p.images : [p.img];
  const [idx, setIdx] = useState(0);
  const hoverRef = useRef<number | null>(null);
  const hasOptions = !!(p.options && p.options.length);
  const handlePrimary = () => {
    if (hasOptions) uiStore.openQuickView(p);
    else uiStore.addToCart(p);
  };

  // Auto-cycle through variation images on hover (desktop)
  useEffect(() => () => { if (hoverRef.current) window.clearInterval(hoverRef.current); }, []);
  const startCycle = () => {
    if (images.length < 2 || hoverRef.current) return;
    hoverRef.current = window.setInterval(
      () => setIdx((i) => (i + 1) % images.length),
      900,
    );
  };
  const stopCycle = () => {
    if (hoverRef.current) { window.clearInterval(hoverRef.current); hoverRef.current = null; }
    setIdx(0);
  };

  if (view === "list") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease, delay: (index % 6) * 0.05 }}
        className="group flex gap-4 md:gap-6 py-5 border-b border-border"
      >
        <div
          className="relative w-28 h-32 md:w-44 md:h-52 shrink-0 overflow-hidden rounded-sm bg-secondary"
          onMouseEnter={startCycle} onMouseLeave={stopCycle}
        >
          <ImageStack images={images} idx={idx} name={p.name} />
          <Dots count={images.length} idx={idx} />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <p className="eyebrow text-muted-foreground">{p.tag}</p>
            <h3 className="display text-xl md:text-3xl mt-1 leading-tight">{p.name}</h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-2 line-clamp-2">
              {Object.entries(p.specs).slice(0, 3).map(([k, v]) => `${k}: ${v}`).join(" · ")}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3 mt-3">
            <span className="text-base md:text-lg tabular-nums">${p.price.toLocaleString()}</span>
            <div className="flex items-center gap-2">
              <IconBtn label="Wishlist" active={inWish} onClick={() => uiStore.toggleWishlist(p)}>
                <Heart className={`w-3.5 h-3.5 ${inWish ? "fill-current" : ""}`} />
              </IconBtn>
              <IconBtn label="Compare" active={inCmp} onClick={() => uiStore.toggleCompare(p)}>
                <GitCompare className="w-3.5 h-3.5" />
              </IconBtn>
              <button
                onClick={handlePrimary}
                className="inline-flex items-center gap-1.5 bg-ink text-background rounded-full pl-3 pr-1 py-1 text-xs"
              >
                <span>{inCart ? "In bag" : hasOptions ? "Quick view" : "Add to bag"}</span>
                <span className="w-6 h-6 rounded-full bg-background text-ink flex items-center justify-center">
                  {inCart ? <Check className="w-3 h-3" /> : hasOptions ? <SlidersHorizontal className="w-3 h-3" /> : <ShoppingBag className="w-3 h-3" />}
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  const ratio = view === "compact" ? "aspect-square" : "aspect-[4/5]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease, delay: (index % 4) * 0.06 }}
      className="group block"
    >
      <div
        className={`relative ${ratio} overflow-hidden rounded-sm bg-secondary`}
        onMouseEnter={startCycle} onMouseLeave={stopCycle}
      >
        <ImageStack images={images} idx={idx} name={p.name} />

        {/* Top-left: category — hidden until hover on desktop */}
        <div className="absolute top-3 left-3 eyebrow bg-background/90 backdrop-blur px-2 py-1 rounded-sm hidden md:block md:opacity-0 md:-translate-x-2 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          {p.tag}
        </div>

        {/* Top-right: wishlist + compare — hidden until hover on desktop */}
        <div className="absolute top-3 right-3 hidden md:flex flex-col gap-2 md:opacity-0 md:translate-x-2 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <IconBtn label="Wishlist" active={inWish} onClick={() => uiStore.toggleWishlist(p)}>
            <Heart className={`w-3.5 h-3.5 ${inWish ? "fill-current" : ""}`} />
          </IconBtn>
          <IconBtn label="Compare" active={inCmp} onClick={() => uiStore.toggleCompare(p)}>
            <GitCompare className="w-3.5 h-3.5" />
          </IconBtn>
        </div>

        {/* Mobile compact top-right icons (always visible, small) */}
        <div className="absolute top-2 right-2 flex md:hidden gap-1.5">
          <MiniIcon label="Wishlist" active={inWish} onClick={() => uiStore.toggleWishlist(p)}>
            <Heart className={`w-3 h-3 ${inWish ? "fill-current" : ""}`} />
          </MiniIcon>
          <MiniIcon label="Compare" active={inCmp} onClick={() => uiStore.toggleCompare(p)}>
            <GitCompare className="w-3 h-3" />
          </MiniIcon>
        </div>

        {/* Dots for variation images */}
        <Dots count={images.length} idx={idx} onSelect={setIdx} />

        {/* Add to bag / Quick view — hover reveal on desktop only */}
        <motion.button
          onClick={handlePrimary}
          className="hidden md:inline-flex absolute inset-x-3 bottom-3 items-center justify-between bg-ink text-background rounded-full pl-4 pr-1 py-1.5 text-xs translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
          <span>{inCart ? "In bag" : hasOptions ? "Quick view" : "Add to bag"}</span>
          <span className="w-7 h-7 rounded-full bg-background text-ink flex items-center justify-center">
            {inCart ? <Check className="w-3.5 h-3.5" /> : hasOptions ? <SlidersHorizontal className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          </span>
        </motion.button>
      </div>

      {/* Caption row */}
      <div className="mt-3 md:mt-4">
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-1">{p.tag}</p>
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[13px] md:text-base truncate min-w-0">{p.name}</span>
          <span className="text-[12px] md:text-sm text-muted-foreground tabular-nums shrink-0">
            ${p.price.toLocaleString()}
          </span>
        </div>
        {/* Mobile-only action row */}
        <button
          onClick={handlePrimary}
          className="md:hidden mt-2.5 w-full inline-flex items-center justify-between bg-ink text-background rounded-full pl-3 pr-1 py-1.5 text-[11px]"
        >
          <span>{inCart ? "In bag" : hasOptions ? "Quick view" : "Add to bag"}</span>
          <span className="w-6 h-6 rounded-full bg-background text-ink flex items-center justify-center">
            {inCart ? <Check className="w-3 h-3" /> : hasOptions ? <SlidersHorizontal className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
          </span>
        </button>
      </div>
    </motion.div>
  );
}

function ImageStack({ images, idx, name }: { images: string[]; idx: number; name: string }) {
  return (
    <AnimatePresence initial={false} mode="sync">
      <motion.img
        key={idx}
        src={images[idx]}
        alt={name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.6, ease }}
      />
    </AnimatePresence>
  );
}

function Dots({
  count, idx, onSelect,
}: { count: number; idx: number; onSelect?: (i: number) => void }) {
  if (count < 2) return null;
  return (
    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-background/75 backdrop-blur px-2 py-1 rounded-full md:opacity-0 md:group-hover:opacity-100 transition-opacity">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          aria-label={`Variation ${i + 1}`}
          onClick={(e) => { e.preventDefault(); onSelect?.(i); }}
          className={`h-1.5 rounded-full transition-all ${
            i === idx ? "w-4 bg-ink" : "w-1.5 bg-ink/30"
          }`}
        />
      ))}
    </div>
  );
}

function IconBtn({
  children, onClick, label, active,
}: { children: React.ReactNode; onClick: () => void; label: string; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`w-8 h-8 rounded-full backdrop-blur flex items-center justify-center transition-colors ${
        active ? "bg-accent text-background" : "bg-background/85 text-ink hover:bg-ink hover:text-background"
      }`}
    >
      {children}
    </button>
  );
}

function MiniIcon({
  children, onClick, label, active,
}: { children: React.ReactNode; onClick: () => void; label: string; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`w-6 h-6 rounded-full backdrop-blur flex items-center justify-center transition-colors ${
        active ? "bg-accent text-background" : "bg-background/85 text-ink"
      }`}
    >
      {children}
    </button>
  );
}