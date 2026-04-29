import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { Typography } from '../../src/theme/typography';
import { Spacing } from '../../src/theme/spacing';
import { ProductCard } from '../../src/components/cards/ProductCard';
import { EmptyState } from '../../src/components/ui/EmptyState';
import { TopBar } from '../../src/components/ui/TopBar';
import { MOCK_PRODUCTS } from '../../src/mocks/products';

export default function ListingsScreen() {
  const insets = useSafeAreaInsets();
  // Show first 4 products as "seller's listings"
  const myListings = MOCK_PRODUCTS.slice(0, 4);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TopBar title="My Listings" showBack />

      <FlatList
        data={myListings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} variant="list" />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState icon="storefront-outline" title="No listings yet" description="Start adding products to sell on The Cultural Map" actionLabel="Add Product" onAction={() => {}} />
        }
      />

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={28} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cream },
  listContent: { paddingHorizontal: Spacing.base, paddingBottom: 80 },
  fab: { position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: Colors.terracotta, alignItems: 'center', justifyContent: 'center', elevation: 6, shadowColor: Colors.brown, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
});
