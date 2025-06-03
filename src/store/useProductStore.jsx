import { create } from 'zustand';
import { fetchProducts } from '../services/products';

export const useProductStore = create((set) => ({
  products: [],
  cart: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await fetchProducts();
      set({ products });
    } catch (err) {
      set({ error: 'Error al cargar productos' });
    } finally {
      set({ isLoading: false });
    }
  },

  addToCart: (product) =>
    set((state) => ({ cart: [...state.cart, product] })),
}));
