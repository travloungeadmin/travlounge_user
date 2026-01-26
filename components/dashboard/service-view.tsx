import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { shadow } from '@/constants';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { useTheme } from '@/newTheme';
import useServiceStore from '@/store/service';
import { useRouter } from 'expo-router';
import { ThemedText } from '../common/ThemedText';
import Icon, { IconName } from '../ui/icon';

const ServiceView = () => {
  const { services } = useServiceStore();
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View>
      <ThemedText
        style={{
          paddingLeft: SPACING.screenPadding,
          marginBottom: SPACING.screenPadding,
        }}
        color="gray900"
        variant="titleEmphasized">
        Our Services
      </ThemedText>

      <View style={styles.container}>
        {services?.map((service) => {
          return (
            <Pressable
              style={[
                styles.shadowView,
                shadow,
                {
                  width: Math.floor((SPACING.contentWidth - 2 * SPACING.screenPadding) / 3) - 1,
                  height: moderateScale(140),
                  backgroundColor: theme.backgroundCard,
                },
              ]}
              key={service.id}
              onPress={() =>
                router.push({
                  pathname: `/listings/[id]`,
                  params: { id: service?.id ?? '999', name: service.title },
                })
              }>
              <Icon
                size={
                  Platform.OS === 'ios'
                    ? service.icon === 'Toloo'
                      ? moderateScale(50)
                      : moderateScale(40)
                    : service.icon === 'Toloo'
                      ? moderateScale(55)
                      : moderateScale(45)
                }
                name={service.icon as IconName}
              />
              <ThemedText style={{ textAlign: 'center' }} variant="label" color="gray900">
                {service.title}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default ServiceView;

const styles = StyleSheet.create({
  container: {
    rowGap: SPACING.screenPadding,
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.screenPadding,
    gap: Math.floor(SPACING.screenPadding),
    alignContent: 'center',
    paddingBottom: SPACING.screenPadding,
  },
  shadowView: {
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(10),
  },
});
