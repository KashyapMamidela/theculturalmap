import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Radii, Shadows } from '../../theme/shadows';
import { Spacing } from '../../theme/spacing';
import { IndianState } from '../../types';

interface StateCardProps {
  state: IndianState;
  onPress: () => void;
}

export function StateCard({ state, onPress }: StateCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.container}>
      <View style={[styles.circle, { backgroundColor: state.color + '18' }]}>
        <Text style={styles.emoji}>{state.emoji}</Text>
      </View>
      <Text style={styles.name} numberOfLines={1}>{state.name}</Text>
      <Text style={styles.count}>{state.productCount} items</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', width: 80, marginRight: Spacing.md },
  circle: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm, ...Shadows.sm },
  emoji: { fontSize: 28 },
  name: { ...Typography.caption, color: Colors.brown, fontFamily: 'PlusJakartaSans_600SemiBold', textAlign: 'center' },
  count: { fontSize: 10, color: Colors.textLight, fontFamily: 'PlusJakartaSans_400Regular' },
});
