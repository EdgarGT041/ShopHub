import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const calculateSummary = (items: CartItem[]) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { total, itemCount };
};

const toCartItem = (product: Product): CartItem => ({
  _id: product._id,
  name: product.name,
  price: product.price,
  image: product.images[0] ?? 'https://placehold.co/400x400/png?text=Product',
  quantity: 1,
  stock: product.stock,
});

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      total: 0,
      itemCount: 0,
      addItem: (product) => {
        set((state) => {
          if (product.stock <= 0) {
            return state;
          }

          const existingItem = state.items.find((item) => item._id === product._id);

          let nextItems: CartItem[];

          if (existingItem) {
            nextItems = state.items.map((item) => {
              if (item._id !== product._id) {
                return item;
              }

              const nextQuantity = Math.min(item.quantity + 1, item.stock);
              return { ...item, quantity: nextQuantity };
            });
          } else {
            nextItems = [...state.items, toCartItem(product)];
          }

          return {
            ...state,
            items: nextItems,
            ...calculateSummary(nextItems),
          };
        });
      },
      removeItem: (id) => {
        set((state) => {
          const nextItems = state.items.filter((item) => item._id !== id);

          return {
            ...state,
            items: nextItems,
            ...calculateSummary(nextItems),
          };
        });
      },
      updateQuantity: (id, quantity) => {
        set((state) => {
          const target = state.items.find((item) => item._id === id);

          if (!target) {
            return state;
          }

          let nextItems: CartItem[];

          if (quantity <= 0 || target.stock <= 0) {
            nextItems = state.items.filter((item) => item._id !== id);
          } else {
            const safeQuantity = Math.min(Math.max(quantity, 1), target.stock);

            nextItems = state.items.map((item) => {
              if (item._id !== id) {
                return item;
              }

              return { ...item, quantity: safeQuantity };
            });
          }

          return {
            ...state,
            items: nextItems,
            ...calculateSummary(nextItems),
          };
        });
      },
      clearCart: () => {
        set((state) => ({
          ...state,
          items: [],
          total: 0,
          itemCount: 0,
        }));
      },
    }),
    {
      name: 'shophub-cart',
      partialize: (state) => ({
        items: state.items,
        total: state.total,
        itemCount: state.itemCount,
      }),
    }
  )
);
