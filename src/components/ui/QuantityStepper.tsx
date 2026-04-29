import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Radii } from '../../theme/shadows';
import { Spacing } from '../../theme/spacing';

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}

export function QuantityStepper({ quantity, onIncrement, onDecrement, min = 1, max = 10 }: QuantityStepperProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onDecrement}
        disabled={quantity <= min}
        style={[styles.btn, quantity <= min && styles.btnDisabled]}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="remove" size={16} color={quantity <= min ? Colors.textLight : Colors.brown} />
      </TouchableOpacity>
      <Text style={styles.count}>{quantity}</Text>
      <TouchableOpacity
        onPress={onIncrement}
        disabled={quantity >= max}
        style={[styles.btn, quantity >= max && styles.btnDisabled]}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="add" size={16} color={quantity >= max ? Colors.textLight : Colors.brown} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.cream, borderRadius: Radii.sm, borderWidth: 1, borderColor: Colors.border },
  btn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  btnDisabled: { opacity: 0.4 },
  count: { ...Typography.h3, color: Colors.brown, minWidth: 28, textAlign: 'center', paddingHorizontal: Spacing.xs },
});
