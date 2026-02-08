import ScreenWrapper from '@/components/common/ScreenWrapper';
import { Box, Device, Text, useSafeAreaInsets } from '@/core';
import { moderateScale } from '@/lib/responsive-dimensions';
import { useTheme } from '@/newTheme';
import { ImageBackground } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ComingSoonProps {
  title?: string;
  description?: string;
  image?: any;
}

const ComingSoonListing = ({
  title = 'Coming Soon',
  description = 'We are working hard to bring this feature to you soon!',
  image = require('@/assets/images/coming_soon_make_a_trip.png'),
}: ComingSoonProps) => {
  const { topHeight, bottomHeight } = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <ScreenWrapper>
      <View style={[styles.container, { height: Device.height - topHeight - bottomHeight }]}>
        <Box style={styles.content}>
          <ImageBackground contentFit="contain" source={image} style={styles.image} />
          <View
            style={{
              alignItems: 'center',

              position: 'absolute',
              bottom: Device.height / 4,
              paddingHorizontal: 30,

              alignSelf: 'center',
              right: 0,
              left: 0,
            }}>
            <Text style={[styles.title, { color: theme.gray900 }]}>{title}</Text>
            <Text preset="POP_14_R" style={[styles.description, { color: theme.gray600 }]}>
              {description}
            </Text>
          </View>
        </Box>
      </View>
    </ScreenWrapper>
  );
};

export default ComingSoonListing;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  content: {
    alignItems: 'center',
    gap: moderateScale(16),
    width: '100%',
  },
  image: {
    width: Device.width,
    height: Device.height,
  },
  title: {
    textAlign: 'center',
    fontSize: moderateScale(24),
    fontWeight: '700',
  },
  description: {
    textAlign: 'center',
    maxWidth: '80%',
  },
});
