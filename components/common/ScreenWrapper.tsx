import { ErrorView } from '@/components/common/ErrorView';
import { ThemedText } from '@/components/common/ThemedText';
import { useLocation } from '@/hooks';
import { useTheme } from '@/hooks/useTheme';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import Loading from '@/old/components/common/Loading';
import { Feather } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import * as Linking from 'expo-linking';
import * as Updates from 'expo-updates';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

interface ScreenWrapperProps {
  children: React.ReactNode;
  /**
   * If true, displays an error screen instead of the children
   * @default false
   */
  isError?: boolean;
  /**
   * Optional callback for the retry button
   */
  onRetry?: () => void;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  isError = false,
  onRetry = () => {},
}) => {
  const { isLoading, permissionStatus } = useLocation();
  const { theme } = useTheme();

  const heightValue = useSharedValue(0);
  const updateHeightValue = useSharedValue(0);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const checkNetworkConnection = () => {
    NetInfo.fetch().then((state) => {
      const hasConnection = state.isConnected && state.isInternetReachable !== false;
      setIsConnected(hasConnection ?? true); // Default to true if null to avoid flash
    });
  };

  const checkForUpdates = useCallback(async () => {
    if (__DEV__) return;
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        updateHeightValue.value = withDelay(500, withTiming(moderateScale(40), { duration: 300 }));
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  }, [updateHeightValue]);

  const handleUpdate = async () => {
    try {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (error) {
      console.error('Fetch update error:', error);
    }
  };

  useEffect(() => {
    checkNetworkConnection();
    checkForUpdates();

    const unsubscribe = NetInfo.addEventListener((state) => {
      const hasConnection = state.isConnected && state.isInternetReachable !== false;
      setIsConnected(hasConnection ?? true);

      if (hasConnection) {
        heightValue.value = withDelay(200, withTiming(0, { duration: 300 }));
      } else {
        heightValue.value = withDelay(200, withTiming(moderateScale(36), { duration: 300 }));
      }
    });
    return () => unsubscribe();
  }, [heightValue, checkForUpdates]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  const updateAnimatedStyle = useAnimatedStyle(() => ({
    height: updateHeightValue.value,
  }));

  // Helper to render content with banners included
  const renderContent = (content: React.ReactNode) => (
    <View style={styles.flex1}>
      <Animated.View
        style={[
          styles.networkBanner,
          { backgroundColor: isConnected ? theme.green500 + '1A' : theme.error + '1A' }, // Transparent bg
          animatedStyle,
        ]}>
        <Feather
          name={isConnected ? 'wifi' : 'wifi-off'}
          size={moderateScale(16)}
          color={isConnected ? theme.green500 : theme.error}
        />
        <ThemedText color={isConnected ? 'green500' : 'error'} variant="bodySmall">
          {isConnected ? 'Connected to the internet.' : 'No internet connection.'}
        </ThemedText>
      </Animated.View>

      <Animated.View
        style={[styles.networkBanner, { backgroundColor: theme.primary }, updateAnimatedStyle]}>
        <Feather name="download-cloud" size={moderateScale(16)} color={theme.white} />
        <ThemedText color="white" variant="bodySmall" style={styles.flex1}>
          New update available
        </ThemedText>
        <TouchableOpacity
          onPress={handleUpdate}
          style={[styles.updateButton, { backgroundColor: theme.backgroundCard }]}>
          <ThemedText color="primary" variant="bodySmall" style={styles.updateButtonText}>
            Update
          </ThemedText>
        </TouchableOpacity>
      </Animated.View>

      {content}
    </View>
  );

  if (isLoading) {
    return renderContent(<Loading />);
  }

  if (permissionStatus === 'denied' || permissionStatus === 'unavailable') {
    return renderContent(
      <View style={[styles.container, { backgroundColor: theme.backgroundPrimary }]}>
        <ThemedText variant="body" color="gray900" style={styles.text}>
          Location permission is required to use this app.
        </ThemedText>
        <Button title="Open Settings" onPress={Linking.openSettings} />
      </View>
    );
  }

  if (isError) {
    return renderContent(<ErrorView onRetry={onRetry} />);
  }

  return renderContent(<View style={styles.flex1}>{children}</View>);
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  networkBanner: {
    width: '100%',
    paddingHorizontal: SPACING.screenPadding,
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
    overflow: 'hidden',
  },
  updateButton: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(4),
  },
  updateButtonText: {
    fontWeight: 'bold',
  },
});

export default ScreenWrapper;
