import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { sampleProducts } from "@/lib/sample-products";
import { ProductCard } from "./ProductCard";

const tabs = ["All", "Laptop", "Audio", "Peripherals", "Display"];

export function Collections() {
  const [active, setActive] = useState("All");
  const products = sampleProducts
    .filter((p) => active === "All" || p.tag === active)
    .slice(0, 4);
  return (
    <section id="shop" className="px-6 md:px-10 py-24 md:py-40 border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-14">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-muted-foreground">— Variant Product</p>
          </div>
          <div className="col-span-12 md:col-span-9 flex items-end justify-between gap-6">
            <h2 className="display text-4xl md:text-6xl leading-[1.02]">
              Our best <em className="italic text-accent">collections.</em>
            </h2>
            <Link to="/shop" className="hidden md:inline-flex items-center gap-2 text-sm border border-ink rounded-full pl-4 pr-1.5 py-1.5 shrink-0">
              <span>All products</span>
              <span className="w-7 h-7 rounded-full bg-ink text-background flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {tabs.map((t) => (
            <button
              key={t} onClick={() => setActive(t)}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                active === t ? "bg-ink text-background border-ink" : "border-border hover:border-ink"
              }`}
            >{t}</button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} />
          ))}
        </div>
        <div className="mt-10 md:hidden">
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm border border-ink rounded-full pl-4 pr-1.5 py-1.5">
            <span>Browse all products</span>
            <span className="w-7 h-7 rounded-full bg-ink text-background flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}