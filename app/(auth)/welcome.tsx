import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../src/theme/colors';
import { Typography, FontFamily } from '../../src/theme/typography';
import { Spacing } from '../../src/theme/spacing';
import { Radii } from '../../src/theme/shadows';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HERO_IMAGE = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80';

const STATS = [
  { icon: 'shield-checkmark-outline' as const, label: 'Verified Artisans' },
  { icon: 'earth-outline' as const, label: '28 States' },
  { icon: 'star-outline' as const, label: '4.8★ Rated' },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Hero Image Section */}
      <ImageBackground source={{ uri: HERO_IMAGE }} style={styles.heroImage} resizeMode="cover">
        <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.55)']} style={styles.overlay}>
          <View style={[styles.logoRow, { paddingTop: insets.top + 12 }]}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoEmoji}>🏺</Text>
            </View>
            <Text style={styles.logoText}>The Cultural Map</Text>
          </View>
          <View style={styles.heroTextWrap}>
            <Text style={styles.heroTitle}>India's Artisan{'\n'}Heritage, Delivered</Text>
            <Text style={styles.heroSubtitle}>Handpicked crafts from 28 states</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        {STATS.map((stat, i) => (
          <View key={i} style={styles.statItem}>
            <Ionicons name={stat.icon} size={22} color={Colors.brown} />
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Bottom Content */}
      <View style={[styles.bottomContent, { paddingBottom: insets.bottom + 16 }]}>
        <Text style={styles.description}>
          Shop authentic handmade & cultural products directly from artisans across India
        </Text>

        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/(auth)/sign-in')} activeOpacity={0.85}>
          <Text style={styles.primaryBtnText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={18} color={Colors.white} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/(auth)/sign-up')} activeOpacity={0.7}>
          <Text style={styles.secondaryBtnText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cream },
  heroImage: { width: SCREEN_WIDTH, height: SCREEN_WIDTH * 1.15 },
  overlay: { flex: 1, justifyContent: 'space-between', paddingHorizontal: Spacing.lg },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  logoIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  logoEmoji: { fontSize: 18 },
  logoText: { ...Typography.h3, color: Colors.white, fontSize: 15 },
  heroTextWrap: { paddingBottom: Spacing.xl },
  heroTitle: { fontSize: 28, fontFamily: FontFamily.bold, color: Colors.white, lineHeight: 36 },
  heroSubtitle: { ...Typography.body, color: 'rgba(255,255,255,0.85)', marginTop: Spacing.sm },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: Spacing.lg, paddingHorizontal: Spacing.base, borderBottomWidth: 1, borderBottomColor: Colors.border },
  statItem: { alignItems: 'center', gap: 6 },
  statLabel: { ...Typography.caption, color: Colors.brown, fontFamily: FontFamily.medium },
  bottomContent: { flex: 1, justifyContent: 'flex-end', paddingHorizontal: Spacing.lg, gap: Spacing.base },
  description: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, backgroundColor: Colors.terracotta, height: 56, borderRadius: Radii.md, width: '100%' },
  primaryBtnText: { ...Typography.button, color: Colors.white, fontSize: 16 },
  secondaryBtn: { alignItems: 'center', justifyContent: 'center', height: 48, borderRadius: Radii.md, borderWidth: 1.5, borderColor: Colors.border, width: '100%' },
  secondaryBtnText: { ...Typography.button, color: Colors.brown },
});
