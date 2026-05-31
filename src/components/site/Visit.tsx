import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const hours: [string, string][] = [
  ["Monday", "9:00 AM – 7:00 PM"],
  ["Tuesday", "10:00 AM – 7:00 PM"],
  ["Wednesday", "9:00 AM – 7:00 PM"],
  ["Thursday", "9:00 AM – 7:00 PM"],
  ["Friday", "9:00 AM – 1:30 PM · 3:00 – 7:00 PM"],
  ["Saturday", "10:00 AM – 6:00 PM"],
  ["Sunday", "12:00 PM – 6:00 PM"],
];

const staff = [
  { name: "Naveed", note: "Mac hardware diagnostics & custom builds" },
  { name: "AJ", note: "Phone-friendly walkthroughs for every repair" },
  { name: "Pabu", note: "Step-by-step support for non-technical users" },
];

export function Visit() {
  return (
    <section id="visit" className="px-6 md:px-10 py-24 md:py-40 border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-14">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-muted-foreground">— Visit the shop</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="display text-4xl md:text-6xl leading-[1.02]">
              Right off the <em className="italic text-accent">Central Expy.</em>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="col-span-12 md:col-span-5 bg-secondary/60 rounded-sm p-8 noise relative"
          >
            <p className="eyebrow text-muted-foreground mb-6">Richardson Computers</p>
            <ul className="space-y-5 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <span>346 S Central Expy Ste A<br />Richardson, TX 75080</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <a href="tel:+19726718050" className="hover:underline">(972) 671-8050</a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <div>
                  <a href="mailto:info@richardsoncomputers.com" className="block hover:underline">info@richardsoncomputers.com</a>
                  <a href="mailto:laptop.cellphonerepair@gmail.com" className="block text-muted-foreground hover:underline">laptop.cellphonerepair@gmail.com</a>
                </div>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="eyebrow text-muted-foreground mb-3">Payments accepted</p>
              <p className="text-sm leading-relaxed">
                Visa · Mastercard · Amex · Discover · Debit · Apple Pay · Google Wallet.
                <span className="block text-muted-foreground mt-1">No cryptocurrency.</span>
              </p>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            className="col-span-12 md:col-span-7"
          >
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-4 h-4" />
              <p className="eyebrow">Weekly hours</p>
            </div>
            <ul className="divide-y divide-border">
              {hours.map(([d, h]) => (
                <li key={d} className="flex justify-between items-baseline py-4 gap-6">
                  <span className="display text-2xl md:text-3xl">{d}</span>
                  <span className="text-sm text-muted-foreground text-right">{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <p className="eyebrow text-muted-foreground mb-4">— Ask for</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {staff.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="border border-border rounded-sm p-5"
                  >
                    <p className="display text-2xl">{s.name}</p>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{s.note}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}