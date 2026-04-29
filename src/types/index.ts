/**
 * The Cultural Map — TypeScript Interfaces
 */

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string | null;
  role: 'buyer' | 'seller' | 'both';
  location: string;
  createdAt: string;
}

export interface Seller {
  id: string;
  userId: string;
  businessName: string;
  description: string;
  state: string;
  city: string;
  isVerified: boolean;
  verificationStatus: VerificationStatus;
  rating: number;
  totalSales: number;
  joinedAt: string;
}

export type VerificationStatus = 'not_started' | 'pending' | 'approved' | 'rejected';

export interface VerificationStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export type ProductType = 'handmade' | 'readymade';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number | null;
  images: string[];
  category: string;
  productType: ProductType;
  sellerId: string;
  sellerName: string;
  sellerVerified: boolean;
  state: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  specifications: Record<string, string>;
  createdAt: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export type OrderStatus = 'placed' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  items: CartItem[];
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  total: number;
  placedAt: string;
  deliveryAddress: string;
  trackingId: string | null;
}

export interface IndianState {
  id: string;
  name: string;
  shortName: string;
  productCount: number;
  color: string;
  emoji: string;
}

export type ChipVariant = 'handmade' | 'readymade' | 'verified' | 'pending' | 'approved' | 'rejected';
export type ProductFilterType = 'all' | 'handmade' | 'readymade';
