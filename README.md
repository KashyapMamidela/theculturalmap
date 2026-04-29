# The Cultural Map 🏺

**Discover India's Cultural Treasures** — A React Native Expo app for buying and selling authentic handcrafted products from artisans across every Indian state.

## Tech Stack

- **Framework**: Expo SDK 54 + React Native 0.81
- **Language**: TypeScript (strict mode)
- **Navigation**: expo-router v6 (file-based)
- **Styling**: NativeWind v4 + StyleSheet (design tokens)
- **State**: Zustand v5
- **Fonts**: Poppins (Google Fonts)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on Android
npx expo start --android

# Run on iOS
npx expo start --ios
```

## Folder Structure

```
theculturalmap/
├── app/                          # File-based routing (expo-router)
│   ├── _layout.tsx               # Root layout (fonts, SafeArea, Stack)
│   ├── index.tsx                 # Splash → auto-redirect
│   ├── product/
│   │   └── [id].tsx              # Product detail screen
│   ├── (auth)/                   # Auth group
│   │   ├── _layout.tsx
│   │   ├── welcome.tsx
│   │   ├── sign-in.tsx
│   │   ├── otp.tsx
│   │   ├── sign-up.tsx
│   │   ├── role-selection.tsx
│   │   ├── seller-intro.tsx
│   │   ├── seller-verification.tsx
│   │   ├── status-pending.tsx
│   │   ├── status-approved.tsx
│   │   └── status-rejected.tsx
│   └── (tabs)/                   # Main app (bottom tabs)
│       ├── _layout.tsx           # Tab navigator
│       ├── index.tsx             # Home
│       ├── explore.tsx           # Explore/Search
│       ├── cart.tsx              # Shopping cart
│       ├── orders.tsx            # Order history
│       ├── profile.tsx           # User profile
│       └── listings.tsx          # Seller listings
├── src/
│   ├── components/
│   │   ├── ui/                   # Atomic UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Chip.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── TopBar.tsx
│   │   │   ├── QuantityStepper.tsx
│   │   │   ├── SkeletonLoader.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   └── index.ts         # Barrel export
│   │   ├── cards/                # Card components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── CartItemCard.tsx
│   │   │   ├── StateCard.tsx
│   │   │   └── index.ts
│   │   └── sections/             # Composite sections
│   │       ├── FeaturedBanner.tsx
│   │       └── index.ts
│   ├── theme/                    # Design tokens
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── shadows.ts
│   │   └── index.ts
│   ├── types/                    # TypeScript interfaces
│   │   └── index.ts
│   ├── utils/                    # Utilities
│   │   ├── currency.ts
│   │   └── constants.ts
│   ├── store/                    # Zustand stores
│   │   ├── auth.store.ts
│   │   ├── cart.store.ts
│   │   ├── seller.store.ts
│   │   └── ui.store.ts
│   ├── services/                 # API layer (Supabase-ready)
│   │   └── index.ts
│   ├── mocks/                    # Mock data
│   │   ├── products.ts
│   │   ├── users.ts
│   │   ├── cart.ts
│   │   ├── states.ts
│   │   └── orders.ts
│   └── assets/
│       ├── images/               # Product/hero images
│       └── icons/                # Custom icon assets
├── assets/                       # Expo default assets
├── global.css                    # NativeWind global styles
├── tailwind.config.js            # Tailwind + design tokens
├── metro.config.js               # Metro + NativeWind
├── app.json                      # Expo config
├── tsconfig.json                 # TypeScript config
└── package.json
```

## Design System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Cream | `#F8F3EA` | Background |
| Sand | `#EADDC8` | Surface/Cards |
| Terracotta | `#C66A3D` | Primary/CTA |
| Olive | `#6B7A3A` | Secondary |
| Brown | `#4A3428` | Text |
| Marigold | `#D99A2B` | Accent/Ratings |

### Typography
All text uses **Poppins**:
- H1: 20px / Bold
- H2: 16px / Bold
- H3: 14px / SemiBold
- Body: 14px / Regular
- Caption: 12px / Regular
- Button: 14px / SemiBold

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo dev server |
| `npm run android` | Start on Android |
| `npm run ios` | Start on iOS |
| `npm run web` | Start on web |
| `npm run lint` | Run ESLint |

## Replacing Mock Data with Supabase

Currently all data comes from `src/mocks/`. To switch to Supabase:

### 1. Install Supabase
```bash
npm install @supabase/supabase-js
```

### 2. Create client
```ts
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);
```

### 3. Replace store methods
In each Zustand store, replace mock data with Supabase queries:

```ts
// auth.store.ts
signIn: async (phone: string) => {
  const { error } = await supabase.auth.signInWithOtp({ phone });
  // handle result
};

// cart.store.ts — use Supabase for persistence
addItem: async (product) => {
  await supabase.from('cart_items').insert({ product_id: product.id, user_id: userId });
  // refresh local state
};
```

### 4. Database tables needed
- `users` (id, name, phone, email, role, location)
- `sellers` (id, user_id, business_name, verification_status, ...)
- `products` (id, title, price, seller_id, product_type, ...)
- `cart_items` (id, user_id, product_id, quantity)
- `orders` (id, user_id, status, total, ...)
- `order_items` (id, order_id, product_id, quantity)

### 5. Auth flow
Replace the mock auth flow in `auth.store.ts` with Supabase Auth (phone OTP):
- `supabase.auth.signInWithOtp({ phone })`
- `supabase.auth.verifyOtp({ phone, token })`

## Handoff Notes

- **Android-first**: All layouts tested against 390×844 viewport
- **Mock data only**: No backend calls — pure frontend shell
- **No images**: Product images use emoji placeholders; swap with `expo-image` + Supabase Storage URLs
- **Cart badge**: Shows live count in tab bar
- **Safe areas**: All screens respect Android status bar + navigation bar
- **Seller flow**: Complete onboarding flow from role selection → verification → status screens
