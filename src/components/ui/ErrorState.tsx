import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Button } from './Button';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = 'Something went wrong', onRetry }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name="alert-circle-outline" size={56} color={Colors.error} />
      </View>
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.desc}>{message}</Text>
      {onRetry && <Button title="Try Again" onPress={onRetry} variant="outline" size="sm" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, paddingVertical: 48 },
  iconWrap: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFEBEE', alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.lg },
  title: { ...Typography.h2, color: Colors.brown, textAlign: 'center', marginBottom: Spacing.sm },
  desc: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', marginBottom: Spacing.lg },
});
