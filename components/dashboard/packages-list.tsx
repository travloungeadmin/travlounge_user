import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { shadow } from '@/constants';
import { Box, Device, Image, Pressable, Text } from '@/core';
import { useActiveSubscriptionsQuery } from '@/services/query/home';
import { Package, PackagesListProps } from '@/types/components/dashboard/packages-list.types';

// Constants for reusable values
const GRADIENT_COLORS: [string, string] = ['#385BD6', '#1D3070'];
const GRADIENT_START = { x: 0, y: 0 };
const GRADIENT_END = { x: 1, y: 1 };

/**
 * Active subscription component displayed when a user has an active plan
 */
const ActivePlanItem: React.FC<{
  packageName: string;
  onPress?: () => void;
  width?: number;
}> = ({ packageName, onPress = () => {}, width }) => (
  <Pressable onPress={onPress}>
    <LinearGradient
      colors={GRADIENT_COLORS}
      style={[shadow, styles.subscriptionBox, width ? { width } : undefined]}
      start={GRADIENT_START}
      end={GRADIENT_END}>
      <View style={styles.rowContainer}>
        <Box style={styles.textContainer}>
          <Text color="#fff" preset="POP_12_R">
            Welcome to Exclusive. Enjoy your benefits!
          </Text>
          <Text color="#fff" preset="POP_14_SB">
            {packageName}
          </Text>
        </Box>
        <AntDesign name="arrowright" size={24} color="#fff" />
      </View>
    </LinearGradient>
  </Pressable>
);

/**
 * Package item component for subscription options
 */
const PackageItem: React.FC<{
  item: Package;
  index: number;
  onPress: () => void;
}> = ({ item, index, onPress }) => (
  <Pressable onPress={onPress} key={index}>
    <LinearGradient
      colors={GRADIENT_COLORS}
      style={[shadow, styles.subscriptionBox]}
      start={GRADIENT_START}
      end={GRADIENT_END}>
      <Image
        source={require('@/assets/images/welcome_toloo.png')}
        style={styles.packageImage}
        contentFit="cover"
      />
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
);

/**
 * Packages list component that displays active subscriptions and available packages
 */
const PackagesList: React.FC<PackagesListProps> = ({ packages, subscription_data }) => {
  const router = useRouter();
  const { data } = useActiveSubscriptionsQuery();
  const hasActiveNonBonusSubscription = !data?.active_subscriptions?.[0]?.is_welcome_bonus;
  const activePlanName = data?.active_subscriptions?.[0]?.package_name;

  const handlePackagePress = (item: Package) => {
    router.navigate({
      pathname: '/old/packge',
      params: { packageDetails: JSON.stringify(item) },
    });
  };

  // Single active plan view
  if (hasActiveNonBonusSubscription && activePlanName) {
    return (
      <View>
        <Box style={styles.singlePlanContainer}>
          <ActivePlanItem
            onPress={() => router.navigate('/profile')}
            packageName={activePlanName}
            width={Device.width - 32}
          />
        </Box>
      </View>
    );
  }

  // Scrollable list of plans
  return (
    <View>
      <ScrollView showsHorizontalScrollIndicator={false} style={styles.scrollView} horizontal>
        <Box style={styles.boxContainer}>
          {!hasActiveNonBonusSubscription && activePlanName ? (
            <ActivePlanItem
              onPress={() => router.navigate('/profile')}
              packageName={activePlanName}
            />
          ) : null}

          {packages?.map((item, index) => (
            <PackageItem
              key={index}
              item={item}
              index={index}
              onPress={() => handlePackagePress(item)}
            />
          ))}
        </Box>
      </ScrollView>
    </View>
  );
};

export default PackagesList;

const styles = StyleSheet.create({
  scrollView: {
    overflow: 'visible',
  },
  singlePlanContainer: {
    marginBottom: 20,
    marginLeft: 16,
  },
  boxContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  subscriptionBox: {
    // borderWidth: 2,
    // borderColor: '#5773D7',
    height: 80,
    overflow: 'hidden',
    width: Device.width * 0.8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16,
    width: '100%',
  },
  packageImage: {
    width: 100,
    height: '100%',
    borderRadius: 8,
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
