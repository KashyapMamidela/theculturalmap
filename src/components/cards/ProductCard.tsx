import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Radii, Shadows } from '../../theme/shadows';
import { Spacing } from '../../theme/spacing';
import { Product } from '../../types';
import { formatINR } from '../../utils/currency';
import { Chip } from '../ui/Chip';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'list';
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const GRID_CARD_WIDTH = (SCREEN_WIDTH - Spacing.base * 2 - Spacing.md) / 2;

export function ProductCard({ product, variant = 'grid' }: ProductCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  if (variant === 'list') {
    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.85} style={styles.listContainer}>
        <View style={styles.listImagePlaceholder}>
          <Text style={styles.placeholderEmoji}>🎨</Text>
        </View>
        <View style={styles.listContent}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle} numberOfLines={2}>{product.title}</Text>
            <Chip
              label={product.productType === 'handmade' ? 'Handmade' : 'Readymade'}
              variant={product.productType}
              size="sm"
            />
          </View>
          <Text style={styles.sellerName}>{product.sellerName}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatINR(product.price)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>{formatINR(product.originalPrice)}</Text>
            )}
          </View>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color={Colors.marigold} />
            <Text style={styles.rating}>{product.rating}</Text>
            <Text style={styles.reviewCount}>({product.reviewCount})</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.85} style={styles.gridContainer}>
      <View style={styles.gridImagePlaceholder}>
        <Text style={styles.placeholderEmoji}>🎨</Text>
        {product.originalPrice && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </Text>
          </View>
        )}
      </View>
      <View style={styles.gridContent}>
        <Text style={styles.gridTitle} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.sellerName} numberOfLines={1}>{product.sellerName}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatINR(product.price)}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>{formatINR(product.originalPrice)}</Text>
          )}
        </View>
        <View style={styles.bottomRow}>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={11} color={Colors.marigold} />
            <Text style={styles.ratingSmall}>{product.rating}</Text>
          </View>
          <Chip
            label={product.productType === 'handmade' ? 'Handmade' : 'Readymade'}
            variant={product.productType}
            size="sm"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Grid variant
  gridContainer: {
    width: GRID_CARD_WIDTH,
    backgroundColor: Colors.white,
    borderRadius: Radii.lg,
    overflow: 'hidden',
    ...Shadows.md,
    marginBottom: Spacing.base,
  },
  gridImagePlaceholder: {
    width: '100%',
    height: GRID_CARD_WIDTH * 0.85,
    backgroundColor: Colors.sand,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  gridContent: {
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  gridTitle: {
    ...Typography.h3,
    color: Colors.brown,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },

  // List variant
  listContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: Radii.lg,
    overflow: 'hidden',
    ...Shadows.sm,
    marginBottom: Spacing.md,
  },
  listImagePlaceholder: {
    width: 110,
    height: 130,
    backgroundColor: Colors.sand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    flex: 1,
    padding: Spacing.md,
    gap: 4,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  listTitle: {
    ...Typography.h3,
    color: Colors.brown,
    flex: 1,
  },

  // Shared
  placeholderEmoji: {
    fontSize: 32,
  },
  sellerName: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  price: {
    ...Typography.h3,
    color: Colors.terracotta,
  },
  originalPrice: {
    ...Typography.caption,
    color: Colors.textLight,
    textDecorationLine: 'line-through',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    ...Typography.caption,
    color: Colors.brown,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    marginLeft: 2,
  },
  ratingSmall: {
    fontSize: 11,
    color: Colors.brown,
    fontFamily: 'PlusJakartaSans_500Medium',
    marginLeft: 2,
  },
  reviewCount: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  discountBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.terracotta,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radii.sm,
  },
  discountText: {
    fontSize: 10,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.white,
  },
});
