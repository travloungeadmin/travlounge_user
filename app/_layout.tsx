import { useFonts } from 'expo-font';
import { Slot, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import { LocationProvider } from '@/context/location';

import { ErrorView } from '@/components/common/ErrorView';

import queryClient from '@/services/query';

import { ForceUpdateBottomSheet } from '@/components/common/ForceUpdateBottomSheet';
import { useVersionCheck } from '@/hooks/useVersionCheck';
import { ThemeProvider } from '@/newTheme';
import Loading from '@/old/components/common/Loading';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isChecking, needsUpdate, forceUpdate, openStore } = useVersionCheck();
  const [updateModalDismissed, setUpdateModalDismissed] = useState(false);

  const pathName = usePathname();
  console.log('📍 pathName:', pathName);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

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
    return <ErrorView error={error} onRetry={resetErrorBoundary} />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider>
        <ThemeProvider>
          <LocationProvider>
            <GestureHandlerRootView style={styles.container}>
              <BottomSheetModalProvider>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <ForceUpdateBottomSheet
                    visible={!isChecking && forceUpdate}
                    onUpdate={openStore}
                  />
                  <StatusBar translucent />
                  {loaded ? <Slot /> : <Loading />}
                </ErrorBoundary>
              </BottomSheetModalProvider>
              <Toast />
            </GestureHandlerRootView>
          </LocationProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
