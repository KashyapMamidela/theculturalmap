import { Order } from '../types';
import { MOCK_PRODUCTS } from './products';

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-001',
    items: [
      { id: 'oi1', product: MOCK_PRODUCTS[0], quantity: 1 },
      { id: 'oi2', product: MOCK_PRODUCTS[4], quantity: 1 },
    ],
    status: 'shipped',
    subtotal: 10398,
    deliveryFee: 0,
    total: 10398,
    placedAt: '2025-12-20',
    deliveryAddress: '12-3-456, Banjara Hills, Hyderabad',
    trackingId: 'TCM20251220001',
  },
  {
    id: 'ord-002',
    items: [
      { id: 'oi3', product: MOCK_PRODUCTS[8], quantity: 2 },
    ],
    status: 'delivered',
    subtotal: 1798,
    deliveryFee: 49,
    total: 1847,
    placedAt: '2025-11-10',
    deliveryAddress: '12-3-456, Banjara Hills, Hyderabad',
    trackingId: 'TCM20251110002',
  },
  {
    id: 'ord-003',
    items: [
      { id: 'oi4', product: MOCK_PRODUCTS[2], quantity: 1 },
    ],
    status: 'placed',
    subtotal: 3499,
    deliveryFee: 49,
    total: 3548,
    placedAt: '2025-12-28',
    deliveryAddress: '12-3-456, Banjara Hills, Hyderabad',
    trackingId: null,
  },
];
