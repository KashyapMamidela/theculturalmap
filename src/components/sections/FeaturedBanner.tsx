import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Radii } from '../../theme/shadows';
import { Spacing } from '../../theme/spacing';

interface FeaturedBannerProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  onPress: () => void;
}

export function FeaturedBanner({ title, subtitle, ctaLabel, onPress }: FeaturedBannerProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <LinearGradient colors={[Colors.terracotta, '#A85232']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
        <View style={styles.decorCircle} />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <View style={styles.cta}>
            <Text style={styles.ctaText}>{ctaLabel}</Text>
          </View>
        </View>
        <Text style={styles.emoji}>🏺</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: Radii.xl, padding: Spacing.lg, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', minHeight: 140, position: 'relative' },
  decorCircle: { position: 'absolute', right: -30, top: -30, width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.08)' },
  content: { flex: 1, gap: Spacing.sm },
  title: { ...Typography.h1, color: Colors.white },
  subtitle: { ...Typography.body, color: 'rgba(255,255,255,0.85)' },
  cta: { backgroundColor: Colors.white, alignSelf: 'flex-start', paddingHorizontal: Spacing.base, paddingVertical: Spacing.sm, borderRadius: Radii.full, marginTop: Spacing.sm },
  ctaText: { ...Typography.button, color: Colors.terracotta },
  emoji: { fontSize: 48, marginLeft: Spacing.md },
});
