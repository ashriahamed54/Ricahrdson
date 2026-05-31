import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Collections } from "@/components/site/Collections";
import { Repair } from "@/components/site/Repair";
import { Eco } from "@/components/site/Eco";
import { Journal } from "@/components/site/Journal";
import { Visit } from "@/components/site/Visit";
import { Footer } from "@/components/site/Footer";
import { Loader } from "@/components/site/Loader";
import { useLenis } from "@/hooks/use-lenis";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Richardson Computers — Repair, Refurbished Sales & Recycling · Richardson, TX" },
      { name: "description", content: "Locally-owned electronics repair shop in Richardson, TX since 2003. Laptop & Mac repair, phone screens, SSD upgrades, data recovery. 4.8★ · 90-day warranty." },
      { property: "og:title", content: "Richardson Computers — Repair & Refurbished Tech" },
      { property: "og:description", content: "Over 20 years of honest, no-upsell computer repair in the DFW metroplex. (972) 671-8050." },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerH, setFooterH] = useState(0);
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const measure = () => setFooterH(el.offsetHeight);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, []);
  return (
    <main className="bg-background text-foreground">
      <Loader />
      <Nav />
      <div
        className="relative z-10 bg-background"
        style={{ marginBottom: footerH }}
      >
        <Hero />
        <Marquee />
        <Collections />
        <Repair />
        <Eco />
        <Journal />
        <Visit />
      </div>
      <div ref={footerRef} className="fixed bottom-0 inset-x-0 z-0 max-h-screen overflow-hidden">
        <Footer />
      </div>
    </main>
  );
}
