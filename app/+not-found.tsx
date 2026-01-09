import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/common/ThemedText';
import { useTheme } from '@/hooks/useTheme';
import { moderateScale } from '@/lib/responsive-dimensions';

export default function NotFoundScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={[styles.container, { backgroundColor: theme.backgroundPrimary }]}>
        <View style={styles.content}>
          <Ionicons
            name="alert-circle-outline"
            size={moderateScale(80)}
            color={theme.secondary500}
          />

          <ThemedText variant="headlineLargeEmphasized" color="gray900" style={styles.title}>
            Oops!
          </ThemedText>

          <ThemedText variant="bodyLarge" color="gray600" style={styles.description}>
            This screen doesn't exist.
          </ThemedText>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            activeOpacity={0.8}
            onPress={() => router.replace('/')}>
            <ThemedText variant="bodyEmphasized" color="white">
              Go Home
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(20),
  },
  content: {
    alignItems: 'center',
    gap: moderateScale(16),
  },
  title: {
    // marginTop: moderateScale(16),
  },
  description: {
    textAlign: 'center',
    marginBottom: moderateScale(24),
  },
  button: {
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(32),
    borderRadius: moderateScale(12),
    minWidth: moderateScale(200),
    alignItems: 'center',
  },
});
