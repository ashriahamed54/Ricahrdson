import keyboard from "@/assets/product-keyboard.jpg";
import headphones from "@/assets/product-headphones.jpg";
import mouse from "@/assets/product-mouse.jpg";
import monitor from "@/assets/product-monitor.jpg";

export type SampleProduct = {
  id: string;
  name: string;
  price: number;
  img: string;
  images?: string[];
  tag: string;
  specs: Record<string, string>;
  options?: { name: string; values: string[] }[];
};

export const sampleProducts: SampleProduct[] = [
  { id: "aero-14", name: "Aero 14 · M-Class", price: 1890, img: keyboard, images: [keyboard, monitor, mouse], tag: "Laptop", specs: { cpu: "M-Class · 10-core", ram: "16 GB", storage: "512 GB SSD", warranty: "12 mo" },
    options: [
      { name: "Storage", values: ["512 GB", "1 TB", "2 TB"] },
      { name: "Finish", values: ["Silver", "Space Gray", "Midnight"] },
    ] },
  { id: "halo", name: "Halo Over-Ear", price: 320, img: headphones, images: [headphones, mouse], tag: "Audio", specs: { driver: "40 mm", battery: "32 hr", weight: "248 g", warranty: "12 mo" },
    options: [{ name: "Color", values: ["Black", "Ivory", "Sand"] }] },
  { id: "pebble", name: "Pebble Wireless", price: 78, img: mouse, images: [mouse, keyboard], tag: "Peripherals", specs: { dpi: "8000", battery: "70 hr", weight: "62 g", warranty: "12 mo" } },
  { id: "slate-32", name: 'Slate Display 32"', price: 1240, img: monitor, images: [monitor, keyboard, headphones], tag: "Display", specs: { panel: "4K IPS", refresh: "144 Hz", ports: "USB-C 90W", warranty: "12 mo" },
    options: [{ name: "Warranty", values: ["12 months", "24 months", "36 months"] }] },
  { id: "aero-13", name: "Aero 13 · Featherlight", price: 1490, img: keyboard, images: [keyboard, monitor], tag: "Laptop", specs: { cpu: "M-Class · 8-core", ram: "8 GB", storage: "256 GB SSD", warranty: "12 mo" },
    options: [
      { name: "Storage", values: ["256 GB", "512 GB"] },
      { name: "Finish", values: ["Silver", "Space Gray"] },
    ] },
  { id: "halo-mini", name: "Halo Mini Buds", price: 180, img: headphones, images: [headphones], tag: "Audio", specs: { driver: "10 mm", battery: "28 hr", weight: "42 g", warranty: "12 mo" },
    options: [{ name: "Color", values: ["Black", "White"] }] },
  { id: "pebble-pro", name: "Pebble Pro Trackpad", price: 138, img: mouse, images: [mouse, keyboard], tag: "Peripherals", specs: { dpi: "—", battery: "60 hr", weight: "98 g", warranty: "12 mo" } },
  { id: "slate-27", name: 'Slate Display 27"', price: 890, img: monitor, images: [monitor, headphones], tag: "Display", specs: { panel: "QHD IPS", refresh: "120 Hz", ports: "USB-C 65W", warranty: "12 mo" } },
];