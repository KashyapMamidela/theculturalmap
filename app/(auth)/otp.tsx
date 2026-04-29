import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../src/theme/colors';
import { Typography } from '../../src/theme/typography';
import { Radii } from '../../src/theme/shadows';
import { Spacing } from '../../src/theme/spacing';
import { Button } from '../../src/components/ui/Button';
import { TopBar } from '../../src/components/ui/TopBar';
import { useAuthStore } from '../../src/store/auth.store';

const OTP_LENGTH = 6;

export default function OtpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { verifyOtp, isLoading, phone } = useAuthStore();
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const inputs = useRef<(TextInput | null)[]>([]);
  const [timer, setTimer] = useState(30);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < OTP_LENGTH) return;
    const success = await verifyOtp(code);
    if (success) {
      router.replace('/(auth)/role-selection');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={[styles.container, { paddingBottom: insets.bottom + 24 }]}>
        <TopBar title="Verify OTP" showBack />
        <View style={styles.content}>
          <Text style={styles.heading}>Enter verification code</Text>
          <Text style={styles.subtitle}>We sent a 6-digit code to +91 {phone || '**********'}</Text>

          <View style={styles.otpRow}>
            {otp.map((digit, i) => (
              <TextInput
                key={i}
                ref={(r) => { inputs.current[i] = r; }}
                value={digit}
                onChangeText={(t) => handleChange(t, i)}
                style={[styles.otpInput, digit ? styles.otpFilled : null]}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          <Button title="Verify" onPress={handleVerify} fullWidth loading={isLoading} disabled={otp.join('').length < OTP_LENGTH} />

          <View style={styles.resendRow}>
            {timer > 0 ? (
              <Text style={styles.timerText}>Resend code in {timer}s</Text>
            ) : (
              <Text style={styles.resendLink} onPress={() => setTimer(30)}>Resend Code</Text>
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: Colors.cream },
  content: { flex: 1, paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl, gap: Spacing.lg },
  heading: { ...Typography.h1, color: Colors.brown },
  subtitle: { ...Typography.body, color: Colors.textSecondary },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', gap: Spacing.sm },
  otpInput: { width: 48, height: 56, borderRadius: Radii.md, borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.white, textAlign: 'center', ...Typography.h1, color: Colors.brown },
  otpFilled: { borderColor: Colors.terracotta, backgroundColor: '#FFF8F4' },
  resendRow: { alignItems: 'center' },
  timerText: { ...Typography.caption, color: Colors.textLight },
  resendLink: { ...Typography.button, color: Colors.terracotta },
});
