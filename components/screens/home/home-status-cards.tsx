import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';
import Icon from '@/components/ui/icon';
import { useTheme } from '@/hooks';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { AntDesign } from '@expo/vector-icons';
import { Image, ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface HomeStatusCardsProps {
  walletBalance?: number;
  activeSubscription?: any;
}

const HomeStatusCards: React.FC<HomeStatusCardsProps> = ({
  walletBalance = 0,
  activeSubscription = [],
}) => {
  const { theme } = useTheme();

  const hasActivePlan = !!activeSubscription && activeSubscription.length > 0;
  function getTotalRemaining(active_subscriptions: any[]): number {
    if (!Array.isArray(active_subscriptions)) return 0;
    return active_subscriptions.reduce((total, sub) => {
      const remaining =
        sub.benefits?.reduce((sum: number, service: any) => sum + (service.remaining || 0), 0) || 0;

      return total + remaining;
    }, 0);
  }
  const getTotalUses = () => {
    if (!Array.isArray(activeSubscription)) return 0;
    return activeSubscription.reduce((total, sub) => {
      const totalUses =
        sub.benefits?.reduce((sum: number, service: any) => sum + (service.total || 0), 0) || 0;

      return total + totalUses;
    }, 0);
  };
  const totalUses = getTotalUses();
  const totalRemaining = getTotalRemaining(activeSubscription);

  function getHighestExpiryDuration(
    active_subscriptions: any[],
    today: Date = new Date()
  ): { value: number; unit: 'days' | 'months' } {
    let highest: { value: number; unit: 'days' | 'months' } = {
      value: 0,
      unit: 'days',
    };

    if (!Array.isArray(active_subscriptions)) return highest;

    active_subscriptions.forEach((sub) => {
      const start = new Date(today);
      const expiry = new Date(sub.expiry_date);

      start.setHours(0, 0, 0, 0);
      expiry.setHours(0, 0, 0, 0);

      const sameMonth =
        start.getFullYear() === expiry.getFullYear() && start.getMonth() === expiry.getMonth();

      if (sameMonth) {
        const days = Math.ceil((expiry.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

        // only compare with days
        if (highest.unit === 'days' && days > highest.value) {
          highest = { value: days, unit: 'days' };
        }
      } else {
        const months =
          expiry.getFullYear() * 12 +
          expiry.getMonth() -
          (start.getFullYear() * 12 + start.getMonth());

        // months always win over days
        if (highest.unit === 'days' || (highest.unit === 'months' && months > highest.value)) {
          highest = { value: months, unit: 'months' };
        }
      }
    });

    return highest;
  }

  const usesRemaining = getTotalRemaining(activeSubscription);

  const durationRemaining = getHighestExpiryDuration(activeSubscription);
  // Logic for Elite Card
  const points = walletBalance; // Assuming walletBalance is points
  const worth = points; // Assuming 1 pt = 1 Rupee for now

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          if (points > 0) {
            router.push('/elite-card/wallet');
          } else {
            router.push('/elite-card/add-points');
          }
        }}>
        <ImageBackground
          style={styles.card}
          source={require('@/assets/images/elite-card/home-card-bg.png')}>
          <View style={styles.cardContent}>
            <View style={styles.headerRow}>
              <Image
                source={require('@/assets/images/elite-card/elite-coin.png')}
                style={styles.icon}
              />
              <View>
                <ThemedText variant="label" color="primary800" style={styles.smallText}>
                  Travlounge
                </ThemedText>
                <ThemedText variant="labelLargeEmphasized" color="primary800">
                  Elite card
                </ThemedText>
              </View>
            </View>
            <View style={styles.bottomContent}>
              {points > 0 ? (
                <>
                  <View style={styles.pointsRow}>
                    <ThemedText variant="boldHighlightText" color="white">
                      {points.toLocaleString()}
                    </ThemedText>
                    <ThemedText variant="headlineEmphasized" color="white" style={styles.ptsText}>
                      Pts
                    </ThemedText>
                  </View>
                  <ThemedText variant="bodySmallEmphasized" color="white" style={styles.approxText}>
                    Worth approx ₹{worth.toLocaleString()}
                  </ThemedText>
                </>
              ) : (
                <>
                  <ThemedText variant="labelLargeEmphasized" color="white">
                    Load up points.{'\n'}Eat well & earn back.
                  </ThemedText>
                  <ThemedView style={styles.actionButton} backgroundColor="secondary">
                    <ThemedText variant="labelLargeEmphasized" color="primary">
                      Add Points
                    </ThemedText>
                    <AntDesign name="plus-circle" size={moderateScale(18)} color={theme.primary} />
                  </ThemedView>
                </>
              )}
            </View>
          </View>
        </ImageBackground>
      </Pressable>

      <Pressable
        onPress={() => {
          if (hasActivePlan) {
            router.navigate(`/subscription/history`);
            return;
          }

          router.navigate(`/subscription/[id]`);
        }}>
        <ThemedView style={styles.card} backgroundColor="white">
          <Image
            source={require('@/assets/images/elite-card/corner-bg.png')}
            style={styles.cornerBg}
          />
          <View style={[styles.cardContent, { zIndex: 1 }]}>
            {hasActivePlan ? (
              <>
                <View style={styles.headerRow}>
                  <ThemedView backgroundColor="primary800" style={styles.planIcon}>
                    <Icon name="TravloungeIcon" size={moderateScale(20)} />
                  </ThemedView>
                  <View style={styles.planTextWrapper}>
                    <ThemedText variant="label" color="primary800">
                      Active plan
                    </ThemedText>
                    <ThemedText
                      ellipsizeMode="middle"
                      numberOfLines={2}
                      variant="labelLargeEmphasized"
                      color="primary800">
                      {activeSubscription[0].package_name}
                      {activeSubscription.length > 1 && ` & ${activeSubscription.length - 1}+`}
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <ThemedText variant="boldHighlightText" color="primary800">
                      {totalRemaining.toString().padStart(2, '0')}
                    </ThemedText>
                    <ThemedText variant="label" color="primary800">
                      Uses have
                    </ThemedText>
                  </View>
                  <View style={styles.statItem}>
                    <ThemedText variant="boldHighlightText" color="primary800">
                      {durationRemaining.value.toString().padStart(2, '0')}
                    </ThemedText>
                    <ThemedText variant="label" color="primary800">
                      {durationRemaining.unit}
                    </ThemedText>
                  </View>
                </View>

                <ThemedView backgroundColor="primary200" style={styles.progressBarBg}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={[theme.primary800, theme.primary500]}
                    style={[
                      styles.progressBarFill,
                      {
                        minWidth: moderateScale(12),
                        width:
                          ((SPACING.contentWidth - moderateScale(12)) / 2 - moderateScale(40)) *
                          (usesRemaining / totalUses),
                      },
                    ]}>
                    <ThemedView backgroundColor="primary400" style={styles.progressKnob} />
                  </LinearGradient>
                </ThemedView>
              </>
            ) : (
              <>
                <View style={styles.headerRow}>
                  <ThemedView backgroundColor="primary800" style={styles.planIcon}>
                    <Icon name="TravloungeIcon" size={moderateScale(20)} />
                  </ThemedView>
                  <View style={styles.planTextWrapper}>
                    <ThemedText numberOfLines={3} variant="labelLargeEmphasized" color="primary800">
                      No active plan now
                    </ThemedText>
                  </View>
                </View>
                <View>
                  <ThemedText variant="labelLargeEmphasized" color="primary">
                    Subscribe now.{'\n'}For relaxed travel.
                  </ThemedText>
                  <ThemedView style={styles.actionButton} backgroundColor="secondary">
                    <ThemedText variant="labelLargeEmphasized" color="primary">
                      Get Plans
                    </ThemedText>
                    <AntDesign name="plus-circle" size={moderateScale(18)} color={theme.primary} />
                  </ThemedView>
                </View>
              </>
            )}
          </View>
        </ThemedView>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: moderateScale(12),
    paddingHorizontal: SPACING.screenPadding,
    paddingBottom: SPACING.screenPadding,
  },
  card: {
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    height: (SPACING.contentWidth - moderateScale(12)) / 2, // Square-ish? Or flexible height?
    width: (SPACING.contentWidth - moderateScale(12)) / 2,
    padding: moderateScale(16),
  },
  cardContent: {
    flex: 1,

    justifyContent: 'space-between',
  },
  cornerBg: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: moderateScale(80),
    height: moderateScale(80),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  icon: {
    width: moderateScale(32),
    height: moderateScale(32),
  },
  smallText: {
    opacity: 0.9,
  },
  bottomContent: {
    gap: moderateScale(2),
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: moderateScale(4),
  },
  ptsText: {
    fontSize: moderateScale(12),
    opacity: 0.8,
  },
  planIcon: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    marginBottom: moderateScale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(8),
  },
  statItem: {
    alignItems: 'flex-start',
  },
  progressBarBg: {
    padding: moderateScale(4),
    height: moderateScale(20),
    borderRadius: moderateScale(20),
    width: '100%',
    // marginTop: moderateScale(8) // Space handled by flex justification
  },
  progressBarFill: {
    height: '100%',
    borderRadius: moderateScale(16),
  },
  approxText: {
    opacity: 0.9,
  },
  actionButton: {
    height: moderateScale(36),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(18),
    flexDirection: 'row',
    gap: moderateScale(8),
    alignSelf: 'flex-start',
    paddingHorizontal: moderateScale(12),
    marginTop: moderateScale(8),
  },
  planTextWrapper: {
    paddingRight: moderateScale(36),
  },
  progressKnob: {
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: 99,
    position: 'absolute',
    right: 0,
    top: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default HomeStatusCards;
