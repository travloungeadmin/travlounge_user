import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';
import { useTheme } from '@/hooks';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const AddPointsBanner = () => {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={() => {
        router.push('/elite-card/add-points');
      }}>
      <LinearGradient
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradient}
        colors={[theme.primary700, theme.primary500, theme.primary500, theme.primary700]}>
        <View style={styles.topRow}>
          <View style={styles.iconTextWrapper}>
            <Image
              source={require('@/assets/images/elite-card/elite-coin.png')}
              style={styles.coinIcon}
            />
            <View>
              <ThemedText variant="bodyEmphasized" color="white">
                Travlounge
              </ThemedText>
              <ThemedText variant="titleEmphasized" color="white">
                Elite card
              </ThemedText>
            </View>
          </View>
          <ThemedView style={styles.addButton} backgroundColor="secondary">
            <ThemedText variant="titleEmphasized" color="primary">
              Add Points
            </ThemedText>
            <Feather name="plus-circle" size={moderateScale(20)} color={theme.primary} />
          </ThemedView>
        </View>
        <ThemedText color="white" variant="titleEmphasized">
          No points left,{' '}
          <ThemedText color="white" variant="bodyEmphasized">
            load up, eat well & earn back
          </ThemedText>
        </ThemedText>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  gradient: {
    marginHorizontal: SPACING.screenPadding,
    padding: moderateScale(12),
    borderRadius: moderateScale(12),
    gap: moderateScale(8),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  iconTextWrapper: {
    gap: moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinIcon: {
    width: moderateScale(40),
    height: moderateScale(40),
  },
  addButton: {
    flexDirection: 'row',
    gap: moderateScale(4),
    height: moderateScale(36),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(18),
    paddingHorizontal: moderateScale(12),
  },
});

export default AddPointsBanner;
