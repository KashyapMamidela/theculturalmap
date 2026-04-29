import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { Typography, FontFamily } from '../../src/theme/typography';
import { Spacing } from '../../src/theme/spacing';
import { Radii, Shadows } from '../../src/theme/shadows';
import { Button } from '../../src/components/ui/Button';
import { CartItemCard } from '../../src/components/cards/CartItemCard';
import { EmptyState } from '../../src/components/ui/EmptyState';
import { useCartStore } from '../../src/store/cart.store';
import { formatINR } from '../../src/utils/currency';

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalPrice = useCartStore((s) => s.getTotal());
  const [promoCode, setPromoCode] = useState('');

  if (items.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.screenTitle}>Cart</Text>
        <EmptyState title="Your cart is empty" description="Explore our collection and add items to your cart" icon="bag-outline" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.screenTitle}>Cart</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Cart items */}
        {items.map((item) => (
          <CartItemCard
            key={item.product.id}
            item={item}
            onRemove={() => removeItem(item.id)}
            onUpdateQuantity={(q) => updateQuantity(item.id, q)}
          />
        ))}

        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items)</Text>
            <Text style={styles.summaryValue}>{formatINR(totalPrice)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery</Text>
            <Text style={[styles.summaryValue, { color: Colors.olive, fontFamily: FontFamily.bold }]}>FREE</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatINR(totalPrice)}</Text>
          </View>

          <View style={styles.trustRow}>
            <Ionicons name="shield-checkmark-outline" size={14} color={Colors.textLight} />
            <Text style={styles.trustText}>Secure payment • Easy returns</Text>
          </View>
        </View>

        {/* Promo Code */}
        <View style={styles.promoRow}>
          <TextInput
            style={styles.promoInput}
            placeholder="Enter promo code"
            placeholderTextColor={Colors.textLight}
            value={promoCode}
            onChangeText={setPromoCode}
            autoCapitalize="characters"
          />
          <TouchableOpacity style={styles.applyBtn} activeOpacity={0.7}>
            <Text style={styles.applyBtnText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom checkout */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.85}>
          <Text style={styles.checkoutLabel}>Proceed to Checkout</Text>
          <View style={styles.checkoutPriceWrap}>
            <Text style={styles.checkoutPrice}>{formatINR(totalPrice)}</Text>
            <Ionicons name="arrow-forward" size={18} color={Colors.white} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cream },
  screenTitle: { ...Typography.h1, color: Colors.brown, paddingHorizontal: Spacing.base, paddingVertical: Spacing.md },
  scrollContent: { paddingHorizontal: Spacing.base, paddingBottom: 120 },
  summaryCard: { backgroundColor: Colors.white, borderRadius: Radii.lg, padding: Spacing.base, marginTop: Spacing.md, ...Shadows.sm },
  summaryTitle: { ...Typography.h2, color: Colors.brown, marginBottom: Spacing.md },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  summaryLabel: { ...Typography.body, color: Colors.textSecondary },
  summaryValue: { ...Typography.body, color: Colors.brown, fontFamily: FontFamily.semiBold },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: Spacing.sm },
  totalLabel: { ...Typography.h3, color: Colors.brown },
  totalValue: { ...Typography.h2, color: Colors.brown },
  trustRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: Spacing.md, justifyContent: 'center' },
  trustText: { ...Typography.caption, color: Colors.textLight },
  promoRow: { flexDirection: 'row', marginTop: Spacing.base, gap: Spacing.sm },
  promoInput: { flex: 1, height: 48, backgroundColor: Colors.white, borderRadius: Radii.md, paddingHorizontal: Spacing.md, ...Typography.body, color: Colors.brown, borderWidth: 1, borderColor: Colors.border },
  applyBtn: { height: 48, paddingHorizontal: Spacing.lg, justifyContent: 'center', alignItems: 'center', borderRadius: Radii.md, borderWidth: 1.5, borderColor: Colors.brown },
  applyBtnText: { ...Typography.button, color: Colors.brown },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: Spacing.base, paddingTop: Spacing.md, backgroundColor: Colors.cream },
  checkoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.terracotta, height: 56, borderRadius: Radii.md, paddingHorizontal: Spacing.lg },
  checkoutLabel: { ...Typography.button, color: Colors.white, fontSize: 16 },
  checkoutPriceWrap: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  checkoutPrice: { ...Typography.button, color: Colors.white, fontSize: 16 },
});
