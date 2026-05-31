import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { ProductCard } from "@/components/site/ProductCard";
import { useUI } from "@/lib/ui-store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Richardson Computers" },
      { name: "description", content: "Saved gear, ready when you are." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const items = useUI((s) => s.wishlist);

  return (
    <PageShell
      eyebrow="Saved For Later"
      title={<>Your <em className="italic text-accent">wishlist.</em></>}
      intro="Pinned pieces stay here forever — we'll ping you when prices drop or stock changes."
    >
      {items.length === 0 ? (
        <div className="py-20 text-center">
          <Heart className="w-6 h-6 mx-auto mb-4 text-accent" />
          <p className="display text-3xl mb-6">No saves yet.</p>
          <Link to="/shop" className="text-sm underline underline-offset-4">Find something you love →</Link>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {items.map((p, i) => (
              <motion.div
                key={p.id} layout
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard p={p} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </PageShell>
  );
}