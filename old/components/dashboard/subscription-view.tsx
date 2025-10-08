import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Box, Device, Pressable, Text } from '@/core';
import { shadow } from '@/old/constants';
import { useTheme } from '@/old/lib/theme';
import { useRouter } from 'expo-router';
import Icon from '../ui/icon';

const SubscriptionView = ({ packages }) => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView showsHorizontalScrollIndicator={false} style={styles.scrollView} horizontal>
      <Box style={styles.boxContainer}>
        {packages?.map((item, index) => (
          <Pressable
            onPress={() =>
              router.navigate({
                pathname: '/old/packge',
                params: { packageDetails: JSON.stringify(item) },
              })
            }
            key={index}
            style={[
              shadow,
              styles.subscriptionBox,
              { backgroundColor: theme.backgroundSecondary },
            ]}>
            <Icon size={30} name={index === 0 ? 'Crown' : 'Surprice'} />
            <Box style={[styles.divider, { backgroundColor: theme.dividerPrimary }]} />
            <Box style={styles.textContainer}>
              <Text color={theme.textPrimary} preset="POP_14_SB">
                {index === 0 ? 'Exclusive Access Awaits, Subscribe Now!' : 'Surprise Plan'}
              </Text>
              <Box style={styles.subscriptionInfo}>
                <Text color={theme.textPrimary} preset="POP_12_R">
                  Subscription info
                </Text>
                <Text color={theme.textPrimary} preset="ROB_16_B">
                  ₹ {Math.round(item.amount)}
                </Text>
              </Box>
            </Box>
          </Pressable>
        ))}
      </Box>
    </ScrollView>
  );
};

export default SubscriptionView;

const styles = StyleSheet.create({
  scrollView: {
    overflow: 'visible',
  },
  boxContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  subscriptionBox: {
    height: 66,
    overflow: 'visible',
    width: Device.width * 0.7,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    marginHorizontal: 10,

    width: 1,
    height: 30,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  subscriptionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
