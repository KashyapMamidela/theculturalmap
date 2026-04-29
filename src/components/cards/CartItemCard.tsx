import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Radii, Shadows } from '../../theme/shadows';
import { Spacing } from '../../theme/spacing';
import { CartItem } from '../../types';
import { formatINR } from '../../utils/currency';
import { QuantityStepper } from '../ui/QuantityStepper';
import { Chip } from '../ui/Chip';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  const { product, quantity } = item;

  return (
    <View style={styles.container}>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.emoji}>🎨</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
          <TouchableOpacity onPress={onRemove} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="close" size={18} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
        <View style={styles.sellerRow}>
          <Text style={styles.seller}>{product.sellerName}</Text>
          {product.sellerVerified && <Chip label="Verified" variant="verified" size="sm" />}
        </View>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>{formatINR(product.price * quantity)}</Text>
          <QuantityStepper quantity={quantity} onIncrement={() => onUpdateQuantity(quantity + 1)} onDecrement={() => onUpdateQuantity(quantity - 1)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', backgroundColor: Colors.white, borderRadius: Radii.lg, ...Shadows.sm, marginBottom: Spacing.md, overflow: 'hidden' },
  imagePlaceholder: { width: 100, height: 120, backgroundColor: Colors.sand, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 28 },
  content: { flex: 1, padding: Spacing.md, justifyContent: 'space-between' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  title: { ...Typography.h3, color: Colors.brown, flex: 1 },
  sellerRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  seller: { ...Typography.caption, color: Colors.textSecondary },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Spacing.xs },
  price: { ...Typography.h3, color: Colors.terracotta },
});
