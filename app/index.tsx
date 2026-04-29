import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../src/theme/colors';
import { Typography } from '../src/theme/typography';
import { useAuthStore } from '../src/store/auth.store';

export default function SplashIndex() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/welcome');
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🏺</Text>
      <Text style={styles.title}>The Cultural Map</Text>
      <Text style={styles.subtitle}>Discover India's Crafts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cream, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 64, marginBottom: 16 },
  title: { ...Typography.h1, color: Colors.terracotta, fontSize: 28 },
  subtitle: { ...Typography.body, color: Colors.textSecondary, marginTop: 8 },
});
