import { CartItem } from '../types';
import { MOCK_PRODUCTS } from './products';

export const MOCK_CART_ITEMS: CartItem[] = [
  { id: 'c1', product: MOCK_PRODUCTS[0], quantity: 1 },
  { id: 'c2', product: MOCK_PRODUCTS[1], quantity: 2 },
  { id: 'c3', product: MOCK_PRODUCTS[8], quantity: 1 },
];
