import { create } from 'zustand';
import { Product, Seller } from '../types';
import { MOCK_DATABASE_PRODUCTS, MOCK_SELLERS } from '../mocks/database.mock';

interface ProductState {
  products: Product[];
  sellers: Seller[];
  getProductById: (id: string) => Product | undefined;
  getSellerById: (id: string) => Seller | undefined;
  getProductsBySellerId: (sellerId: string) => Product[];
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: MOCK_DATABASE_PRODUCTS,
  sellers: MOCK_SELLERS,
  
  getProductById: (id: string) => {
    return get().products.find(p => p.id === id);
  },
  
  getSellerById: (id: string) => {
    return get().sellers.find(s => s.id === id);
  },
  
  getProductsBySellerId: (sellerId: string) => {
    return get().products.filter(p => p.sellerId === sellerId);
  }
}));
