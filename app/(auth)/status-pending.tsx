import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { Typography, FontFamily } from '../../src/theme/typography';
import { Spacing } from '../../src/theme/spacing';
import { Radii, Shadows } from '../../src/theme/shadows';

const DOCUMENTS = [
  { icon: 'storefront-outline' as const, label: 'Shop Details' },
  { icon: 'card-outline' as const, label: 'ID Proof (Aadhaar)' },
  { icon: 'location-outline' as const, label: 'Address Proof' },
  { icon: 'hand-left-outline' as const, label: 'Category: Handmade' },
  { icon: 'wallet-outline' as const, label: 'Bank Details' },
];

export default function StatusPendingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
      {/* Illustration */}
      <View style={styles.iconCircle}>
        <Ionicons name="time-outline" size={48} color={Colors.marigold} />
      </View>

      <Text style={styles.heading}>Verification in Progress</Text>
      <Text style={styles.subheading}>
        We're reviewing your seller application. You'll be notified once the review is complete.
      </Text>

      {/* Estimated time */}
      <View style={styles.timeBadge}>
        <Ionicons name="time-outline" size={16} color={Colors.olive} />
        <Text style={styles.timeBadgeText}>Estimated time: <Text style={{ fontFamily: FontFamily.bold }}>24–48 hours</Text></Text>
      </View>

      {/* Submitted Documents */}
      <Text style={styles.sectionLabel}>SUBMITTED DOCUMENTS</Text>
      <View style={styles.docList}>
        {DOCUMENTS.map((doc, i) => (
          <View key={i} style={styles.docRow}>
            <View style={styles.docIconWrap}>
              <Ionicons name={doc.icon} size={18} color={Colors.olive} />
            </View>
            <Text style={styles.docLabel}>{doc.label}</Text>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Under Review</Text>
          </View>
        ))}
      </View>

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

      {/* Go Home */}
      <TouchableOpacity style={styles.homeBtn} onPress={() => router.replace('/(tabs)')} activeOpacity={0.85}>
        <Ionicons name="home-outline" size={18} color={Colors.brown} />
        <Text style={styles.homeBtnText}>Go to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cream },
  content: { paddingHorizontal: Spacing.lg, alignItems: 'center' },
  iconCircle: { width: 88, height: 88, borderRadius: 44, backgroundColor: Colors.marigold + '15', alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.base },
  heading: { ...Typography.h1, color: Colors.brown, fontSize: 22, textAlign: 'center' },
  subheading: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22, marginTop: Spacing.sm, marginBottom: Spacing.lg },
  timeBadge: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, backgroundColor: Colors.olive + '14', paddingHorizontal: Spacing.base, paddingVertical: Spacing.sm, borderRadius: Radii.full, marginBottom: Spacing.xl },
  timeBadgeText: { ...Typography.caption, color: Colors.olive },
  sectionLabel: { ...Typography.caption, fontFamily: FontFamily.semiBold, color: Colors.textLight, letterSpacing: 1, alignSelf: 'flex-start', marginBottom: Spacing.md },
  docList: { width: '100%', backgroundColor: Colors.white, borderRadius: Radii.lg, overflow: 'hidden', marginBottom: Spacing.lg, ...Shadows.sm },
  docRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md, paddingHorizontal: Spacing.base, borderBottomWidth: 1, borderBottomColor: Colors.border },
  docIconWrap: { width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.olive + '12', alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  docLabel: { ...Typography.body, color: Colors.brown, flex: 1 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.olive, marginRight: 6 },
  statusText: { ...Typography.caption, color: Colors.olive },
  helpCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, width: '100%', backgroundColor: Colors.white, padding: Spacing.base, borderRadius: Radii.lg, marginBottom: Spacing.xl, ...Shadows.sm },
  helpTitle: { ...Typography.h3, color: Colors.brown },
  helpDesc: { ...Typography.caption, color: Colors.textSecondary },
  chatLink: { ...Typography.button, color: Colors.terracotta },
  homeBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, width: '100%', height: 52, borderRadius: Radii.md, borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.cream },
  homeBtnText: { ...Typography.button, color: Colors.brown },
});
