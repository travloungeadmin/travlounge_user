import HomeIcon from '@/assets/svgs/headerLogo.svg';
import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';
import { useLocation, useTheme } from '@/hooks';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { getHomeListQuery } from '@/services/query/home';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';

import { useRouter } from 'expo-router';
import { Platform, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DropdownMenu from 'zeego/dropdown-menu';

const HomeHeader = ({
  disableLocation = false,
  disableMenu = false,
}: {
  disableLocation?: boolean;
  disableMenu?: boolean;
}) => {
  const { data } = getHomeListQuery();
  const eliteCoins = data?.user_details?.elite_coin_balance;

  const { theme } = useTheme();
  const { place } = useLocation();
  const router = useRouter();

  return (
    <SafeAreaView style={{ backgroundColor: theme.backgroundPrimary }} edges={['top']}>
      <View
        style={[
          styles.container,
          {
            borderBottomColor: theme.gray200,
            backgroundColor: theme.backgroundPrimary,
          },
        ]}>
        <HomeIcon height={moderateScale(30)} />

        <View style={styles.rightContainer}>
          <Pressable
            onPress={() => router.push('/elite-card/wallet')}
            style={{
              height: moderateScale(40),
              flexDirection: 'row',
              gap: moderateScale(4),
              paddingHorizontal: moderateScale(12),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.white,
              borderRadius: moderateScale(20),
            }}>
            <Image
              source={require('@/assets/images/elite-card/elite-coin.png')}
              style={{ width: moderateScale(24), height: moderateScale(24) }}
            />
            <ThemedText color="gray900" variant="titleEmphasized">
              {eliteCoins}
            </ThemedText>
          </Pressable>
          {!disableMenu && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <TouchableOpacity style={styles.menuButton}>
                  <MaterialCommunityIcons
                    name="dots-horizontal"
                    size={moderateScale(24)}
                    color={theme.primary}
                  />
                </TouchableOpacity>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item key="wallet" onSelect={() => router.push('/elite-card/wallet')}>
                  <DropdownMenu.ItemTitle>Wallet</DropdownMenu.ItemTitle>
                  <DropdownMenu.ItemIcon ios={{ name: 'creditcard' }} />
                </DropdownMenu.Item>
                <DropdownMenu.Item key="profile" onSelect={() => router.push('/profile')}>
                  <DropdownMenu.ItemTitle>Profile</DropdownMenu.ItemTitle>
                  <DropdownMenu.ItemIcon ios={{ name: 'person' }} />
                </DropdownMenu.Item>
                <DropdownMenu.Item key="history" onSelect={() => router.push('/booking-history')}>
                  <DropdownMenu.ItemTitle>History</DropdownMenu.ItemTitle>
                  <DropdownMenu.ItemIcon ios={{ name: 'clock' }} />
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
        </View>
      </View>
      <ThemedView
        backgroundColor="primary200"
        style={{
          marginBottom: moderateScale(4),
          height: moderateScale(28),
          justifyContent: 'center',
          marginHorizontal: moderateScale(12),
          borderRadius: moderateScale(8),
        }}>
        {!disableLocation && (
          <TouchableOpacity
            onPress={() => router.push('/search-location')}
            style={styles.locationButton}>
            <MaterialIcons
              name={
                (Platform.OS === 'ios' ? place?.name : place?.city)
                  ? 'location-pin'
                  : 'wrong-location'
              }
              size={moderateScale(16)}
              color={theme.gray900}
            />
            <ThemedText
              style={{
                flexShrink: 1,
                maxWidth: SPACING.contentWidth - moderateScale(32),
              }}
              numberOfLines={1}
              color="gray900"
              variant="titleSmallEmphasized">
              {(Platform.OS === 'ios' ? place?.name : place?.city) || 'Unknown Location'},
              <ThemedText color="gray900" variant="body">
                {place?.city + ',' + place?.region}
              </ThemedText>
            </ThemedText>
          </TouchableOpacity>
        )}
      </ThemedView>
    </SafeAreaView>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    height: moderateScale(56),
    paddingHorizontal: SPACING.screenPadding,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rightContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(4),
    paddingHorizontal: moderateScale(6),
    height: '100%',
    // justifyContent: 'center',
  },
  menuButton: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(6),
  },
});
