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

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  const handleSignOut = () => {
    signOut();
    router.replace('/(auth)/welcome');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarText}>{user?.name?.[0] ?? 'U'}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{user?.name ?? 'User'}</Text>
            <Text style={styles.phone}>{user?.phone ? `+91 ${user.phone}` : ''}</Text>
          </View>
        </View>

        {/* Edit Profile */}
        <TouchableOpacity style={styles.editProfileBtn} activeOpacity={0.7}>
          <Ionicons name="person-outline" size={18} color={Colors.brown} />
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Sell on Cultural Map banner */}
        <TouchableOpacity style={styles.sellBanner} onPress={() => router.push('/(auth)/seller-intro')} activeOpacity={0.85}>
          <View style={styles.sellIconWrap}>
            <Ionicons name="storefront-outline" size={22} color={Colors.terracotta} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.sellTitle}>Sell on Cultural Map</Text>
            <Text style={styles.sellDesc}>Start your artisan journey</Text>
          </View>
          <TouchableOpacity style={styles.startBtn} activeOpacity={0.7}>
            <Text style={styles.startBtnText}>Start →</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* SHOPPING Section */}
        <Text style={styles.sectionLabel}>SHOPPING</Text>
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuRow} onPress={() => router.push('/(tabs)/orders')} activeOpacity={0.7}>
            <Ionicons name="receipt-outline" size={20} color={Colors.brown} />
            <Text style={styles.menuLabel}>My Orders</Text>
            <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textLight} />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
            <Ionicons name="heart-outline" size={20} color={Colors.brown} />
            <Text style={styles.menuLabel}>Wishlist</Text>
            <View style={[styles.badge, { backgroundColor: Colors.terracotta }]}><Text style={styles.badgeText}>12</Text></View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textLight} />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
            <Ionicons name="location-outline" size={20} color={Colors.brown} />
            <Text style={styles.menuLabel}>Delivery Addresses</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.textLight} />
          </TouchableOpacity>
        </View>

        {/* ACCOUNT Section */}
        <Text style={styles.sectionLabel}>ACCOUNT</Text>
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuRow} onPress={() => router.push('/(auth)/seller-intro')} activeOpacity={0.7}>
            <Ionicons name="storefront-outline" size={20} color={Colors.terracotta} />
            <Text style={[styles.menuLabel, { color: Colors.terracotta }]}>Switch to Selling</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.textLight} />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
            <Ionicons name="notifications-outline" size={20} color={Colors.brown} />
            <Text style={styles.menuLabel}>Notifications</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.textLight} />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
            <Ionicons name="settings-outline" size={20} color={Colors.brown} />
            <Text style={styles.menuLabel}>Settings</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.textLight} />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuRow} onPress={handleSignOut} activeOpacity={0.7}>
            <Ionicons name="log-out-outline" size={20} color="#C0392B" />
            <Text style={[styles.menuLabel, { color: '#C0392B' }]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cream },
  scrollContent: { paddingHorizontal: Spacing.base, paddingBottom: 100 },
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.lg },
  avatarWrap: { width: 56, height: 56, borderRadius: 28, backgroundColor: Colors.terracotta, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 22, fontFamily: FontFamily.bold, color: Colors.white },
  name: { ...Typography.h2, color: Colors.brown },
  phone: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  editProfileBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, height: 44, borderRadius: Radii.md, borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.white, marginBottom: Spacing.base },
  editProfileText: { ...Typography.button, color: Colors.brown },
  sellBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderRadius: Radii.lg, padding: Spacing.base, marginBottom: Spacing.xl, ...Shadows.sm },
  sellIconWrap: { width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.terracotta + '14', alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  sellTitle: { ...Typography.h3, color: Colors.brown },
  sellDesc: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  startBtn: { backgroundColor: Colors.terracotta, paddingHorizontal: Spacing.md, paddingVertical: 8, borderRadius: Radii.full },
  startBtnText: { ...Typography.button, color: Colors.white, fontSize: 12 },
  sectionLabel: { ...Typography.caption, fontFamily: FontFamily.semiBold, color: Colors.textLight, letterSpacing: 1, marginBottom: Spacing.md },
  menuCard: { backgroundColor: Colors.white, borderRadius: Radii.lg, overflow: 'hidden', marginBottom: Spacing.xl, ...Shadows.sm },
  menuRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.base, paddingVertical: Spacing.md, gap: Spacing.md },
  menuDivider: { height: 1, backgroundColor: Colors.border, marginLeft: Spacing.xl + Spacing.base },
  menuLabel: { ...Typography.body, color: Colors.brown, flex: 1 },
  badge: { backgroundColor: Colors.olive, minWidth: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
  badgeText: { fontSize: 11, fontFamily: FontFamily.bold, color: Colors.white },
});
