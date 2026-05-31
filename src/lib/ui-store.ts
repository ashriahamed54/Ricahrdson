import { useSyncExternalStore } from "react";
import type { SampleProduct } from "./sample-products";

export type CartLine = SampleProduct & { qty: number; selected?: Record<string, string> };

type State = {
  cart: CartLine[];
  wishlist: SampleProduct[];
  compare: SampleProduct[];
  cartOpen: boolean;
  searchOpen: boolean;
  quickView: SampleProduct | null;
};

let state: State = {
  cart: [],
  wishlist: [],
  compare: [],
  cartOpen: false,
  searchOpen: false,
  quickView: null,
};

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const set = (patch: Partial<State>) => {
  state = { ...state, ...patch };
  emit();
};

export const uiStore = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  get: () => state,
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
  openQuickView: (p: SampleProduct) => set({ quickView: p }),
  closeQuickView: () => set({ quickView: null }),
  addToCart: (p: SampleProduct, selected?: Record<string, string>) => {
    const existing = state.cart.find(
      (c) =>
        c.id === p.id &&
        JSON.stringify(c.selected ?? {}) === JSON.stringify(selected ?? {}),
    );
    const cart = existing
      ? state.cart.map((c) => (c === existing ? { ...c, qty: c.qty + 1 } : c))
      : [...state.cart, { ...p, qty: 1, selected }];
    set({ cart, cartOpen: true });
  },
  updateQty: (id: string, d: number) => {
    set({
      cart: state.cart
        .map((c) => (c.id === id ? { ...c, qty: c.qty + d } : c))
        .filter((c) => c.qty > 0),
    });
  },
  removeFromCart: (id: string) =>
    set({ cart: state.cart.filter((c) => c.id !== id) }),
  toggleWishlist: (p: SampleProduct) => {
    const has = state.wishlist.some((x) => x.id === p.id);
    set({
      wishlist: has
        ? state.wishlist.filter((x) => x.id !== p.id)
        : [...state.wishlist, p],
    });
  },
  toggleCompare: (p: SampleProduct) => {
    const has = state.compare.some((x) => x.id === p.id);
    set({
      compare: has
        ? state.compare.filter((x) => x.id !== p.id)
        : [...state.compare, p].slice(-4),
    });
  },
};

export function useUI<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(
    uiStore.subscribe,
    () => selector(state),
    () => selector(state),
  );
}