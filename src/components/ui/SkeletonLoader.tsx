import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Colors } from '../../theme/colors';
import { Radii } from '../../theme/shadows';
import { Spacing } from '../../theme/spacing';

interface SkeletonLoaderProps {
  type?: 'card' | 'list' | 'banner' | 'line';
  count?: number;
}

function SkeletonBlock({ width, height, borderRadius = Radii.sm }: { width: number | string; height: number; borderRadius?: number }) {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.ease,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.7, 0.3],
  });

  return (
    <Animated.View
      style={[
        {
          width: width as number,
          height,
          borderRadius,
          backgroundColor: Colors.shimmer,
          opacity,
        },
      ]}
    />
  );
}

export function SkeletonLoader({ type = 'card', count = 1 }: SkeletonLoaderProps) {
  const items = Array.from({ length: count }, (_, i) => i);

  if (type === 'banner') {
    return (
      <View style={styles.bannerSkeleton}>
        <SkeletonBlock width="100%" height={160} borderRadius={Radii.lg} />
      </View>
    );
  }

  if (type === 'line') {
    return (
      <View style={styles.lineContainer}>
        {items.map((i) => (
          <SkeletonBlock key={i} width="100%" height={16} borderRadius={4} />
        ))}
      </View>
    );
  }

  if (type === 'list') {
    return (
      <View>
        {items.map((i) => (
          <View key={i} style={styles.listSkeleton}>
            <SkeletonBlock width={80} height={80} borderRadius={Radii.md} />
            <View style={styles.listSkeletonContent}>
              <SkeletonBlock width="80%" height={14} />
              <SkeletonBlock width="50%" height={12} />
              <SkeletonBlock width="40%" height={14} />
            </View>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.cardGrid}>
      {items.map((i) => (
        <View key={i} style={styles.cardSkeleton}>
          <SkeletonBlock width="100%" height={120} borderRadius={0} />
          <View style={styles.cardSkeletonContent}>
            <SkeletonBlock width="90%" height={14} />
            <SkeletonBlock width="60%" height={12} />
            <SkeletonBlock width="40%" height={14} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bannerSkeleton: {
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.base,
  },
  lineContainer: {
    gap: Spacing.sm,
    paddingHorizontal: Spacing.base,
  },
  listSkeleton: {
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  listSkeletonContent: {
    flex: 1,
    gap: Spacing.sm,
    justifyContent: 'center',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    paddingHorizontal: Spacing.base,
  },
  cardSkeleton: {
    width: '47%',
    borderRadius: Radii.lg,
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  cardSkeletonContent: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
});
