import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { shadow } from '@/constants';
import { Box, Device, Image, Pressable, Text } from '@/core';

const SubscriptionView = ({ packages }) => {
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
            key={index}>
            <LinearGradient
              colors={['#385BD6', '#1D3070']}
              style={[shadow, styles.subscriptionBox]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              <Image
                source={require('@/assets/images/welcome_toloo.png')}
                style={{ width: 100, height: '100%', borderRadius: 8 }}
                contentFit="cover"
              />
              {/* <Icon size={40} name={index === 0 ? 'Crown' : 'Surprice'} /> */}
              {/* <Box style={[styles.divider, { backgroundColor: colors.dividerPrimary }]} /> */}
              <Box style={styles.textContainer}>
                <Text color="#fff" preset="POP_14_SB">
                  {index === 0 ? 'Exclusive Access Awaits, Subscribe Now!' : 'Surprise Plan'}
                </Text>
                <Box style={styles.subscriptionInfo}>
                  <Text color="#fff" preset="POP_12_R">
                    Subscription info
                  </Text>
                  <Text color="#fff" preset="ROB_16_B">
                    ₹ {Math.round(item.amount)}
                  </Text>
                </Box>
              </Box>
            </LinearGradient>
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
    marginBottom: 20,
    // marginVertical: 20,
    paddingHorizontal: 16,
  },
  subscriptionBox: {
    borderWidth: 2,
    borderColor: '#5773D7',
    height: 80,
    overflow: 'hidden',
    width: Device.width * 0.8,
    borderRadius: 8,

    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    marginHorizontal: 10,
    width: 1,
    height: 45,
  },
  textContainer: {
    paddingHorizontal: 10,
    height: '70%',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  subscriptionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
