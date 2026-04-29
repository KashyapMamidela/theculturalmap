import { User, Seller } from '../types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Arjun Sharma',
  phone: '+919876543210',
  email: 'arjun@example.com',
  avatar: null,
  role: 'buyer',
  location: 'Hyderabad, Telangana',
  createdAt: '2025-01-01',
};

export const MOCK_SELLER: Seller = {
  id: 's1',
  userId: 'u1',
  businessName: 'Arjun\'s Craft Studio',
  description: 'Bringing authentic handcrafted treasures from Telangana to your doorstep.',
  state: 'Telangana',
  city: 'Hyderabad',
  isVerified: false,
  verificationStatus: 'not_started',
  rating: 0,
  totalSales: 0,
  joinedAt: '2025-06-01',
};
