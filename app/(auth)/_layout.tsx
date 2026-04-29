import { Stack } from 'expo-router';
import { Colors } from '../../src/theme/colors';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.cream }, animation: 'slide_from_right' }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="role-selection" />
      <Stack.Screen name="seller-intro" />
      <Stack.Screen name="seller-verification" />
      <Stack.Screen name="status-pending" />
      <Stack.Screen name="status-approved" />
      <Stack.Screen name="status-rejected" />
    </Stack>
  );
}
