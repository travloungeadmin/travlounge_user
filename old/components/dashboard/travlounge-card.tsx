import { useTheme } from '@/old/lib/theme';
import React from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import Icon from '../ui/icon';

import { Box, Text } from '@/core';
import { shadow } from '@/old/constants';
import { router } from 'expo-router';

const TravloungeCard = () => {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={() => router.navigate('/(main)/old/travlounge/home')}
      style={[
        styles.shadowView,
        shadow,
        {
          backgroundColor: theme.backgroundTeritary,
          shadowColor: theme.backgroundTeritary,
        },
      ]}>
      <Box style={[styles.outerCircle, { backgroundColor: theme.iconBackgroundTeritary }]}>
        <Box style={[styles.middleCircle, { backgroundColor: theme.iconBackgroundSecondary }]}>
          <Box style={[styles.innerCircle, { backgroundColor: theme.iconBackgroundPrimary }]}>
            <Icon size={51} name="TravloungeIcon" />
          </Box>
        </Box>
      </Box>
      <Box style={styles.textContainer}>
        <Text preset="POP_16_M" color={theme.TextTeritary}>
          Travlounge
        </Text>
        <Text preset="POP_12_R" color={theme.TextTeritary}>
          explore all travlounge
        </Text>
      </Box>
      <Box style={styles.iconContainer}>
        <Icon stroke={theme.IconSecondary} size={24} name="ArrowRight" />
      </Box>
    </Pressable>
  );
};

export default TravloungeCard;

const styles = StyleSheet.create({
  shadowView: {
    marginHorizontal: 16,
    paddingRight: 16,
    height: 76,
    borderRadius: 8,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  outerCircle: {
    borderRadius: 120,
    height: 150,
    width: 150,
    marginLeft: -35,
    marginTop: -30,
  },
  middleCircle: {
    borderRadius: 90,
    height: 120,
    width: 120,
    marginTop: 10,
    marginLeft: 20,
  },
  innerCircle: {
    borderRadius: 76,
    height: 76,
    width: 76,
    marginLeft: 35,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    gap: Platform.OS === 'ios' ? 5 : 0,
    justifyContent: 'center',
    marginLeft: 16,
    flex: 1,
  },
  iconContainer: {
    justifyContent: 'center',
  },
});
