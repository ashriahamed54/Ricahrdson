import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, ShoppingBag, ArrowUpRight } from "lucide-react";
import { uiStore, useUI } from "@/lib/ui-store";

const ease = [0.22, 1, 0.36, 1] as const;

export function CartDrawer() {
  const open = useUI((s) => s.cartOpen);
  const cart = useUI((s) => s.cart);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={uiStore.closeCart}
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease }}
            className="absolute right-0 top-0 bottom-0 w-full sm:w-[440px] bg-background flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span className="display text-xl">Your bag · {cart.length}</span>
              </div>
              <button onClick={uiStore.closeCart} aria-label="Close" className="p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-border">
              {cart.length === 0 && (
                <div className="py-20 text-center text-sm text-muted-foreground">
                  Your bag is empty.
                </div>
              )}
              <AnimatePresence initial={false}>
                {cart.map((it) => (
                  <motion.div
                    key={it.id}
                    layout
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.4, ease }}
                    className="flex gap-4 py-4"
                  >
                    <div className="w-20 h-24 overflow-hidden rounded-sm bg-secondary shrink-0">
                      <img src={it.img} alt={it.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between gap-2">
                        <p className="text-sm leading-snug">{it.name}</p>
                        <button
                          onClick={() => uiStore.removeFromCart(it.id)}
                          className="text-muted-foreground hover:text-ink"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">${it.price.toLocaleString()}</p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="inline-flex items-center border border-border rounded-full">
                          <button onClick={() => uiStore.updateQty(it.id, -1)} className="p-1.5"><Minus className="w-3 h-3" /></button>
                          <span className="px-2 text-xs tabular-nums">{it.qty}</span>
                          <button onClick={() => uiStore.updateQty(it.id, 1)} className="p-1.5"><Plus className="w-3 h-3" /></button>
                        </div>
                        <span className="text-sm tabular-nums">${(it.price * it.qty).toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="border-t border-border px-6 py-5 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="display text-2xl tabular-nums">${subtotal.toLocaleString()}</span>
              </div>
              <Link
                to="/cart"
                onClick={uiStore.closeCart}
                className="block w-full text-center border border-ink rounded-full py-3 text-sm hover:bg-ink hover:text-background transition-colors"
              >
                View cart
              </Link>
              <button
                disabled={cart.length === 0}
                className="w-full inline-flex items-center justify-between bg-ink text-background rounded-full pl-5 pr-2 py-2 text-sm disabled:opacity-40"
              >
                <span>Checkout</span>
                <span className="w-8 h-8 rounded-full bg-background text-ink flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}