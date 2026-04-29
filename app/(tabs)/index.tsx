import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { Typography } from '../../src/theme/typography';
import { Spacing } from '../../src/theme/spacing';
import { Radii } from '../../src/theme/shadows';
import { SearchBar } from '../../src/components/ui/SearchBar';
import { FeaturedBanner } from '../../src/components/sections/FeaturedBanner';
import { StateCard } from '../../src/components/cards/StateCard';
import { ProductCard } from '../../src/components/cards/ProductCard';
import { useUIStore } from '../../src/store/ui.store';
import { useAuthStore } from '../../src/store/auth.store';
import { MOCK_PRODUCTS } from '../../src/mocks/products';
import { MOCK_STATES } from '../../src/mocks/states';
import { PRODUCT_FILTER_CHIPS } from '../../src/utils/constants';
import { ProductFilterType } from '../../src/types';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);
  const { searchQuery, setSearchQuery, selectedProductType, setProductType } = useUIStore();
  const [refreshing, setRefreshing] = useState(false);

  const filteredProducts = MOCK_PRODUCTS.filter((p) => {
    if (selectedProductType !== 'all' && p.productType !== selectedProductType) return false;
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const renderHeader = () => (
    <View style={styles.headerContent}>
      {/* Greeting Row */}
      <View style={styles.greetingRow}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name?.split(' ')[0] || 'Explorer'} 👋</Text>
          <TouchableOpacity style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={Colors.terracotta} />
            <Text style={styles.location}>{user?.location || 'Select Location'}</Text>
            <Ionicons name="chevron-down" size={14} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Ionicons name="notifications-outline" size={22} color={Colors.brown} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} onFilterPress={() => {}} />

      {/* Banner */}
      <FeaturedBanner
        title="Handloom Week"
        subtitle="Up to 40% off on authentic handloom products"
        ctaLabel="Shop Now"
        onPress={() => {}}
      />

      {/* Filter chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
        {PRODUCT_FILTER_CHIPS.map((chip) => (
          <TouchableOpacity
            key={chip.key}
            onPress={() => setProductType(chip.key as ProductFilterType)}
            style={[styles.filterChip, selectedProductType === chip.key && styles.filterChipActive]}
          >
            <Text style={[styles.filterChipText, selectedProductType === chip.key && styles.filterChipTextActive]}>
              {chip.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Explore by State */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore by State</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All →</Text></TouchableOpacity>
        </View>
        <FlatList
          data={MOCK_STATES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <StateCard state={item} onPress={() => {}} />}
          contentContainerStyle={styles.stateList}
        />
      </View>

      {/* Near You header */}
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Near You</Text>
          <Text style={styles.sectionSubtitle}>Crafts from Maharashtra</Text>
        </View>
        <TouchableOpacity><Text style={styles.seeAll}>View All →</Text></TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} variant="grid" />}
        columnWrapperStyle={styles.productRow}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.terracotta} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cream },
  listContent: { paddingBottom: 20 },
  headerContent: { gap: Spacing.base, paddingHorizontal: Spacing.base, paddingTop: Spacing.md },
  greetingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  greeting: { ...Typography.h1, color: Colors.brown },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  location: { ...Typography.caption, color: Colors.textSecondary },
  notifBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  notifDot: { position: 'absolute', top: 10, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.terracotta },
  chipRow: { gap: Spacing.sm, paddingVertical: Spacing.xs },
  filterChip: { paddingHorizontal: Spacing.base, paddingVertical: Spacing.sm, borderRadius: Radii.full, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border },
  filterChipActive: { backgroundColor: Colors.terracotta, borderColor: Colors.terracotta },
  filterChipText: { ...Typography.caption, color: Colors.brown, fontFamily: 'PlusJakartaSans_600SemiBold' },
  filterChipTextActive: { color: Colors.white },
  section: { gap: Spacing.md },
  sectionTitle: { ...Typography.h2, color: Colors.brown },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  seeAll: { ...Typography.button, color: Colors.terracotta, fontSize: 12 },
  sectionSubtitle: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  stateList: { paddingVertical: Spacing.sm },
  productRow: { paddingHorizontal: Spacing.base, justifyContent: 'space-between' },
});
