import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { Typography, FontFamily } from '../../src/theme/typography';
import { Spacing } from '../../src/theme/spacing';
import { Radii, Shadows } from '../../src/theme/shadows';
import { Chip } from '../../src/components/ui/Chip';
import { EmptyState } from '../../src/components/ui/EmptyState';
import { MOCK_ORDERS } from '../../src/mocks/orders';
import { formatINR } from '../../src/utils/currency';

const TRACK_STEPS = ['Packed', 'Shipped', 'Transit', 'Delivered'];

function OrderTracker({ currentStep }: { currentStep: number }) {
  return (
    <View style={styles.trackerWrap}>
      <View style={styles.trackerRow}>
        {TRACK_STEPS.map((step, i) => (
          <React.Fragment key={i}>
            <View style={[styles.trackerDot, i <= currentStep && styles.trackerDotActive]} />
            {i < TRACK_STEPS.length - 1 && (
              <View style={[styles.trackerLine, i < currentStep && styles.trackerLineActive]} />
            )}
          </React.Fragment>
        ))}
      </View>
      <View style={styles.trackerLabels}>
        {TRACK_STEPS.map((step, i) => (
          <Text key={i} style={[styles.trackerLabel, i <= currentStep && styles.trackerLabelActive]}>{step}</Text>
        ))}
      </View>
    </View>
  );
}

export default function OrdersScreen() {
  const insets = useSafeAreaInsets();
  const orders = MOCK_ORDERS;

  if (orders.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.screenTitle}>Orders</Text>
        <EmptyState title="No orders yet" description="Start shopping to see your orders here" icon="receipt-outline" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.screenTitle}>Orders</Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            {/* Tracker */}
            <OrderTracker currentStep={order.status === 'delivered' ? 3 : order.status === 'shipped' ? 1 : 0} />

            {/* Track button */}
            <TouchableOpacity style={styles.trackBtn} activeOpacity={0.7}>
              <Text style={styles.trackBtnText}>Track Order</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.brown} />
            </TouchableOpacity>

            {/* Order info */}
            <View style={styles.orderDivider} />
            <View style={styles.orderIdRow}>
              <Text style={styles.orderId}>#{order.id}</Text>
              <Text style={styles.orderDate}>{new Date(order.placedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</Text>
              <Chip label={order.status === 'delivered' ? 'Delivered' : order.status === 'shipped' ? 'Shipped' : 'Processing'} variant={order.status === 'delivered' ? 'verified' : 'handmade'} size="sm" />
            </View>

            {/* First item */}
            {order.items.length > 0 && (
              <View style={styles.itemRow}>
                <View style={styles.itemImageWrap}>
                  <Text style={styles.itemEmoji}>🎨</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle} numberOfLines={1}>{order.items[0].product.title}</Text>
                  <Text style={styles.itemSeller}>{order.items[0].product.sellerName}</Text>
                  <Text style={styles.itemPrice}>{formatINR(order.items[0].product.price)}</Text>
                </View>
              </View>
            )}

            <TouchableOpacity style={styles.trackOrderBtn} activeOpacity={0.7}>
              <Text style={styles.trackOrderBtnText}>Track Order</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.brown} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cream },
  screenTitle: { ...Typography.h1, color: Colors.brown, paddingHorizontal: Spacing.base, paddingVertical: Spacing.md },
  scrollContent: { paddingHorizontal: Spacing.base, paddingBottom: 100 },
  orderCard: { backgroundColor: Colors.white, borderRadius: Radii.lg, padding: Spacing.base, marginBottom: Spacing.base, ...Shadows.sm },
  trackerWrap: { marginBottom: Spacing.md },
  trackerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.sm },
  trackerDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: Colors.sand, borderWidth: 2, borderColor: Colors.border },
  trackerDotActive: { backgroundColor: Colors.terracotta, borderColor: Colors.terracotta },
  trackerLine: { flex: 1, height: 2, backgroundColor: Colors.border },
  trackerLineActive: { backgroundColor: Colors.terracotta },
  trackerLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  trackerLabel: { ...Typography.caption, color: Colors.textLight, fontSize: 10 },
  trackerLabelActive: { color: Colors.terracotta, fontFamily: FontFamily.semiBold },
  trackBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, height: 40, borderRadius: Radii.sm, borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.md },
  trackBtnText: { ...Typography.button, color: Colors.brown, fontSize: 13 },
  orderDivider: { height: 1, backgroundColor: Colors.border, marginBottom: Spacing.md },
  orderIdRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.md },
  orderId: { ...Typography.h3, color: Colors.brown, flex: 1 },
  orderDate: { ...Typography.caption, color: Colors.textLight },
  itemRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.md },
  itemImageWrap: { width: 64, height: 64, borderRadius: Radii.sm, backgroundColor: Colors.sand, alignItems: 'center', justifyContent: 'center' },
  itemEmoji: { fontSize: 28 },
  itemTitle: { ...Typography.h3, color: Colors.brown },
  itemSeller: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  itemPrice: { ...Typography.h3, color: Colors.brown, marginTop: 4 },
  trackOrderBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, height: 40, borderRadius: Radii.sm, backgroundColor: Colors.sand, marginTop: Spacing.sm },
  trackOrderBtnText: { ...Typography.button, color: Colors.brown, fontSize: 13 },
});
