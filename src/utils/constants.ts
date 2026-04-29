/**
 * The Cultural Map — Constants
 */

export const ROUTES = {
  SPLASH: '/',
  WELCOME: '/(auth)/welcome',
  SIGN_IN: '/(auth)/sign-in',
  OTP: '/(auth)/otp',
  SIGN_UP: '/(auth)/sign-up',
  ROLE_SELECTION: '/(auth)/role-selection',
  SELLER_INTRO: '/(auth)/seller-intro',
  SELLER_VERIFICATION: '/(auth)/seller-verification',
  STATUS_PENDING: '/(auth)/status-pending',
  STATUS_APPROVED: '/(auth)/status-approved',
  STATUS_REJECTED: '/(auth)/status-rejected',
  HOME: '/(tabs)',
  EXPLORE: '/(tabs)/explore',
  CART: '/(tabs)/cart',
  ORDERS: '/(tabs)/orders',
  PROFILE: '/(tabs)/profile',
  LISTINGS: '/(tabs)/listings',
  PRODUCT_DETAIL: '/product',
} as const;

export const TAB_KEYS = ['home', 'explore', 'cart', 'orders', 'profile'] as const;
export type TabKey = (typeof TAB_KEYS)[number];

export const PRODUCT_FILTER_CHIPS = [
  { key: 'all', label: 'All Products' },
  { key: 'handmade', label: '🤲 Handmade' },
  { key: 'readymade', label: '📦 Readymade' },
] as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  placed: 'Order Placed',
  confirmed: 'Confirmed',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export const VERIFICATION_STEPS = [
  { id: 1, title: 'Business Info', description: 'Tell us about your business' },
  { id: 2, title: 'Documents', description: 'Upload required documents' },
  { id: 3, title: 'Bank Details', description: 'Add your bank account' },
  { id: 4, title: 'Review', description: 'Review and submit' },
] as const;

export const DELIVERY_FEE = 49;
export const FREE_DELIVERY_THRESHOLD = 499;
