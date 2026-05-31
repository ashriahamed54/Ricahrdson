import { motion } from "framer-motion";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { useLenis } from "@/hooks/use-lenis";

const ease = [0.22, 1, 0.36, 1] as const;

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  children: React.ReactNode;
}) {
  useLenis();
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />
      <section className="px-6 md:px-10 pt-36 md:pt-44 pb-20 border-b border-border">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="col-span-12 md:col-span-7"
          >
            <p className="eyebrow text-muted-foreground mb-4">— {eyebrow}</p>
            <h1 className="display text-5xl md:text-7xl leading-[0.95]">{title}</h1>
          </motion.div>
          {intro && (
            <motion.p
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.1 }}
              className="col-span-12 md:col-span-4 md:col-start-9 self-end text-sm text-muted-foreground leading-relaxed"
            >{intro}</motion.p>
          )}
        </div>
      </section>
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto">{children}</div>
      </section>
      <Footer />
    </main>
  );
}