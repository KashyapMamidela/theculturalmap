import { create } from 'zustand';
import { ProductFilterType } from '../types';

interface UIState {
  selectedProductType: ProductFilterType;
  searchQuery: string;
  isLoading: boolean;
  setProductType: (type: ProductFilterType) => void;
  setSearchQuery: (query: string) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedProductType: 'all',
  searchQuery: '',
  isLoading: false,

  setProductType: (type: ProductFilterType) => set({ selectedProductType: type }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
}));
