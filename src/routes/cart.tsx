import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Minus, Plus, X, ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { uiStore, useUI } from "@/lib/ui-store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — Richardson Computers" },
      { name: "description", content: "Review the gear you're picking up from Richardson Computers." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const items = useUI((s) => s.cart);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <PageShell
      eyebrow="Your Bag"
      title={<>In your <em className="italic text-accent">cart.</em></>}
      intro="Reserve in store for same-day pickup, or ship anywhere in the lower 48. No restocking fees within 30 days."
    >
      {items.length === 0 ? (
        <EmptyState
          label="Your cart is empty."
          cta="Browse the shop"
          to="/shop"
        />
      ) : (
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          <div className="col-span-12 lg:col-span-7 xl:col-span-8 divide-y divide-border">
            {items.map((it, i) => (
              <motion.div
                key={it.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-4 sm:gap-5 py-6"
              >
                <div className="w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-40 overflow-hidden rounded-sm bg-secondary shrink-0">
                  <img src={it.img} alt={it.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex justify-between gap-3">
                    <div className="min-w-0">
                      <p className="eyebrow text-muted-foreground">{it.tag}</p>
                      <p className="display text-xl sm:text-2xl mt-1 truncate">{it.name}</p>
                    </div>
                    <button onClick={() => uiStore.removeFromCart(it.id)} className="text-muted-foreground hover:text-ink shrink-0">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="inline-flex items-center border border-border rounded-full">
                      <button onClick={() => uiStore.updateQty(it.id, -1)} className="p-2"><Minus className="w-3 h-3" /></button>
                      <span className="px-3 text-sm tabular-nums">{it.qty}</span>
                      <button onClick={() => uiStore.updateQty(it.id, 1)} className="p-2"><Plus className="w-3 h-3" /></button>
                    </div>
                    <span className="text-base tabular-nums">${(it.price * it.qty).toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <aside className="col-span-12 lg:col-span-5 xl:col-span-4 bg-secondary/60 rounded-sm p-6 md:p-8 self-start lg:sticky lg:top-28">
            <p className="eyebrow text-muted-foreground mb-4">— Summary</p>
            <Row k="Subtotal" v={`$${subtotal.toLocaleString()}`} />
            <Row k="Shipping" v="Free · in-store pickup" />
            <Row k="Estimated tax" v={`$${Math.round(subtotal * 0.0825).toLocaleString()}`} />
            <div className="border-t border-border mt-6 pt-6 flex items-baseline justify-between">
              <span className="display text-2xl">Total</span>
              <span className="display text-3xl tabular-nums">
                ${Math.round(subtotal * 1.0825).toLocaleString()}
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="mt-8 w-full inline-flex items-center justify-between bg-ink text-background rounded-full pl-6 pr-2 py-2 text-sm"
            >
              <span>Checkout</span>
              <span className="w-8 h-8 rounded-full bg-background text-ink flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </motion.button>
            <Link to="/shop" className="block mt-4 text-xs text-muted-foreground underline-offset-4 hover:underline">
              ← Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </PageShell>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between text-sm py-2">
      <span className="text-muted-foreground">{k}</span>
      <span>{v}</span>
    </div>
  );
}

function EmptyState({ label, cta, to }: { label: string; cta: string; to: string }) {
  return (
    <div className="py-20 text-center">
      <p className="display text-3xl mb-6">{label}</p>
      <Link to={to} className="inline-flex items-center gap-3 border border-ink rounded-full pl-5 pr-2 py-2 text-sm">
        <span>{cta}</span>
        <span className="w-8 h-8 rounded-full bg-ink text-background flex items-center justify-center">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </Link>
    </div>
  );
}