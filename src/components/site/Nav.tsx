import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, Search, Heart, GitCompare } from "lucide-react";
import { uiStore, useUI } from "@/lib/ui-store";

const links: { label: string; to?: string; href?: string }[] = [
  { label: "Shop", to: "/shop" },
  { label: "Repair", href: "/#repair" },
  { label: "Journal", href: "/#journal" },
  { label: "Visit", href: "/#visit" },
];

export function Nav() {
  const cartCount = useUI((s) => s.cart.reduce((n, i) => n + i.qty, 0));
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-6 md:px-10 py-5 mix-blend-difference text-background"
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="display text-lg md:text-2xl tracking-tight">RICHARDSON</span>
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-sm">
          {links.map((l) =>
            l.to ? (
              <Link key={l.label} to={l.to} className="relative group">
                <span>{l.label}</span>
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-current transition-all duration-500 group-hover:w-full" />
              </Link>
            ) : (
              <a key={l.label} href={l.href} className="relative group">
                <span>{l.label}</span>
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-current transition-all duration-500 group-hover:w-full" />
              </a>
            ),
          )}
        </nav>
        <div className="flex items-center gap-3.5 md:gap-5">
          <button aria-label="Search" onClick={uiStore.openSearch} className="p-1"><Search className="w-4 h-4" /></button>
          <Link to="/wishlist" aria-label="Wishlist" className="p-1"><Heart className="w-4 h-4" /></Link>
          <Link to="/compare" aria-label="Compare" className="p-1"><GitCompare className="w-4 h-4" /></Link>
          <button aria-label="Cart" onClick={uiStore.openCart} className="p-1 relative">
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[9px] leading-none bg-accent text-background rounded-full w-3.5 h-3.5 flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}