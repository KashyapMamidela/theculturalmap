import { create } from 'zustand';
import { User } from '../types';
import { MOCK_USER } from '../mocks/users';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  phone: string;
  signIn: (phone: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<boolean>;
  signUp: (name: string, phone: string, email: string) => Promise<void>;
  signOut: () => void;
  setPhone: (phone: string) => void;
  setRole: (role: 'buyer' | 'seller' | 'both') => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  phone: '',

  setPhone: (phone: string) => set({ phone }),

  signIn: async (phone: string) => {
    set({ isLoading: true, phone });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({ isLoading: false });
  },

  verifyOtp: async (_otp: string) => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({
      user: MOCK_USER,
      isAuthenticated: true,
      isLoading: false,
    });
    return true;
  },

  signUp: async (name: string, phone: string, email: string) => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({
      user: { ...MOCK_USER, name, phone, email },
      isAuthenticated: true,
      isLoading: false,
    });
  },

  signOut: () => {
    set({ user: null, isAuthenticated: false, phone: '' });
  },

  setRole: (role: 'buyer' | 'seller' | 'both') => {
    set((state) => ({
      user: state.user ? { ...state.user, role } : null,
    }));
  },
}));
