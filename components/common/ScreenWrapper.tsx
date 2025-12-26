import { LocationContext } from '@/context/location';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { ActivityIndicator, Button, Linking, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';

const ScreenWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, permissionStatus } = React.useContext(LocationContext) || {};
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundPrimary }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <ThemedText variant="body" color="gray900" style={styles.text}>
          Fetching location...
        </ThemedText>
      </View>
    );
  }

  if (permissionStatus === 'denied' || permissionStatus === 'unavailable') {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundPrimary }]}>
        <ThemedText variant="body" color="gray900" style={styles.text}>
          Location permission is required to use this app.
        </ThemedText>
        <Button title="Open Settings" onPress={Linking.openSettings} />
      </View>
    );
  }

  return <View style={{ flex: 1 }}>{children}</View>;
};

const styles = StyleSheet.create({
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
});

export default ScreenWrapper;
