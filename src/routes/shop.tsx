import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { LayoutGrid, Grid2x2, Rows3, Square, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { ProductCard } from "@/components/site/ProductCard";
import { sampleProducts } from "@/lib/sample-products";
import { useIsMobile } from "@/hooks/use-mobile";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Richardson Computers" },
      { name: "description", content: "Refurbished laptops, displays, audio and peripherals — graded and warrantied by Richardson Computers." },
      { property: "og:title", content: "Shop refurbished tech — Richardson Computers" },
      { property: "og:description", content: "Inspected, repaired and ready. 90-day warranty on every order." },
    ],
  }),
  component: ShopPage,
});

const categories = ["All", "Laptop", "Audio", "Peripherals", "Display"] as const;
const sorts = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price · low to high" },
  { id: "price-desc", label: "Price · high to low" },
  { id: "name", label: "Name · A → Z" },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

type View = "grid-1" | "grid-2" | "grid-3" | "list";

function ShopPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [sort, setSort] = useState<(typeof sorts)[number]["id"]>("featured");
  const [max, setMax] = useState(2000);
  const [view, setView] = useState<View>("grid-2");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const isMobile = useIsMobile();

  const items = useMemo(() => {
    let arr = sampleProducts.filter(
      (p) => (cat === "All" || p.tag === cat) && p.price <= max,
    );
    if (sort === "price-asc") arr = [...arr].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") arr = [...arr].sort((a, b) => b.price - a.price);
    if (sort === "name") arr = [...arr].sort((a, b) => a.name.localeCompare(b.name));
    return arr;
  }, [cat, sort, max]);

  return (
    <PageShell
      eyebrow="The Shop"
      title={<>Refurbished, <em className="italic text-accent">refined.</em></>}
      intro="Every machine on this page was diagnosed, cleaned and bench-tested by our techs. Filter by category, price, and sort to your taste."
    >
      <div className="grid grid-cols-12 gap-8 lg:gap-12">
        {/* Filters — desktop sidebar */}
        <aside className="hidden lg:block col-span-12 lg:col-span-3 lg:sticky lg:top-28 self-start">
          <FiltersInner
            cat={cat} setCat={setCat}
            sort={sort} setSort={setSort}
            max={max} setMax={setMax}
          />
        </aside>

        {/* Filters — mobile drawer trigger */}
        <div className="lg:hidden col-span-12 -mt-4">
          <button
            onClick={() => setFiltersOpen(true)}
            className="inline-flex items-center gap-2 border border-border rounded-full pl-3 pr-4 py-1.5 text-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters &amp; sort</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{cat}</span>
          </button>
        </div>

        {/* Grid */}
        <div className="col-span-12 lg:col-span-9">
          <div className="flex items-center justify-between mb-6 text-xs text-muted-foreground">
            <span>{items.length} product{items.length === 1 ? "" : "s"}</span>
            <div className="flex items-center gap-1 border border-border rounded-full p-1">
              {isMobile ? (
                <>
                  <ViewBtn active={view === "grid-1"} onClick={() => setView("grid-1")} label="Single column">
                    <Square className="w-3.5 h-3.5" />
                  </ViewBtn>
                  <ViewBtn active={view !== "grid-1"} onClick={() => setView("grid-2")} label="Two column">
                    <Grid2x2 className="w-3.5 h-3.5" />
                  </ViewBtn>
                </>
              ) : (
                <>
                  <ViewBtn active={view === "grid-2"} onClick={() => setView("grid-2")} label="2-column grid">
                    <Grid2x2 className="w-3.5 h-3.5" />
                  </ViewBtn>
                  <ViewBtn active={view === "grid-3"} onClick={() => setView("grid-3")} label="Dense grid">
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </ViewBtn>
                  <ViewBtn active={view === "list"} onClick={() => setView("list")} label="List view">
                    <Rows3 className="w-3.5 h-3.5" />
                  </ViewBtn>
                </>
              )}
            </div>
          </div>

          {items.length === 0 ? (
            <p className="py-20 text-center display text-3xl">Nothing fits those filters.</p>
          ) : (
            <motion.div
              layout
              className={
                view === "list"
                  ? "flex flex-col"
                  : view === "grid-1"
                  ? "grid grid-cols-1 gap-5"
                  : view === "grid-3"
                  ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                  : "grid grid-cols-2 xl:grid-cols-3 gap-5"
              }
            >
              <AnimatePresence mode="popLayout">
                {items.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ProductCard
                      p={p} index={i}
                      view={
                        view === "list" ? "list" : view === "grid-3" ? "compact" : "grid"
                      }
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            className="fixed inset-0 z-[85] lg:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease }}
              className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto bg-background rounded-t-3xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="display text-xl">Filters</span>
                </div>
                <button onClick={() => setFiltersOpen(false)} aria-label="Close" className="p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <FiltersInner
                cat={cat} setCat={setCat}
                sort={sort} setSort={setSort}
                max={max} setMax={setMax}
              />
              <button
                onClick={() => setFiltersOpen(false)}
                className="mt-6 w-full bg-ink text-background rounded-full py-3 text-sm"
              >
                Show {items.length} product{items.length === 1 ? "" : "s"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}

function FiltersInner({
  cat, setCat, sort, setSort, max, setMax,
}: {
  cat: (typeof categories)[number];
  setCat: (c: (typeof categories)[number]) => void;
  sort: (typeof sorts)[number]["id"];
  setSort: (s: (typeof sorts)[number]["id"]) => void;
  max: number;
  setMax: (n: number) => void;
}) {
  return (
    <div className="space-y-1">
      <FilterSection label="Category" defaultOpen>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = cat === c;
            return (
              <motion.button
                key={c} onClick={() => setCat(c)}
                whileTap={{ scale: 0.95 }}
                className={`relative px-3.5 py-1.5 rounded-full text-xs border transition-colors ${
                  active ? "text-background border-ink" : "border-border hover:border-ink"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="cat-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative">{c}</span>
              </motion.button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection label="Price" defaultOpen>
        <div className="space-y-3">
          <div className="flex items-baseline justify-between text-xs">
            <span className="text-muted-foreground">Max price</span>
            <span className="display text-lg tabular-nums">${max.toLocaleString()}</span>
          </div>
          <div className="relative h-1.5 bg-secondary rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 bg-ink rounded-full"
              style={{ width: `${((max - 50) / (2000 - 50)) * 100}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            />
            <input
              type="range" min={50} max={2000} step={10}
              value={max} onChange={(e) => setMax(Number(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-ink shadow-sm pointer-events-none"
              style={{ left: `${((max - 50) / (2000 - 50)) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>$50</span>
            <span>$2,000</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection label="Sort">
        <div className="space-y-1">
          {sorts.map((s) => {
            const active = sort === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSort(s.id)}
                className="w-full flex items-center justify-between py-2 text-sm group"
              >
                <span className={active ? "text-ink" : "text-muted-foreground group-hover:text-ink transition-colors"}>
                  {s.label}
                </span>
                <span className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  active ? "border-ink bg-ink" : "border-border"
                }`}>
                  {active && (
                    <motion.span
                      layoutId="sort-dot"
                      className="block w-full h-full rounded-full"
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      <button
        onClick={() => { setCat("All"); setSort("featured"); setMax(2000); }}
        className="text-xs underline underline-offset-4 text-muted-foreground hover:text-ink mt-2"
      >
        Reset filters
      </button>
    </div>
  );
}

function FilterSection({
  label, children, defaultOpen,
}: { label: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border-t border-border first:border-t-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 group"
      >
        <span className="eyebrow text-ink">{label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.4, ease }}
          className="text-muted-foreground group-hover:text-ink"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <div className="pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ViewBtn({
  children, onClick, active, label,
}: { children: React.ReactNode; onClick: () => void; active?: boolean; label: string }) {
  return (
    <button
      onClick={onClick} aria-label={label} aria-pressed={active}
      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
        active ? "bg-ink text-background" : "text-muted-foreground hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}