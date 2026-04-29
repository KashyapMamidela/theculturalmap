import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { Typography, FontFamily } from '../../src/theme/typography';
import { Spacing } from '../../src/theme/spacing';
import { Radii, Shadows } from '../../src/theme/shadows';
import { useAuthStore } from '../../src/store/auth.store';

const BUYER_PERKS = [
  'Browse 10,000+ handcrafted products',
  'Connect directly with verified artisans',
  'Track orders and shipping',
  'Save favourites & share wishlists',
];

const SELLER_PERKS = [
  '₹0 listing fee for first 3 months',
  'Reach buyers across all states',
];

export default function RoleSelectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);
  const setRole = useAuthStore((s) => s.setRole);

  const handleBuyer = () => {
    setRole('buyer');
    router.replace('/(tabs)');
  };

  const handleSeller = () => {
    setRole('seller');
    router.push('/(auth)/seller-intro');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
      {/* Success icon */}
      <View style={styles.successCircle}>
        <Ionicons name="checkmark-circle" size={56} color={Colors.olive} />
      </View>

      <Text style={styles.heading}>You're all set, {user?.name || 'there'}! 🎉</Text>
      <Text style={styles.subheading}>Your account has been created successfully</Text>

      {/* YOUR CURRENT ROLE */}
      <Text style={styles.sectionLabel}>YOUR CURRENT ROLE</Text>

      {/* Buyer Card */}
      <TouchableOpacity style={styles.buyerCard} onPress={handleBuyer} activeOpacity={0.85}>
        <View style={styles.cardHeader}>
          <View style={styles.cardIconWrap}>
            <Ionicons name="bag-handle-outline" size={22} color={Colors.terracotta} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.buyerTitleRow}>
              <Text style={styles.cardTitle}>Buyer</Text>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>ACTIVE</Text>
              </View>
            </View>
            <Text style={styles.cardDesc}>Discover & shop authentic crafts from artisans across India</Text>
          </View>
        </View>

        <Text style={styles.perksLabel}>What you can do as a Buyer:</Text>
        {BUYER_PERKS.map((perk, i) => (
          <View key={i} style={styles.perkRow}>
            <Ionicons name="checkmark-circle" size={16} color={Colors.olive} />
            <Text style={styles.perkText}>{perk}</Text>
          </View>
        ))}
      </TouchableOpacity>

      {/* Seller Card */}
      <TouchableOpacity style={styles.sellerCard} onPress={handleSeller} activeOpacity={0.85}>
        <View style={styles.cardHeader}>
          <View style={[styles.cardIconWrap, { backgroundColor: Colors.marigold + '18' }]}>
            <Ionicons name="sparkles" size={22} color={Colors.marigold} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Are you a seller?</Text>
            <Text style={styles.cardDesc}>Switch to reach thousands of buyers who love authentic crafts</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
        </View>

        {SELLER_PERKS.map((perk, i) => (
          <View key={i} style={styles.perkRow}>
            <View style={styles.marigoldDot} />
            <Text style={styles.perkText}>{perk}</Text>
          </View>
        ))}
      </TouchableOpacity>

      {/* Continue as Buyer */}
      <TouchableOpacity style={styles.continueBtn} onPress={handleBuyer} activeOpacity={0.85}>
        <Ionicons name="bag-handle-outline" size={18} color={Colors.white} />
        <Text style={styles.continueBtnText}>Continue as Buyer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cream },
  content: { paddingHorizontal: Spacing.lg, alignItems: 'center' },
  successCircle: { marginBottom: Spacing.base },
  heading: { ...Typography.h1, color: Colors.brown, fontSize: 22, textAlign: 'center' },
  subheading: { ...Typography.body, color: Colors.textSecondary, marginTop: Spacing.sm, marginBottom: Spacing.xl, textAlign: 'center' },
  sectionLabel: { ...Typography.caption, color: Colors.textLight, fontFamily: FontFamily.semiBold, letterSpacing: 1, alignSelf: 'flex-start', marginBottom: Spacing.md },
  buyerCard: { width: '100%', borderWidth: 2, borderColor: Colors.terracotta, borderRadius: Radii.lg, backgroundColor: Colors.white, padding: Spacing.base, marginBottom: Spacing.base, ...Shadows.sm },
  sellerCard: { width: '100%', borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radii.lg, backgroundColor: Colors.white, padding: Spacing.base, marginBottom: Spacing.xl, ...Shadows.sm },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md, marginBottom: Spacing.md },
  cardIconWrap: { width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.terracotta + '14', alignItems: 'center', justifyContent: 'center' },
  buyerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  cardTitle: { ...Typography.h2, color: Colors.brown },
  activeBadge: { backgroundColor: Colors.olive, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  activeBadgeText: { fontSize: 10, fontFamily: FontFamily.bold, color: Colors.white, letterSpacing: 0.5 },
  cardDesc: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2, lineHeight: 18 },
  perksLabel: { ...Typography.caption, color: Colors.brown, fontFamily: FontFamily.medium, marginBottom: Spacing.sm },
  perkRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: 6 },
  perkText: { ...Typography.body, color: Colors.textSecondary, fontSize: 13, flex: 1 },
  marigoldDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.marigold },
  continueBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, width: '100%', height: 56, backgroundColor: Colors.terracotta, borderRadius: Radii.md },
  continueBtnText: { ...Typography.button, color: Colors.white, fontSize: 16 },
});
