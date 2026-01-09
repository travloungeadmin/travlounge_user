import { Ionicons, Octicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, SectionList, StyleSheet, TextInput, View } from 'react-native';

import ScreenWrapper from '@/components/common/ScreenWrapper';
import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';
import AssociationList from '@/components/dashboard/association-list';
import Icon from '@/components/ui/icon';
import { useTheme } from '@/hooks/useTheme';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { getTransactionHistoryQuery } from '@/services/query/transaction';
import { getEliteWalletDashboardQuery } from '@/services/query/wallet';
import { Image, ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const howToUseCoins = [
  {
    icon: require('@/assets/images/elite-card/load-point.png'),
    title: 'Load Points',
    description: 'Top-up your card balance instantly using any payment mode.',
  },
  {
    icon: require('@/assets/images/elite-card/pay.png'),
    title: 'Pay Easily',
    description: 'Use your points to pay at the restaurants without needing cash.',
  },
  {
    icon: require('@/assets/images/elite-card/reward.png'),
    title: 'Get Rewards',
    description: 'Receive instant reward points back into your wallet every time.',
  },
];

const Wallet = () => {
  const { theme } = useTheme();
  const { data: walletData, isLoading } = getEliteWalletDashboardQuery();
  const { data: transactionHistoryData } = getTransactionHistoryQuery();
  const [searchQuery, setSearchQuery] = useState('');

  const transactionSections =
    transactionHistoryData?.transactions_by_month?.map((month) => ({
      title: month.month,
      data: month.transactions,
    })) ?? [];

  const renderTransactionItem = ({ item }: { item: any }) => (
    <ThemedView
      backgroundColor="white"
      style={[
        styles.transactionItem,
        {
          marginHorizontal: SPACING.screenPadding,
        },
      ]}>
      <View style={[styles.transactionIcon]}>
        <Ionicons
          name={
            item.transaction_type === 'credit'
              ? 'arrow-down-circle-outline'
              : 'arrow-up-circle-outline'
          }
          size={moderateScale(24)}
          color={theme.gray800}
        />
      </View>
      <View style={styles.transactionDetails}>
        <ThemedText variant="titleSmall" color="gray900">
          {item.title}
        </ThemedText>
        <ThemedText variant="bodySmall" color="gray500" numberOfLines={1}>
          {item.location} •{item.date_display} {item.time}
        </ThemedText>
      </View>
      <ThemedText
        variant="titleSmallEmphasized"
        color={item.transaction_type === 'credit' ? 'green600' : 'gray900'}>
        {item.points > 0 ? '+' : ''}
        {item.points} Pts
      </ThemedText>
    </ThemedView>
  );

  const renderHeader = () => (
    <View>
      <ImageBackground
        source={require('@/assets/images/elite-card/card-background.png')}
        style={{
          width: SPACING.contentWidth,
          height: SPACING.contentWidth * 0.56,
          borderRadius: moderateScale(12),
          overflow: 'hidden',
          padding: moderateScale(20),
          justifyContent: 'space-between',
          marginHorizontal: SPACING.screenPadding,
          marginTop: SPACING.screenPadding,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(12),
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(8) }}>
            <Icon name="EliteCardIcon" size={moderateScale(40)} />
            <ThemedText variant="titleSmallEmphasized" color="white">
              Travlounge{`\n`}Elite card
            </ThemedText>
          </View>
          <ThemedView
            backgroundColor="white"
            style={{ padding: moderateScale(8), borderRadius: moderateScale(8) }}>
            <Ionicons name="qr-code-outline" size={moderateScale(34)} color="black" />
          </ThemedView>
        </View>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(8) }}>
            <Image
              source={require('@/assets/images/elite-card/elite-coin.png')}
              style={{
                width: moderateScale(16),
                height: moderateScale(16),
                borderRadius: moderateScale(12),
                overflow: 'hidden',
              }}
            />
            <ThemedText variant="body" color="white">
              Balance
            </ThemedText>
          </View>
          <ThemedText variant="large" color="white">
            {walletData?.coin_balance ?? 0} Pts
          </ThemedText>
          <ThemedText variant="body" color="white">
            Worth approx ₹{walletData?.coin_balance ?? 0}
          </ThemedText>
          <Pressable
            onPress={() => {
              router.push('/elite-card/add-points');
            }}
            style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <ThemedView
              backgroundColor="primary"
              style={{
                height: moderateScale(44),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: moderateScale(8),
                paddingHorizontal: moderateScale(12),
              }}>
              <ThemedText variant="titleSmallEmphasized" color="white">
                Add Points
              </ThemedText>
            </ThemedView>
          </Pressable>
        </View>
      </ImageBackground>

      <View style={{ marginTop: moderateScale(20) }}>
        <AssociationList
          data={walletData?.banners?.map((banner: any) => ({
            title: banner.service.service_name,
            image: banner.image,
            listing: {
              id: banner.service.id,
              name: banner.service.service_name,
              category: {
                id: 0,
                category_name: banner.service.service_name,
              },
            },
          }))}
          title={null}
        />
      </View>
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[theme.primary300, theme.white]}
        style={{
          marginHorizontal: SPACING.screenPadding,
          marginBottom: moderateScale(20),
          borderRadius: moderateScale(12),
          padding: moderateScale(1),
          overflow: 'hidden',
        }}>
        <LinearGradient
          start={{ x: 2, y: -1 }}
          end={{ x: 0, y: 1 }}
          colors={[theme.primary100, theme.white]}
          style={{
            borderRadius: moderateScale(11),
            padding: SPACING.screenPadding,
          }}>
          <ThemedText
            style={{ marginBottom: moderateScale(12) }}
            variant="titleEmphasized"
            color="gray900">
            How to use your Elite Food Card
          </ThemedText>
          <View style={{ gap: moderateScale(12) }}>
            {howToUseCoins.map((item, index) => (
              <View style={{ flexDirection: 'row', gap: moderateScale(8) }}>
                <Image
                  contentFit="cover"
                  source={item.icon}
                  style={{ height: moderateScale(72), width: moderateScale(72) }}
                />
                <View style={{ flex: 1 }}>
                  <ThemedText variant="titleEmphasized" color="primary">
                    {index + 1}. {item.title}
                  </ThemedText>
                  <ThemedText variant="body" color="gray800">
                    {item.description}
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>
        </LinearGradient>
      </LinearGradient>

      <ThemedView backgroundColor="white" style={styles.historySection}>
        <View style={styles.historyHeader}>
          <Octicons name="arrow-switch" size={moderateScale(20)} color={theme.gray900} />
          <ThemedText variant="titleSmallEmphasized" color="gray900">
            Transaction History
          </ThemedText>
        </View>

        <Pressable>
          <ThemedView backgroundColor="primary50" style={[styles.searchContainer]}>
            <Ionicons name="search" size={20} color={theme.gray500} />
            <TextInput
              editable={false}
              style={[styles.searchInput, { color: theme.gray900 }]}
              placeholder="Last three month"
              placeholderTextColor={theme.gray500}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Ionicons name="calendar-outline" size={20} color={theme.gray500} />
          </ThemedView>
        </Pressable>
      </ThemedView>
    </View>
  );

  return (
    <ScreenWrapper>
      <SectionList
        sections={transactionSections}
        keyExtractor={(item) => item.transaction_id}
        renderItem={renderTransactionItem}
        renderSectionHeader={({ section: { title } }) => (
          <ThemedView
            style={{
              marginHorizontal: SPACING.screenPadding,
            }}
            backgroundColor="white">
            <ThemedText variant="bodySmall" color="gray500" style={styles.monthTitle}>
              {title}
            </ThemedText>
          </ThemedView>
        )}
        SectionSeparatorComponent={() => (
          <ThemedView
            backgroundColor="white"
            style={{ height: moderateScale(12), marginHorizontal: SPACING.screenPadding }}
          />
        )}
        ItemSeparatorComponent={() => (
          <ThemedView
            backgroundColor="white"
            style={{
              height: moderateScale(12),
              marginHorizontal: SPACING.screenPadding,
              paddingHorizontal: moderateScale(12),

              justifyContent: 'center',
            }}>
            <ThemedView backgroundColor="gray200" style={{ height: StyleSheet.hairlineWidth }} />
          </ThemedView>
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={() => (
          <ThemedView
            backgroundColor="white"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: moderateScale(40),
              gap: moderateScale(12),
              marginHorizontal: SPACING.screenPadding,
            }}>
            <ThemedView
              backgroundColor="gray100"
              style={{
                padding: moderateScale(16),
                borderRadius: moderateScale(50),
              }}>
              <Ionicons name="receipt-outline" size={moderateScale(32)} color={theme.gray400} />
            </ThemedView>
            <ThemedText variant="body" color="gray500" style={{ textAlign: 'center' }}>
              No transactions found
            </ThemedText>
          </ThemedView>
        )}
        ListFooterComponent={() => (
          <ThemedView
            backgroundColor="white"
            style={{
              height: moderateScale(12),
              marginHorizontal: SPACING.screenPadding,
              borderBottomLeftRadius: moderateScale(8),
              borderBottomRightRadius: moderateScale(8),
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SPACING.screenBottom }}
        stickySectionHeadersEnabled={false}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: moderateScale(8),
    padding: moderateScale(20),
    minHeight: moderateScale(180),
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  qrIcon: {
    backgroundColor: 'white',
    padding: moderateScale(4),
    borderRadius: moderateScale(4),
  },
  balanceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: moderateScale(20),
  },
  addPointsButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(1),
    borderColor: 'rgba(255,255,255,0.4)',
  },
  historySection: {
    paddingHorizontal: moderateScale(12),
    gap: moderateScale(16),
    paddingTop: moderateScale(12),
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
    marginHorizontal: SPACING.screenPadding,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(12),
    gap: moderateScale(8),
  },
  searchInput: {
    flex: 1,
    fontSize: moderateScale(14),
  },
  monthTitle: {
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: moderateScale(12),
    marginTop: moderateScale(8),
  },
  transactionItem: {
    paddingHorizontal: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',

    gap: moderateScale(12),
  },
  transactionIcon: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionDetails: {
    flex: 1,
    gap: moderateScale(2),
  },
  monthGroup: {
    marginBottom: moderateScale(8),
  },
});

export default Wallet;
