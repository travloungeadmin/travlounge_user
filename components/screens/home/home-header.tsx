import HomeIcon from '@/assets/svgs/headerLogo.svg';
import { ThemedText } from '@/components/common/ThemedText';
import { useLocation, useTheme } from '@/hooks';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { useRouter } from 'expo-router';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DropdownMenu from 'zeego/dropdown-menu';

const HomeHeader = ({
  disableLocation = false,
  disableMenu = false,
}: {
  disableLocation?: boolean;
  disableMenu?: boolean;
}) => {
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
                size={moderateScale(20)}
                color={theme.primary}
              />
              <ThemedText
                style={{
                  flexShrink: 1,
                  maxWidth: SPACING.contentWidth - moderateScale(190),
                }}
                numberOfLines={1}
                color="gray900"
                variant="titleSmallEmphasized">
                {(Platform.OS === 'ios' ? place?.name : place?.city) || 'Unknown Location'}
              </ThemedText>
            </TouchableOpacity>
          )}

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
    justifyContent: 'center',
  },
  menuButton: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(6),
  },
});
