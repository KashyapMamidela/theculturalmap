import { create } from 'zustand';
import { Seller, VerificationStatus } from '../types';
import { MOCK_SELLER } from '../mocks/users';

interface SellerState {
  seller: Seller | null;
  verificationStep: number;
  setSeller: (seller: Seller) => void;
  updateVerificationStep: (step: number) => void;
  submitVerification: () => Promise<void>;
  updateStatus: (status: VerificationStatus) => void;
}

export const useSellerStore = create<SellerState>((set, get) => ({
  seller: MOCK_SELLER,
  verificationStep: 1,

  setSeller: (seller: Seller) => set({ seller }),

  updateVerificationStep: (step: number) => set({ verificationStep: step }),

  submitVerification: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const current = get().seller;
    if (current) {
      set({
        seller: { ...current, verificationStatus: 'pending' },
      });
    }
  },

  updateStatus: (status: VerificationStatus) => {
    const current = get().seller;
    if (current) {
      set({
        seller: {
          ...current,
          verificationStatus: status,
          isVerified: status === 'approved',
        },
      });
    }
  },
}));
