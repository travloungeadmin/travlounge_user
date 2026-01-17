import { ContentPlaceholder, Rect } from '@/components/common/ContentPlaceholder';
import SubscriptionEmpty from '@/components/screens/subscription/SubscriptionEmpty';
import { moderateScale } from '@/lib/responsive-dimensions';
import React from 'react';
import { View } from 'react-native';

interface HistoryListEmptyProps {
  isLoading: boolean;
}

const HistoryListEmpty = ({ isLoading }: HistoryListEmptyProps) => {
  if (isLoading) {
    return (
      <ContentPlaceholder height={200}>
        {[1, 2, 3].map((item, index) => (
          <Rect key={index} x="20" y={20 + index * 60} rx="4" ry="4" width="350" height="40" />
        ))}
      </ContentPlaceholder>
    );
  }
  return (
    <View style={{ paddingTop: moderateScale(50) }}>
      <SubscriptionEmpty />
    </View>
  );
};

export default HistoryListEmpty;
