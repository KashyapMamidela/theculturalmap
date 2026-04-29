import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { Typography } from '../../src/theme/typography';
import { Radii, Shadows } from '../../src/theme/shadows';
import { Spacing } from '../../src/theme/spacing';
import { Button } from '../../src/components/ui/Button';
import { Chip } from '../../src/components/ui/Chip';
import { ProductCard } from '../../src/components/cards/ProductCard';
import { useCartStore } from '../../src/store/cart.store';
import { useProductStore } from '../../src/store/product.store';
import { formatINR } from '../../src/utils/currency';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const addItem = useCartStore((s) => s.addItem);

  const getProductById = useProductStore((s) => s.getProductById);
  const products = useProductStore((s) => s.products);

  const product = getProductById(id);
  const related = products.filter((p) => p.id !== id && p.category === product?.category).slice(0, 4);

  if (!product) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.notFound}>Product not found</Text>
      </View>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero Image */}
        <View style={styles.imageWrap}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imgEmoji}>🎨</Text>
          </View>
          <TouchableOpacity style={[styles.backBtn, { top: Spacing.md }]} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={Colors.brown} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.shareBtn, { top: Spacing.md }]}>
            <Ionicons name="share-outline" size={22} color={Colors.brown} />
          </TouchableOpacity>
        </View>

        <View style={styles.details}>
          {/* Title + Chip */}
          <View style={styles.titleRow}>
            <Text style={styles.title}>{product.title}</Text>
            <Chip label={product.productType === 'handmade' ? 'Handmade' : 'Readymade'} variant={product.productType} />
          </View>

          {/* Seller */}
          <TouchableOpacity style={styles.sellerRow}>
            <View style={styles.sellerAvatar}><Text style={styles.sellerAvatarText}>{product.sellerName[0]}</Text></View>
            <View>
              <Text style={styles.sellerName}>{product.sellerName}</Text>
              <Text style={styles.sellerState}>{product.state}</Text>
            </View>
            {product.sellerVerified && <Chip label="Verified" variant="verified" size="sm" />}
          </TouchableOpacity>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatINR(product.price)}</Text>
            {product.originalPrice && <Text style={styles.originalPrice}>{formatINR(product.originalPrice)}</Text>}
            {discount > 0 && <View style={styles.discountBadge}><Text style={styles.discountText}>{discount}% OFF</Text></View>}
          </View>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color={Colors.marigold} />
            <Text style={styles.ratingVal}>{product.rating}</Text>
            <Text style={styles.reviewCount}>({product.reviewCount} reviews)</Text>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.desc}>{product.description}</Text>
          </View>

          {/* Specs */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            {Object.entries(product.specifications).map(([key, val]) => (
              <View key={key} style={styles.specRow}>
                <Text style={styles.specKey}>{key}</Text>
                <Text style={styles.specVal}>{val}</Text>
              </View>
            ))}
          </View>

          {/* Related */}
          {related.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>You may also like</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {related.map((p) => (
                  <View key={p.id} style={styles.relatedWrap}>
                    <ProductCard product={p} variant="grid" />
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Sticky bottom */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + Spacing.sm }]}>
        <View>
          <Text style={styles.bottomPrice}>{formatINR(product.price)}</Text>
          {product.originalPrice && <Text style={styles.bottomOrig}>{formatINR(product.originalPrice)}</Text>}
        </View>
        <Button title="Add to Cart" onPress={() => addItem(product)} icon={<Ionicons name="bag-add-outline" size={18} color={Colors.white} />} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cream },
  scrollContent: { paddingBottom: 100 },
  notFound: { ...Typography.h2, color: Colors.textSecondary, textAlign: 'center', marginTop: 100 },
  imageWrap: { position: 'relative' },
  imagePlaceholder: { width: '100%', height: 320, backgroundColor: Colors.sand, alignItems: 'center', justifyContent: 'center' },
  imgEmoji: { fontSize: 64 },
  backBtn: { position: 'absolute', left: Spacing.base, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center' },
  shareBtn: { position: 'absolute', right: Spacing.base, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center' },
  details: { padding: Spacing.base, gap: Spacing.base },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: Spacing.sm },
  title: { ...Typography.h1, color: Colors.brown, flex: 1 },
  sellerRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.white, padding: Spacing.md, borderRadius: Radii.md, ...Shadows.sm },
  sellerAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.olive, alignItems: 'center', justifyContent: 'center' },
  sellerAvatarText: { ...Typography.button, color: Colors.white, fontSize: 14 },
  sellerName: { ...Typography.h3, color: Colors.brown },
  sellerState: { ...Typography.caption, color: Colors.textSecondary },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  price: { ...Typography.h1, color: Colors.terracotta, fontSize: 24 },
  originalPrice: { ...Typography.body, color: Colors.textLight, textDecorationLine: 'line-through', fontSize: 16 },
  discountBadge: { backgroundColor: Colors.terracotta, paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: Radii.sm },
  discountText: { fontSize: 11, fontFamily: 'PlusJakartaSans_700Bold', color: Colors.white },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingVal: { ...Typography.h3, color: Colors.brown },
  reviewCount: { ...Typography.caption, color: Colors.textLight },
  section: { gap: Spacing.sm },
  sectionTitle: { ...Typography.h2, color: Colors.brown },
  desc: { ...Typography.body, color: Colors.textSecondary, lineHeight: 22 },
  specRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.border },
  specKey: { ...Typography.caption, color: Colors.textLight, fontFamily: 'PlusJakartaSans_500Medium' },
  specVal: { ...Typography.body, color: Colors.brown },
  relatedWrap: { marginRight: Spacing.md },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Colors.white, paddingHorizontal: Spacing.base, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.border, ...Shadows.lg },
  bottomPrice: { ...Typography.h2, color: Colors.terracotta },
  bottomOrig: { ...Typography.caption, color: Colors.textLight, textDecorationLine: 'line-through' },
});
