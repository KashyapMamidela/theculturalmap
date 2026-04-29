import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../src/theme/colors';
import { Typography } from '../../src/theme/typography';
import { Radii } from '../../src/theme/shadows';
import { Spacing } from '../../src/theme/spacing';
import { Button } from '../../src/components/ui/Button';
import { TopBar } from '../../src/components/ui/TopBar';
import { useSellerStore } from '../../src/store/seller.store';
import { VERIFICATION_STEPS } from '../../src/utils/constants';

export default function SellerVerificationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { verificationStep, updateVerificationStep, submitVerification } = useSellerStore();

  const currentStep = VERIFICATION_STEPS[verificationStep - 1];
  const isLastStep = verificationStep === VERIFICATION_STEPS.length;

  const handleNext = async () => {
    if (isLastStep) {
      await submitVerification();
      router.replace('/(auth)/status-pending');
    } else {
      updateVerificationStep(verificationStep + 1);
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 24 }]}>
      <TopBar title="Verification" showBack />

      {/* Progress */}
      <View style={styles.progress}>
        {VERIFICATION_STEPS.map((s) => (
          <View key={s.id} style={styles.stepRow}>
            <View style={[styles.dot, s.id <= verificationStep ? styles.dotActive : null]}>
              <Text style={styles.dotText}>{s.id <= verificationStep ? '✓' : s.id}</Text>
            </View>
            {s.id < VERIFICATION_STEPS.length && <View style={[styles.line, s.id < verificationStep ? styles.lineActive : null]} />}
          </View>
        ))}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.stepTitle}>{currentStep?.title}</Text>
        <Text style={styles.stepDesc}>{currentStep?.description}</Text>

        {/* Placeholder form fields per step */}
        <View style={styles.fields}>
          <View style={styles.field}>
            <Text style={styles.label}>Field 1</Text>
            <TextInput placeholder="Enter details..." placeholderTextColor={Colors.textLight} style={styles.input} />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Field 2</Text>
            <TextInput placeholder="Enter details..." placeholderTextColor={Colors.textLight} style={styles.input} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.actions}>
        {verificationStep > 1 && (
          <Button title="Back" onPress={() => updateVerificationStep(verificationStep - 1)} variant="outline" fullWidth />
        )}
        <Button title={isLastStep ? 'Submit for Review' : 'Next'} onPress={handleNext} fullWidth />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cream },
  progress: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base },
  stepRow: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  dotActive: { backgroundColor: Colors.terracotta },
  dotText: { ...Typography.caption, color: Colors.white, fontFamily: 'PlusJakartaSans_700Bold' },
  line: { width: 40, height: 2, backgroundColor: Colors.border },
  lineActive: { backgroundColor: Colors.terracotta },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.base, gap: Spacing.base },
  stepTitle: { ...Typography.h1, color: Colors.brown },
  stepDesc: { ...Typography.body, color: Colors.textSecondary },
  fields: { gap: Spacing.base, marginTop: Spacing.sm },
  field: { gap: Spacing.sm },
  label: { ...Typography.caption, color: Colors.brown, fontFamily: 'PlusJakartaSans_600SemiBold' },
  input: { backgroundColor: Colors.white, borderRadius: Radii.md, borderWidth: 1, borderColor: Colors.border, paddingHorizontal: Spacing.base, height: 52, ...Typography.body, color: Colors.text },
  actions: { paddingHorizontal: Spacing.lg, gap: Spacing.sm },
});
