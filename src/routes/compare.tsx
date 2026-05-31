import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { uiStore, useUI } from "@/lib/ui-store";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare — Richardson Computers" },
      { name: "description", content: "Side-by-side specs for the gear you're weighing." },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  const items = useUI((s) => s.compare);
  if (items.length === 0) {
    return (
      <PageShell
        eyebrow="Side by Side"
        title={<>Compare the <em className="italic text-accent">specs.</em></>}
      >
        <div className="py-20 text-center">
          <p className="display text-3xl mb-6">Nothing to compare yet.</p>
          <Link to="/shop" className="text-sm underline underline-offset-4">Pick a few products →</Link>
        </div>
      </PageShell>
    );
  }
  const specKeys = Array.from(
    new Set(items.flatMap((i) => Object.keys(i.specs))),
  );

  return (
    <PageShell
      eyebrow="Side by Side"
      title={<>Compare the <em className="italic text-accent">specs.</em></>}
      intro="Numbers cut through the marketing. Stack up to four products and pick the one that earns its desk space."
    >
      <div className="overflow-x-auto -mx-6 px-6">
        <div
          className="grid gap-4 min-w-[760px]"
          style={{ gridTemplateColumns: `200px repeat(${items.length}, minmax(200px,1fr))` }}
        >
          <div />
          {items.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-sm bg-secondary">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <button
                onClick={() => uiStore.toggleCompare(p)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-background/90 backdrop-blur flex items-center justify-center"
                aria-label="Remove from comparison"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <p className="mt-3 display text-xl">{p.name}</p>
              <p className="text-sm text-muted-foreground">${p.price.toLocaleString()}</p>
            </motion.div>
          ))}

          {/* spec rows */}
          {specKeys.map((key) => (
            <ContentRow key={key} label={key} items={items} fieldKey={key} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function ContentRow({
  label,
  items,
  fieldKey,
}: {
  label: string;
  items: { id: string; specs: Record<string, string> }[];
  fieldKey: string;
}) {
  return (
    <>
      <div className="border-t border-border pt-4 eyebrow text-muted-foreground capitalize">
        {label}
      </div>
      {items.map((p) => (
        <div key={p.id} className="border-t border-border pt-4 text-sm">
          {p.specs[fieldKey] ?? "—"}
        </div>
      ))}
    </>
  );
}