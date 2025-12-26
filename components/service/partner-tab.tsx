import { useTheme } from '@/hooks/useTheme';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import useServiceStore from '@/store/service';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '../common/ThemedText';
import Icon from '../ui/icon';

const PartnerTab = ({
  isPartner,
  onPressAllCafes,
  onPressPartner,
}: {
  isPartner: boolean;
  onPressAllCafes: () => void;
  onPressPartner: () => void;
}) => {
  const { id } = useLocalSearchParams();
  const { services } = useServiceStore();
  const { theme } = useTheme();
  const serviceName = services.find((item) => item.id === Number(id))?.title;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.gray200,
          borderColor: theme.gray300,
        },
      ]}>
      <Pressable
        onPress={onPressAllCafes}
        style={[
          styles.tab,
          {
            backgroundColor: isPartner ? 'transparent' : theme.backgroundPrimary,
          },
        ]}>
        <ThemedText
          variant={isPartner ? 'label' : 'labelEmphasized'}
          color={isPartner ? 'gray700' : 'primary'}>
          All {serviceName}s
        </ThemedText>
      </Pressable>
      <Pressable
        onPress={onPressPartner}
        style={[
          styles.tab,
          {
            backgroundColor: isPartner ? theme.backgroundPrimary : 'transparent',
          },
        ]}>
        <View style={styles.partnerContent}>
          <Icon name="PartnerIcon" />

          <ThemedText
            color={isPartner ? 'primary' : 'gray700'}
            variant={isPartner ? 'labelEmphasized' : 'label'}>
            Travlounge Partner
          </ThemedText>
        </View>
      </Pressable>
    </View>
  );
};

export default PartnerTab;

const styles = StyleSheet.create({
  container: {
    margin: SPACING.screenPadding,
    borderWidth: 1,
    height: moderateScale(46),
    borderRadius: 12,
    padding: moderateScale(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    borderRadius: moderateScale(8),
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(8),
  },
});
