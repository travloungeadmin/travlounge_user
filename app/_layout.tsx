import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import { Box, Text } from '@/core';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useVersionCheck } from '@/hooks/useVersionCheck';
import queryClient from '@/services/query';
import { colors } from '@/theme';

import { ThemeProvider } from '@/newTheme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClientProvider } from '@tanstack/react-query';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [updateModalDismissed, setUpdateModalDismissed] = useState(false);
  const { isChecking, needsUpdate, forceUpdate, openStore } = useVersionCheck();
  React.useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        console.log('Update available:', update);

        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        console.log('Error checking for update:', error);
      }
    };

    checkForUpdates();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const ErrorFallback = ({
    error,
    resetErrorBoundary,
  }: {
    error: Error;
    resetErrorBoundary: () => void;
  }) => {
    return (
      <Box
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.backgroundPrimary,
        }}>
        <Text style={{ textAlign: 'center' }}>{error.message}</Text>
        <Button title="Try again" onPress={resetErrorBoundary} />
      </Box>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider>
        <ThemeProvider>
          <GestureHandlerRootView style={styles.container}>
            <BottomSheetModalProvider>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Slot />
              </ErrorBoundary>
              <StatusBar style="dark" />
              {/* <UpdateModal
            visible={!isChecking && (forceUpdate || (needsUpdate && !updateModalDismissed))}
            isForceUpdate={forceUpdate}
            onUpdate={openStore}
            onLater={forceUpdate ? undefined : () => setUpdateModalDismissed(true)}
          /> */}
            </BottomSheetModalProvider>
            <Toast />
          </GestureHandlerRootView>
        </ThemeProvider>
      </KeyboardProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
});
