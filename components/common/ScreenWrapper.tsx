import { LocationContext } from '@/context/location';
import { colors } from '@/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const ScreenWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, permissionStatus } = React.useContext(LocationContext) || {};

  // if (isLoading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color={colors.buttonBackgroundPrimary} />
  //       <Text style={styles.text}>Fetching location...</Text>
  //     </View>
  //   );
  // }

  // if (permissionStatus === 'denied' || permissionStatus === 'unavailable') {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.text}>Location permission is required to use this app.</Text>
  //       <Button title="Open Settings" onPress={Linking.openSettings} />
  //     </View>
  //   );
  // }

  return <View style={{ flex: 1 }}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundPrimary,
  },
  text: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    color: colors.textPrimary,
  },
});

export default ScreenWrapper;
