import Icon from '@/components/ui/icon';
import React from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';

import { shadow } from '@/constants';
import { Box, Text } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import { router } from 'expo-router';

const TravloungeCard = () => {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={() => router.navigate('/old/travlounge/home')}
      style={[
        {
          borderRadius: 8,
          marginHorizontal: 16,
          backgroundColor: theme.backgroundCard,
          shadowColor: theme.backgroundCard,
          shadowOpacity: 0.5,
        },
        shadow,
      ]}>
      <Box style={[styles.shadowView]}>
        <Box style={[styles.outerCircle, { backgroundColor: '#2A46A8' }]}>
          <Box style={[styles.middleCircle, { backgroundColor: '#3553BB' }]}>
            <Box style={[styles.innerCircle, { backgroundColor: '#385BD6' }]}>
              <Icon size={51} name="TravloungeIcon" />
            </Box>
          </Box>
        </Box>
        <Box style={styles.textContainer}>
          <Text preset="POP_16_M" color={theme.gray700}>
            Travlounge
          </Text>
          <Text preset="POP_12_R" color={theme.gray500}>
            explore all travlounge
          </Text>
        </Box>
        <Box style={styles.iconContainer}>
          <Icon stroke={theme.primary} size={24} name="ArrowRight" />
        </Box>
      </Box>
    </Pressable>
  );
};

export default TravloungeCard;

const styles = StyleSheet.create({
  shadowView: {
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
