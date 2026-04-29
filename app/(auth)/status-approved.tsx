import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { Typography, FontFamily } from '../../src/theme/typography';
import { Spacing } from '../../src/theme/spacing';
import { Radii, Shadows } from '../../src/theme/shadows';

const ACTIONS = [
  { icon: 'pricetag-outline' as const, iconColor: Colors.terracotta, label: 'List your first product', cta: 'Add Product →' },
  { icon: 'color-palette-outline' as const, iconColor: Colors.olive, label: 'Customize your shop profile', cta: 'Edit Shop →' },
  { icon: 'bar-chart-outline' as const, iconColor: Colors.marigold, label: 'View your seller dashboard', cta: 'Dashboard →' },
];

export default function StatusApprovedScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
      {/* Success icon */}
      <View style={styles.iconCircle}>
        <Ionicons name="checkmark-circle" size={56} color={Colors.olive} />
      </View>

      <Text style={styles.heading}>Congratulations! 🎉</Text>
      <Text style={styles.subheading}>
        Your seller account has been verified. You can now list your authentic crafts and reach buyers across India!
      </Text>

      {/* Verified badge */}
      <Text style={styles.sectionLabel}>YOU'RE NOW A VERIFIED SELLER</Text>

      {/* Action cards */}
      {ACTIONS.map((action, i) => (
        <TouchableOpacity key={i} style={styles.actionCard} activeOpacity={0.7}>
          <View style={[styles.actionIconWrap, { backgroundColor: action.iconColor + '14' }]}>
            <Ionicons name={action.icon} size={20} color={action.iconColor} />
          </View>
          <Text style={styles.actionLabel}>{action.label}</Text>
          <Text style={styles.actionCta}>{action.cta}</Text>
        </TouchableOpacity>
      ))}

      {/* Help card */}
      <View style={styles.helpCard}>
        <Ionicons name="help-circle-outline" size={22} color={Colors.textLight} />
        <View style={{ flex: 1 }}>
          <Text style={styles.helpTitle}>Need help?</Text>
          <Text style={styles.helpDesc}>Contact seller support</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.chatLink}>Chat →</Text>
        </TouchableOpacity>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.primaryBtn} onPress={() => router.replace('/(tabs)/listings')} activeOpacity={0.85}>
        <Ionicons name="storefront-outline" size={18} color={Colors.white} />
        <Text style={styles.primaryBtnText}>Go to Seller Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.replace('/(tabs)')} activeOpacity={0.7}>
        <Ionicons name="home-outline" size={18} color={Colors.brown} />
        <Text style={styles.secondaryBtnText}>Go to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cream },
  content: { paddingHorizontal: Spacing.lg, alignItems: 'center' },
  iconCircle: { marginBottom: Spacing.base },
  heading: { ...Typography.h1, color: Colors.brown, fontSize: 22, textAlign: 'center' },
  subheading: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22, marginTop: Spacing.sm, marginBottom: Spacing.lg },
  sectionLabel: { ...Typography.caption, fontFamily: FontFamily.semiBold, color: Colors.textLight, letterSpacing: 1, alignSelf: 'flex-start', marginBottom: Spacing.md },
  actionCard: { flexDirection: 'row', alignItems: 'center', width: '100%', backgroundColor: Colors.white, borderRadius: Radii.lg, padding: Spacing.base, marginBottom: Spacing.md, ...Shadows.sm },
  actionIconWrap: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  actionLabel: { ...Typography.body, color: Colors.brown, flex: 1 },
  actionCta: { ...Typography.button, color: Colors.terracotta, fontSize: 13 },
  helpCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, width: '100%', backgroundColor: Colors.white, padding: Spacing.base, borderRadius: Radii.lg, marginBottom: Spacing.xl, marginTop: Spacing.sm, ...Shadows.sm },
  helpTitle: { ...Typography.h3, color: Colors.brown },
  helpDesc: { ...Typography.caption, color: Colors.textSecondary },
  chatLink: { ...Typography.button, color: Colors.terracotta },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, width: '100%', height: 56, backgroundColor: Colors.olive, borderRadius: Radii.md, marginBottom: Spacing.md },
  primaryBtnText: { ...Typography.button, color: Colors.white, fontSize: 16 },
  secondaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, width: '100%', height: 52, borderRadius: Radii.md, borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.cream },
  secondaryBtnText: { ...Typography.button, color: Colors.brown },
});
