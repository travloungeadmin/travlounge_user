import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';
import Icon from '@/components/ui/icon';
import { useTheme } from '@/hooks';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { getWalletDetails } from '@/services/query/qr';
import { Image, ImageBackground } from 'expo-image';
import { useFocusEffect } from 'expo-router';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRScreen = () => {
  const { theme } = useTheme();
  const { data, refetch } = getWalletDetails();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const activeSubscription = data?.active_subscription;
  const subscriptionData = data?.subscription_data?.[0]?.service_type_counts || [];

  const totalRemainingUses = subscriptionData.reduce((acc, curr) => acc + curr.remaining, 0);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <ThemedText style={styles.title} variant="titleEmphasized" color="gray900">
            {data?.name}
          </ThemedText>
          <View style={styles.qrWrapper}>
            <ThemedView style={styles.qrBackground}>
              <QRCode
                value={data?.user_details?.user_id?.toString() || '0'}
                size={SPACING.deviceWidth * 0.7 - moderateScale(40)}
                backgroundColor="#fff"
              />
            </ThemedView>
            <View style={styles.labelRow}>
              <ThemedText variant="body" color="gray900">
                Wallet Balance
              </ThemedText>
              <ThemedText variant="body" color="gray900">
                {data?.wallet_balance}
              </ThemedText>
            </View>
          </View>
          <ImageBackground
            style={styles.cardBackground}
            source={require('@/assets/images/elite-card/add-coin-bg.png')}>
            <View style={styles.cardContentLeft}>
              <Image
                source={require('@/assets/images/elite-card/elite-coin.png')}
                style={styles.coinIcon}
              />
              <View>
                <ThemedText variant="label" color="white">
                  Travlounge
                </ThemedText>
                <ThemedText variant="labelLargeEmphasized" color="white">
                  Elite card
                </ThemedText>
              </View>
            </View>
            <View style={styles.cardContentRight}>
              <ThemedText variant="large" color="white">
                {data?.elite_coin_balance?.toLocaleString() ?? 0} Pts
              </ThemedText>
              <ThemedText variant="body" color="white">
                Worth approx ₹{data?.elite_coin_balance?.toLocaleString() ?? 0}
              </ThemedText>
            </View>
          </ImageBackground>

          {/* Active Plan Section */}
          {activeSubscription ? (
            <ThemedView style={styles.statsContainer} backgroundColor="white">
              <View style={styles.statsInner}>
                <View style={styles.statsTopRow}>
                  <View style={styles.activePlaneRow}>
                    <ThemedView backgroundColor="primary800" style={styles.circle}>
                      <Icon name="TravloungeIcon" size={moderateScale(20)} color="white" />
                    </ThemedView>
                    <View>
                      <ThemedText variant="body" color="gray900">
                        Active plan
                      </ThemedText>
                      <ThemedText variant="labelLargeEmphasized" color="gray900">
                        {activeSubscription.package_name}
                      </ThemedText>
                    </View>
                  </View>
                  <View style={styles.balanceRow}>
                    <ThemedText
                      style={[styles.separatorText, { borderRightColor: theme.gray300 }]}
                      variant="bodyLargeEmphasized"
                      color="primary800">
                      {activeSubscription.days_remaining} Days
                    </ThemedText>
                    <ThemedText variant="bodyLargeEmphasized" color="primary800">
                      {totalRemainingUses} Uses
                    </ThemedText>
                  </View>
                </View>
                <ThemedView backgroundColor="primary200" style={styles.divider} />
                <View style={styles.listContainer}>
                  {subscriptionData.map((item, index) => (
                    <View key={index} style={styles.listItem}>
                      <ThemedView backgroundColor="gray200" style={styles.dot} />
                      <ThemedText variant="body" color="gray600">
                        {item.service}:{item.remaining}
                      </ThemedText>
                    </View>
                  ))}
                </View>
              </View>

              <Image
                source={require('@/assets/images/elite-card/corner-bg.png')}
                style={styles.cornerBg}
              />
            </ThemedView>
          ) : null}
        </View>
      </ScrollView>
      {/* <ThemedView backgroundColor="white" style={styles.bottomContainer}>
        <Pressable>
          <ThemedView backgroundColor="primary800" style={styles.button}>
            <Feather name="share-2" size={moderateScale(24)} color="white" />
            <ThemedText variant="titleSmallEmphasized" color="white">
              Share QR Code
            </ThemedText>
          </ThemedView>
        </Pressable>
        <ThemedText variant="bodySmall" color="gray600">
          The shared QR Code is only valid 30 Mins.
        </ThemedText>
      </ThemedView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    gap: moderateScale(16),
    paddingBottom: moderateScale(20),
  },
  title: {
    textAlign: 'center',
    marginTop: moderateScale(16),
  },
  qrWrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    width: SPACING.deviceWidth * 0.7,
    justifyContent: 'center',
    gap: moderateScale(20),
  },
  qrBackground: {
    backgroundColor: '#fff',
    padding: moderateScale(20),
    borderRadius: moderateScale(8),
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardBackground: {
    width: SPACING.contentWidth,
    height: moderateScale(100),
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    padding: moderateScale(16),
    flexDirection: 'row',
  },
  cardContentLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  coinIcon: {
    width: moderateScale(40),
    height: moderateScale(40),
  },
  cardContentRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  statsContainer: {
    borderRadius: moderateScale(8),
    marginHorizontal: SPACING.screenPadding,
    padding: moderateScale(12),
    overflow: 'hidden',
  },
  statsInner: {
    zIndex: 1,
  },
  statsTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
    justifyContent: 'space-between',
  },
  activePlaneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(32),
    width: moderateScale(32),
    borderRadius: moderateScale(32),
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  separatorText: {
    borderRightWidth: moderateScale(2),
    paddingRight: moderateScale(8),
  },
  divider: {
    height: moderateScale(1),
    marginVertical: moderateScale(12),
  },
  listContainer: {
    flexDirection: 'row',
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  dot: {
    height: moderateScale(4),
    width: moderateScale(4),
    borderRadius: moderateScale(4),
    marginLeft: moderateScale(8),
  },
  cornerBg: {
    width: moderateScale(150),
    height: moderateScale(150),
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 0,
  },
  bottomContainer: {
    padding: moderateScale(20),
    gap: moderateScale(12),
  },
  button: {
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(8),
  },
});

export default QRScreen;
