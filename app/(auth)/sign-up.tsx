import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { Typography, FontFamily } from '../../src/theme/typography';
import { Spacing } from '../../src/theme/spacing';
import { Radii } from '../../src/theme/shadows';
import { useAuthStore } from '../../src/store/auth.store';

export default function SignUpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const signUp = useAuthStore((s) => s.signUp);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (phone.length < 10) return;
    setLoading(true);
    await signUp('New User', phone, `user${phone}@culturalmap.in`);
    setLoading(false);
    router.push({ pathname: '/(auth)/otp', params: { phone } });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 24 }]} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={Colors.brown} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Create Account</Text>
            <Text style={styles.headerSubtitle}>Enter your mobile number</Text>
          </View>
        </View>

        {/* Progress bar */}
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>

        {/* Phone Icon Illustration */}
        <View style={styles.illustrationWrap}>
          <Ionicons name="call-outline" size={48} color={Colors.terracotta} />
        </View>

        {/* Form */}
        <Text style={styles.formTitle}>Join The Cultural Map</Text>
        <Text style={styles.formDesc}>We'll send a 6-digit OTP to verify your mobile number</Text>

        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.phoneInputRow}>
          <View style={styles.countryCode}>
            <Text style={styles.flag}>IN</Text>
            <Text style={styles.codeText}>+91</Text>
            <Ionicons name="chevron-down" size={14} color={Colors.textLight} />
          </View>
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter 10-digit number"
            placeholderTextColor={Colors.textLight}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>

        {/* Privacy notice */}
        <View style={styles.privacyRow}>
          <Ionicons name="shield-checkmark-outline" size={16} color={Colors.textLight} />
          <Text style={styles.privacyText}>Your number is safe with us. We never share personal data.</Text>
        </View>

        {/* Send OTP button */}
        <TouchableOpacity
          style={[styles.otpBtn, phone.length < 10 && styles.otpBtnDisabled]}
          onPress={handleSendOTP}
          disabled={phone.length < 10 || loading}
          activeOpacity={0.8}
        >
          <Text style={styles.otpBtnText}>{loading ? 'Sending...' : 'Send OTP'}</Text>
        </TouchableOpacity>

        {/* Sign in link */}
        <View style={styles.switchRow}>
          <Text style={styles.switchText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')}>
            <Text style={styles.switchLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cream },
  scrollContent: { paddingHorizontal: Spacing.lg, flexGrow: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.md },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { ...Typography.h1, color: Colors.brown },
  headerSubtitle: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  progressBar: { height: 3, backgroundColor: Colors.sand, borderRadius: 2, marginBottom: Spacing.xl },
  progressFill: { height: 3, width: '33%', backgroundColor: Colors.terracotta, borderRadius: 2 },
  illustrationWrap: { width: 88, height: 88, borderRadius: 44, backgroundColor: Colors.sand, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: Spacing.xl },
  formTitle: { ...Typography.h1, color: Colors.brown, fontSize: 22, marginBottom: Spacing.sm },
  formDesc: { ...Typography.body, color: Colors.textSecondary, marginBottom: Spacing.xl, lineHeight: 22 },
  label: { ...Typography.h3, color: Colors.brown, marginBottom: Spacing.sm },
  phoneInputRow: { flexDirection: 'row', borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radii.md, overflow: 'hidden', marginBottom: Spacing.base },
  countryCode: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: Spacing.md, backgroundColor: Colors.white, borderRightWidth: 1, borderRightColor: Colors.border },
  flag: { fontSize: 13, fontFamily: FontFamily.semiBold, color: Colors.brown },
  codeText: { ...Typography.body, color: Colors.brown, fontFamily: FontFamily.semiBold },
  phoneInput: { flex: 1, height: 52, paddingHorizontal: Spacing.md, ...Typography.body, color: Colors.brown, backgroundColor: Colors.white },
  privacyRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm, backgroundColor: Colors.sand + '60', padding: Spacing.md, borderRadius: Radii.sm, marginBottom: Spacing.xl },
  privacyText: { ...Typography.caption, color: Colors.textSecondary, flex: 1, lineHeight: 18 },
  otpBtn: { height: 52, borderRadius: Radii.md, borderWidth: 1.5, borderColor: Colors.brown, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.cream, marginBottom: Spacing.lg },
  otpBtnDisabled: { opacity: 0.4 },
  otpBtnText: { ...Typography.button, color: Colors.brown, fontSize: 16 },
  switchRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  switchText: { ...Typography.body, color: Colors.textSecondary },
  switchLink: { ...Typography.button, color: Colors.terracotta },
});
