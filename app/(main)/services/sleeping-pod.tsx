import SleepingPodBookingView from '@/components/service/sleeping-pod-booking-view';

import { Box } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import { ImageBackground } from 'expo-image';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const SleepingPod = () => {
  const { theme } = useTheme();

  return (
    <ImageBackground
      contentFit="cover"
      source={require('@/assets/images/sleeping-pod-bg.png')}
      style={styles.backgroundImage}>
      <Box style={[styles.contentContainer]}>
        <ScrollView>
          <SleepingPodBookingView isSearch />
        </ScrollView>
      </Box>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  contentBox: {
    marginTop: 200,
    // backgroundColor: colors.cardBackgroundPrimary,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
    gap: 20,
  },
  section: {
    gap: 8,
  },
  label: {
    color: 'rgba(34, 49, 63, 0.8)',
  },
  locationRow: {
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#F5F6F6',
    borderWidth: 1,
    borderColor: '#E6E8E9',
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  locationText: {
    color: '#22313F',
  },
  pickerRow: {
    justifyContent: 'space-between',
    gap: 16,
  },
  pickerContainer: {
    flex: 1,
    gap: 8,
  },
  pickerInput: {
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#F5F6F6',
    borderWidth: 1,
    borderColor: '#E6E8E9',
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  pickerText: {
    color: '#22313F',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(37, 61, 143, 0.3)',
  },
  podRow: {
    justifyContent: 'space-between',
    gap: 16,
  },
  podTypeContainer: {
    flex: 1,
    gap: 8,
  },
  podCountContainer: {
    flex: 1,
    gap: 8,
  },
  counterRow: {
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#F5F6F6',
    borderWidth: 1,
    borderColor: '#E6E8E9',
    height: 45,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'space-between',
  },
  counterText: {
    color: '#22313F',
  },
  addPodText: {
    color: '#253D8F',
    textAlign: 'right',
  },
  searchButton: {
    height: 45,
    // backgroundColor: colors.buttonBackgroundPrimary,
    borderRadius: 45 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
  },
  bottomSheetContent: {
    padding: 16,
    paddingBottom: 20,
    gap: 30,
  },
  bottomSheetTitle: {
    color: '#253D8F',
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '600',
  },
  podTypeRow: {
    justifyContent: 'space-evenly',
  },
  podTypeButton: {
    alignItems: 'center',
    gap: 8,
  },
  podTypeText: {
    color: '#253D8F',
  },
});

export default SleepingPod;
