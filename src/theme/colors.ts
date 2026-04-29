/**
 * The Cultural Map — Color Palette
 * Theme: Earthy Cultural Minimalism
 */

export const Colors = {
  cream: '#F8F3EA',
  sand: '#EADDC8',
  terracotta: '#C66A3D',
  olive: '#6B7A3A',
  brown: '#4A3428',
  marigold: '#D99A2B',

  // Semantic aliases
  primary: '#C66A3D',
  secondary: '#6B7A3A',
  accent: '#D99A2B',
  background: '#F8F3EA',
  surface: '#EADDC8',
  text: '#4A3428',
  textSecondary: '#7A6A5E',
  textLight: '#9B8E84',
  border: '#E0D5C4',
  error: '#D94040',
  success: '#4A8C3F',
  warning: '#D99A2B',

  // Utility
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(74, 52, 40, 0.5)',
  shimmer: '#F0E8DA',
} as const;

export type ColorKey = keyof typeof Colors;
