import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { Typography, FontFamily } from '../../src/theme/typography';
import { Spacing } from '../../src/theme/spacing';
import { Radii, Shadows } from '../../src/theme/shadows';

const REJECTION_REASONS = [
  'ID document image is blurry or unclear',
  'Address on ID does not match provided address',
  'Bank account details could not be verified',
];

export default function StatusRejectedScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
      {/* Red X icon */}
      <View style={styles.iconCircle}>
        <Ionicons name="close-circle" size={56} color="#C0392B" />
      </View>

      {/* Action Required chip */}
      <View style={styles.actionChip}>
        <Text style={styles.actionChipText}>Action Required</Text>
      </View>

      <Text style={styles.heading}>Verification Unsuccessful</Text>
      <Text style={styles.subheading}>
        We were unable to verify your documents. Please review the reason below and resubmit with correct information.
      </Text>

      {/* Rejection Reasons */}
      <Text style={styles.sectionLabel}>REJECTION REASONS</Text>
      <View style={styles.reasonsCard}>
        {REJECTION_REASONS.map((reason, i) => (
          <View key={i} style={[styles.reasonRow, i < REJECTION_REASONS.length - 1 && styles.reasonBorder]}>
            <Ionicons name="close-circle" size={18} color="#C0392B" />
            <Text style={styles.reasonText}>{reason}</Text>
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

      {/* Resubmit */}
      <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/(auth)/seller-verification')} activeOpacity={0.85}>
        <Ionicons name="refresh-outline" size={18} color={Colors.white} />
        <Text style={styles.primaryBtnText}>Resubmit Documents</Text>
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
  iconCircle: { width: 88, height: 88, borderRadius: 44, backgroundColor: '#C0392B14', alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md },
  actionChip: { backgroundColor: '#C0392B18', paddingHorizontal: Spacing.md, paddingVertical: 4, borderRadius: Radii.full, marginBottom: Spacing.md },
  actionChipText: { ...Typography.caption, color: '#C0392B', fontFamily: FontFamily.semiBold },
  heading: { ...Typography.h1, color: Colors.brown, fontSize: 22, textAlign: 'center' },
  subheading: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22, marginTop: Spacing.sm, marginBottom: Spacing.xl },
  sectionLabel: { ...Typography.caption, fontFamily: FontFamily.semiBold, color: Colors.textLight, letterSpacing: 1, alignSelf: 'flex-start', marginBottom: Spacing.md },
  reasonsCard: { width: '100%', backgroundColor: '#C0392B08', borderRadius: Radii.lg, borderWidth: 1, borderColor: '#C0392B20', overflow: 'hidden', marginBottom: Spacing.lg },
  reasonRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md, padding: Spacing.base },
  reasonBorder: { borderBottomWidth: 1, borderBottomColor: '#C0392B15' },
  reasonText: { ...Typography.body, color: Colors.brown, flex: 1, lineHeight: 22 },
  helpCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, width: '100%', backgroundColor: Colors.white, padding: Spacing.base, borderRadius: Radii.lg, marginBottom: Spacing.xl, ...Shadows.sm },
  helpTitle: { ...Typography.h3, color: Colors.brown },
  helpDesc: { ...Typography.caption, color: Colors.textSecondary },
  chatLink: { ...Typography.button, color: Colors.terracotta },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, width: '100%', height: 56, backgroundColor: Colors.terracotta, borderRadius: Radii.md, marginBottom: Spacing.md },
  primaryBtnText: { ...Typography.button, color: Colors.white, fontSize: 16 },
  secondaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, width: '100%', height: 52, borderRadius: Radii.md, borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.cream },
  secondaryBtnText: { ...Typography.button, color: Colors.brown },
});
