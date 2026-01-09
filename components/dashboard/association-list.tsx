import React from 'react';
import { ImageStyle, Pressable, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';

import { shadow } from '@/constants';

import { useTheme } from '@/hooks/useTheme';
import { Image } from '@/lib/Image';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { AssociationBanner } from '@/services/api/types/home';
import { handleBannerNavigation } from '@/utils/banners';
import { useRouter } from 'expo-router';
import { ThemedText } from '../common/ThemedText';

const AssociationList: React.FC<{ data: AssociationBanner[]; title?: string | null }> = ({
  data,
  title = 'View our offering',
}) => {
  const router = useRouter();
  const { theme } = useTheme();

  if (!data?.length) return null;

  return (
    <View>
      {title && (
        <ThemedText
          style={{ paddingLeft: SPACING.screenPadding, marginBottom: SPACING.screenPadding }}
          color="gray900"
          variant="titleEmphasized">
          {title}
        </ThemedText>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={{
            gap: SPACING.screenPadding,
            flexDirection: 'row',
            paddingHorizontal: SPACING.screenPadding,
            paddingBottom: SPACING.screenPadding,
          }}>
          {data?.map((item, index) => {
            return (
              <Pressable
                onPress={() => handleBannerNavigation(item)}
                key={index}
                style={[shadow, styles.shadowView, { backgroundColor: theme.backgroundCard }]}>
                <Image contentFit="cover" source={{ uri: item.image }} style={[styles.image]} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default AssociationList;

const styles = StyleSheet.create({
  shadowView: {
    marginBottom: moderateScale(30),
    width: SPACING.deviceWidth * 0.78,
    height: SPACING.deviceWidth * 0.78 * 0.5,
    borderRadius: moderateScale(10),
  } as ViewStyle,
  image: {
    borderRadius: moderateScale(10),
    width: '100%',
    height: '100%',
  } as ImageStyle,
});
