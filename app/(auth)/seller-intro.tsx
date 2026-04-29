import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../src/theme/colors';
import { Typography } from '../../src/theme/typography';
import { Radii } from '../../src/theme/shadows';
import { Spacing } from '../../src/theme/spacing';
import { Button } from '../../src/components/ui/Button';
import { TopBar } from '../../src/components/ui/TopBar';

const BENEFITS = [
  { icon: '📱', title: 'Easy Listing', desc: 'List your products in minutes with our simple process' },
  { icon: '💰', title: 'Fair Pricing', desc: 'Set your own prices with low platform fees' },
  { icon: '🚚', title: 'Shipping Support', desc: 'We handle logistics so you can focus on crafting' },
  { icon: '📊', title: 'Sales Dashboard', desc: 'Track orders, earnings, and analytics in real-time' },
];

export default function SellerIntroScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 24 }]}>
      <TopBar title="Become a Seller" showBack />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Sell your craft to all of India 🇮🇳</Text>
        <Text style={styles.subtitle}>Join thousands of artisans already selling on The Cultural Map</Text>

        <View style={styles.benefits}>
          {BENEFITS.map((b, i) => (
            <View key={i} style={styles.benefitCard}>
              <Text style={styles.benefitIcon}>{b.icon}</Text>
              <View style={styles.benefitText}>
                <Text style={styles.benefitTitle}>{b.title}</Text>
                <Text style={styles.benefitDesc}>{b.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.actions}>
        <Button title="Start Verification" onPress={() => router.push('/(auth)/seller-verification')} fullWidth />
        <Button title="Maybe Later" onPress={() => router.replace('/(tabs)')} variant="ghost" fullWidth />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cream },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.base, gap: Spacing.base },
  heading: { ...Typography.h1, color: Colors.brown, fontSize: 22 },
  subtitle: { ...Typography.body, color: Colors.textSecondary },
  benefits: { gap: Spacing.md, marginTop: Spacing.sm },
  benefitCard: { flexDirection: 'row', backgroundColor: Colors.white, borderRadius: Radii.lg, padding: Spacing.base, gap: Spacing.md, alignItems: 'center' },
  benefitIcon: { fontSize: 32 },
  benefitText: { flex: 1, gap: 2 },
  benefitTitle: { ...Typography.h3, color: Colors.brown },
  benefitDesc: { ...Typography.caption, color: Colors.textSecondary },
  actions: { paddingHorizontal: Spacing.lg, gap: Spacing.sm },
});
