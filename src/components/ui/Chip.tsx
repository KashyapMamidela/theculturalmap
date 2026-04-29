import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Radii } from '../../theme/shadows';
import { Spacing } from '../../theme/spacing';
import { ChipVariant } from '../../types';

interface ChipProps {
  label: string;
  variant?: ChipVariant;
  selected?: boolean;
  onPress?: () => void;
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

const CHIP_COLORS: Record<ChipVariant, { bg: string; text: string; border: string }> = {
  handmade: { bg: '#FFF3E0', text: Colors.terracotta, border: Colors.terracotta },
  readymade: { bg: '#E8F5E9', text: Colors.olive, border: Colors.olive },
  verified: { bg: '#E8F5E9', text: Colors.success, border: Colors.success },
  pending: { bg: '#FFF8E1', text: Colors.marigold, border: Colors.marigold },
  approved: { bg: '#E8F5E9', text: Colors.success, border: Colors.success },
  rejected: { bg: '#FFEBEE', text: Colors.error, border: Colors.error },
};

const CHIP_ICONS: Record<ChipVariant, string> = {
  handmade: '✋',
  readymade: '📦',
  verified: '✓',
  pending: '⏳',
  approved: '✓',
  rejected: '✗',
};

export function Chip({
  label,
  variant = 'handmade',
  selected = false,
  onPress,
  size = 'md',
  style,
}: ChipProps) {
  const colorConfig = CHIP_COLORS[variant];
  const icon = CHIP_ICONS[variant];
  const isSmall = size === 'sm';

  const content = (
    <View
      style={[
        styles.container,
        {
          backgroundColor: selected ? colorConfig.border : colorConfig.bg,
          borderColor: colorConfig.border,
          paddingVertical: isSmall ? 2 : Spacing.xs,
          paddingHorizontal: isSmall ? Spacing.sm : Spacing.md,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.icon,
          { fontSize: isSmall ? 10 : 12 },
        ]}
      >
        {icon}
      </Text>
      <Text
        style={[
          isSmall ? styles.labelSmall : styles.label,
          { color: selected ? Colors.white : colorConfig.text },
        ]}
      >
        {label}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radii.full,
    borderWidth: 1,
    gap: 4,
  },
  icon: {
    fontSize: 12,
  },
  label: {
    ...Typography.caption,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  labelSmall: {
    fontSize: 10,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
});
