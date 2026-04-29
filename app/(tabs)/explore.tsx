import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { Typography, FontFamily } from '../../src/theme/typography';
import { Spacing } from '../../src/theme/spacing';
import { Radii, Shadows } from '../../src/theme/shadows';
import { SearchBar } from '../../src/components/ui/SearchBar';
import { ProductCard } from '../../src/components/cards/ProductCard';
import { EmptyState } from '../../src/components/ui/EmptyState';
import { MOCK_PRODUCTS } from '../../src/mocks/products';

const CATEGORIES = [
  { emoji: '🏺', name: 'Pottery', count: 234 },
  { emoji: '🧵', name: 'Textiles', count: 412 },
  { emoji: '💍', name: 'Jewellery', count: 198 },
  { emoji: '🎨', name: 'Art & Paintings', count: 156 },
  { emoji: '🏠', name: 'Home Décor', count: 287 },
  { emoji: '🗿', name: 'Sculptures', count: 89 },
  { emoji: '👗', name: 'Clothing', count: 345 },
  { emoji: '🌶️', name: 'Spices & Food', count: 123 },
];

const STATES = [
  { emoji: '🏺', name: 'Rajasthan', specialties: 'Textiles & Pottery', color: Colors.terracotta },
  { emoji: '🪡', name: 'Gujarat', specialties: 'Bandhani & Embroidery', color: Colors.olive },
  { emoji: '🌸', name: 'Uttar Pradesh', specialties: 'Chikankari & Brassware', color: Colors.marigold },
  { emoji: '🎭', name: 'West Bengal', specialties: 'Terracotta & Dokra', color: Colors.brown },
  { emoji: '🌿', name: 'Tamil Nadu', specialties: 'Bronze & Silk', color: Colors.olive },
];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const filteredProducts = MOCK_PRODUCTS.filter(
    (p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search */}
        <View style={styles.searchWrap}>
          <SearchBar value={search} onChangeText={setSearch} placeholder="Search crafts, artisans, states..." />
        </View>

        {search.length > 0 ? (
          /* Search results */
          filteredProducts.length > 0 ? (
            <View style={styles.grid}>
              {filteredProducts.map((p) => (
                <View key={p.id} style={styles.gridItem}>
                  <ProductCard product={p} variant="grid" />
                </View>
              ))}
            </View>
          ) : (
            <EmptyState title="No results" description={`No products matching "${search}"`} icon="search-outline" />
          )
        ) : (
          <>
            {/* Browse Categories */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Browse Categories</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>All →</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.categoryGrid}>
              {CATEGORIES.map((cat, i) => (
                <TouchableOpacity key={i} style={styles.categoryCard} activeOpacity={0.7}>
                  <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                  <Text style={styles.categoryName}>{cat.name}</Text>
                  <Text style={styles.categoryCount}>{cat.count}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Explore by State */}
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Text style={{ fontSize: 16 }}>🏺</Text>
                <Text style={styles.sectionTitle}>Explore by State</Text>
              </View>
            </View>

            {STATES.map((state, i) => (
              <TouchableOpacity key={i} style={styles.stateCard} activeOpacity={0.7}>
                <View style={[styles.stateIconWrap, { backgroundColor: state.color + '15' }]}>
                  <Text style={styles.stateEmoji}>{state.emoji}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.stateName}>{state.name}</Text>
                  <Text style={styles.stateSpecialties}>{state.specialties}</Text>
                </View>
                <Text style={styles.exploreLink}>Explore →</Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cream },
  scrollContent: { paddingBottom: 100 },
  searchWrap: { paddingHorizontal: Spacing.base, paddingVertical: Spacing.md },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.base, marginTop: Spacing.lg, marginBottom: Spacing.md },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  sectionTitle: { ...Typography.h2, color: Colors.brown },
  seeAll: { ...Typography.button, color: Colors.terracotta, fontSize: 13 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Spacing.base, gap: Spacing.md },
  categoryCard: { width: '22%', alignItems: 'center', backgroundColor: Colors.white, paddingVertical: Spacing.md, borderRadius: Radii.lg, ...Shadows.sm },
  categoryEmoji: { fontSize: 28, marginBottom: 6 },
  categoryName: { ...Typography.caption, color: Colors.brown, fontFamily: FontFamily.medium, textAlign: 'center', fontSize: 11 },
  categoryCount: { ...Typography.caption, color: Colors.textLight, fontSize: 10, marginTop: 2 },
  stateCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: Spacing.base, marginBottom: Spacing.md, backgroundColor: Colors.white, padding: Spacing.base, borderRadius: Radii.lg, ...Shadows.sm },
  stateIconWrap: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  stateEmoji: { fontSize: 22 },
  stateName: { ...Typography.h3, color: Colors.brown },
  stateSpecialties: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  exploreLink: { ...Typography.button, color: Colors.terracotta, fontSize: 13 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, paddingHorizontal: Spacing.base },
  gridItem: { width: '47%' },
});
