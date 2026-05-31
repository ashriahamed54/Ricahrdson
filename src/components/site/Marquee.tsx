const words = ["Apple Certified", "Custom Builds", "Same-Day Service", "Eco-Conscious", "Lifetime Care", "Hand-Tested"];

export function Marquee() {
  const items = [...words, ...words];
  return (
    <div className="border-y border-border py-6 overflow-hidden whitespace-nowrap">
      <div className="marquee-track">
        {items.map((w, i) => (
          <span key={i} className="display text-3xl md:text-5xl px-8 flex items-center gap-8">
            {w}
            <span className="w-2 h-2 rounded-full bg-accent inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}