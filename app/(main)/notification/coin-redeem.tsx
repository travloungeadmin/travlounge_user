import { moderateScale } from '@/lib/responsive-dimensions';
import { THEME_COLORS } from '@/newConstants/colors';
import { SPACING } from '@/newConstants/spacing';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import local assets - adjustments may be needed based on actual structure
const COIN_BOX_IMAGE = require('@/assets/images/elite-card/add-coin-bg.png'); // Using a placeholder based on file list, adjust if needed
const SUCCESS_CHECK = require('@/assets/images/elite-card/success-check.png'); // Need to check if this exists or use icon. File list showed success-check.png
const COIN_ICON = require('@/assets/images/elite-card/elite-coin.png');
const COINS_FALLING = require('@/assets/images/elite-card/redeem_coin.png'); // Placeholder, might need a better one or crop
const COINS_BACKGROUND = require('@/assets/images/elite-card/redeem_coin-bg.png'); // Placeholder, might need a better one or crop

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
// Target height for top card after animation
const TOP_CARD_FINAL_HEIGHT =
  SPACING.deviceHeight -
  (SPACING.contentWidth + moderateScale(50)) -
  SPACING.screenBottom -
  moderateScale(140);

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedView = Animated.createAnimatedComponent(View);

interface CoinRedeemData {
  message: string;
  redeemedPoints: number;
  reward: {
    points: number;
    creditType: string;
    lifetimePointCredit: number;
  };
  status: string;
  transactionDate: string;
  transactionId: string;
  transactionTime: string;
  transferredTo: {
    type: string;
    name: string;
    merchantId: string;
  };
}

export default function CoinRedeemScreen() {
  const router = useRouter();
  const colors = THEME_COLORS.light; // Or use hook if theme support needed
  const { data } = useLocalSearchParams<{ data: string }>();

  const redeemData: CoinRedeemData | null = useMemo(() => {
    try {
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to parse coin redeem data', e);
      return null;
    }
  }, [data]);

  // Animation Values
  const topCardHeight = useSharedValue(SCREEN_HEIGHT); // Start taking full screen height (approx)
  const bottomCardTranslateY = useSharedValue(SCREEN_HEIGHT / 2); // Start pushed down
  const bottomCardOpacity = useSharedValue(0);

  useEffect(() => {
    // Start Animation Sequence
    // 1. Top card shrinks
    topCardHeight.value = withDelay(
      300,
      withSpring(moderateScale(TOP_CARD_FINAL_HEIGHT), { damping: 12, stiffness: 90 })
    );

    // 2. Bottom card slides up and fades in
    bottomCardTranslateY.value = withDelay(400, withSpring(0, { damping: 12, stiffness: 90 }));
    bottomCardOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));
  }, []);

  const animatedTopCardStyle = useAnimatedStyle(() => {
    return {
      height: topCardHeight.value,
    };
  });

  const animatedBottomCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: bottomCardTranslateY.value }],
      opacity: bottomCardOpacity.value,
    };
  });

  const handleContinue = () => {
    // Navigate back or to home
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(main)/(tab)');
    }
  };

  const formattedDate = useMemo(() => {
    if (!redeemData?.transactionDate) return '';
    try {
      const dateObj = new Date(redeemData.transactionDate);
      // Combine with time if possible, or just date
      // Logic depends on input format. "2026-01-05" is YYYY-MM-DD
      const dayMonth = format(dateObj, 'd MMM');
      return `${dayMonth}, ${redeemData.transactionTime.toLowerCase()}`;
    } catch (e) {
      return `${redeemData?.transactionDate}, ${redeemData?.transactionTime}`;
    }
  }, [redeemData]);

  if (!redeemData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading or Invalid Data...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.contentWrapper}>
        {/* Top Card - Success Message */}
        <AnimatedLinearGradient
          colors={['#C2FFD8', '#46F289']} // Approximate gradient colors from image
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[styles.topCard, animatedTopCardStyle]}>
          <Text style={styles.successTitle}>{redeemData.message || 'Transaction Successful'}</Text>

          <View style={styles.checkWrapper}>
            <Ionicons name="checkmark-circle" size={moderateScale(80)} color="#00C853" />
          </View>

          <View style={styles.transferInfo}>
            <View style={styles.ptsRow}>
              <Image source={COIN_ICON} style={styles.smallCoin} resizeMode="contain" />
              <Text style={styles.ptsText}>{redeemData.redeemedPoints} Pts</Text>
            </View>
            <Text style={styles.transferDetail}>
              {redeemData.transferredTo?.name
                ? `Transferred to ${redeemData.transferredTo.name}`
                : 'Redeemed'}
            </Text>
            <Text style={styles.dateDetail}>{formattedDate}</Text>
          </View>
        </AnimatedLinearGradient>

        {/* Bottom Card - Points Added */}
        <AnimatedView style={[styles.bottomCardWrapper, animatedBottomCardStyle]}>
          <ImageBackground
            source={COINS_BACKGROUND}
            style={{
              width: SPACING.contentWidth,
              height: SPACING.contentWidth + moderateScale(50),
            }}
            resizeMode="cover">
            <Image source={COINS_FALLING} style={styles.coinsFallingImage} resizeMode="contain" />

            <View style={styles.bottomCardContent}>
              <Text style={styles.pointsAddedText}>{redeemData.reward?.points ?? 0} Pts</Text>
              <Text style={styles.pointsAddedLabel}>Added to your card</Text>
              <Text style={styles.lifetimeText}>
                Lifetime point credit {redeemData.reward?.lifetimePointCredit ?? 0} Pts
              </Text>
            </View>
          </ImageBackground>
        </AnimatedView>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={[styles.continueButton, { backgroundColor: colors.primary }]}
          onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Assuming white background
  },
  contentWrapper: {
    flex: 1,
    padding: moderateScale(20),
    gap: moderateScale(20),
    // Note: ScrollView removed to ensure smooth layout animation.
    // If content exceeds screen, this will clip. Given the design, it should fit.
  },
  topCard: {
    width: '100%',
    // height handled by animation
    borderRadius: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: moderateScale(10),
    overflow: 'hidden', // Ensure shrinking doesn't show overflow immediately
  },
  successTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#000000',
  },
  checkWrapper: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    backgroundColor: 'white',
    borderRadius: moderateScale(50),
    padding: moderateScale(2), // White rim
  },
  transferInfo: {
    alignItems: 'center',
    gap: moderateScale(8),
  },
  ptsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
    marginBottom: moderateScale(5),
  },
  smallCoin: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  ptsText: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#000',
  },
  transferDetail: {
    fontSize: moderateScale(14),
    color: '#333',
  },
  dateDetail: {
    fontSize: moderateScale(12),
    color: '#555',
  },
  bottomCardWrapper: {
    // Height is determined by internal content (ImageBackground)
    borderRadius: moderateScale(20),
    overflow: 'hidden',
    marginBottom: (SPACING.screenBottom ?? 0) + moderateScale(50),
  },
  // Removed bottomCard style as ImageBackground handles it
  coinsFallingImage: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    width: SPACING.contentWidth - moderateScale(60),
    height: (SPACING.contentWidth - moderateScale(60)) * 0.9,
  },
  bottomCardContent: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: moderateScale(40),
  },
  pointsAddedText: {
    fontSize: moderateScale(32),
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: moderateScale(8),
  },
  pointsAddedLabel: {
    fontSize: moderateScale(16),
    color: '#FFFFFF',
    fontWeight: '500',
    marginBottom: moderateScale(8),
  },
  lifetimeText: {
    fontSize: moderateScale(12),
    color: 'rgba(255, 255, 255, 0.8)',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: moderateScale(20),
    paddingBottom: SPACING.screenBottom,
  },
  continueButton: {
    height: moderateScale(50),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
});
