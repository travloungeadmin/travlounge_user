import React from 'react';
import { SafeAreaView as RNSafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

import { useSafeAreaInsets } from './hooks/use-safe-area-insets';

const SafeAreaView = (props: SafeAreaViewProps): React.JSX.Element => {
  return <RNSafeAreaView {...props} />;
};
export { SafeAreaView, useSafeAreaInsets };
