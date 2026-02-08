import { ThemedText } from '@/components/common/ThemedText';
import { moderateScale } from '@/lib/responsive-dimensions';
import React from 'react';
import { View } from 'react-native';

const SubscriptionHeader = () => {
  return (
    <View style={{ gap: moderateScale(4) }}>
      <ThemedText variant="boldHighlightTextS" color="gray900">
        Unlock Your{'\n'}Travlounge Benefits
      </ThemedText>
      <ThemedText variant="body" color="gray900">
        Relax, refresh, and refuel with the right plan.
      </ThemedText>
    </View>
  );
};

export default SubscriptionHeader;
