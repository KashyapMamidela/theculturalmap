import { CartItem } from '../types';
import { MOCK_DATABASE_PRODUCTS } from './database.mock';

export const MOCK_CART_ITEMS: CartItem[] = [
  { id: 'c1', product: MOCK_DATABASE_PRODUCTS[0], quantity: 1 },
  { id: 'c2', product: MOCK_DATABASE_PRODUCTS[1], quantity: 2 },
  { id: 'c3', product: MOCK_DATABASE_PRODUCTS[8], quantity: 1 },
];
