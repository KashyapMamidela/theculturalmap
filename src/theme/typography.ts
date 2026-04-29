/**
 * The Cultural Map — Typography Scale
 * Font: Plus Jakarta Sans (per Figma spec)
 */

import { TextStyle } from 'react-native';

export const FontFamily = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semiBold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
} as const;

export const Typography = {
  h1: {
    fontFamily: FontFamily.bold,
    fontSize: 20,
    lineHeight: 28,
  } as TextStyle,

  h2: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 22,
  } as TextStyle,

  h3: {
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
    lineHeight: 20,
  } as TextStyle,

  body: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
  } as TextStyle,

  caption: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
  } as TextStyle,

  button: {
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
    lineHeight: 20,
  } as TextStyle,
} as const;
