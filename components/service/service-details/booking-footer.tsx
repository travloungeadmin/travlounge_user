import { format } from 'date-fns';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/common/ThemedText';
import { Box, Row } from '@/core';
import { useTheme } from '@/hooks/useTheme';

interface BookingFooterProps {
  isUnavailable?: boolean;
  date?: string;
  noOfPods?: number;
  price?: number;
  bottomHeight: number;
  onBook: () => void;
}

export const BookingFooter: React.FC<BookingFooterProps> = ({
  isUnavailable,
  date,
  noOfPods,
  price,
  bottomHeight,
  onBook,
}) => {
  const { theme } = useTheme();

  return (
    <Row
      style={[
        {
          paddingBottom: bottomHeight || 20,
          backgroundColor: isUnavailable ? 'rgba(255, 190, 157, 1)' : theme.backgroundCard,
        },
        styles.container,
      ]}>
      {isUnavailable ? (
        <ThemedText style={styles.unavailable} variant="bodySmallEmphasized" color="gray800">
          {!price
            ? 'Please select a date and pod for booking'
            : 'This sleeping Pod is not available on this date'}
        </ThemedText>
      ) : (
        <Box gap={8}>
          <ThemedText variant="headline" color="gray800">
            ₹ {price}
          </ThemedText>
          <ThemedText variant="bodySmall" color="gray800">
            {noOfPods} Pods - {date && format(new Date(date), 'dd/MM/yyyy')}
          </ThemedText>
        </Box>
      )}
      {price ? (
        <Pressable
          disabled={!price}
          onPress={onBook}
          style={[
            {
              backgroundColor: !price || isUnavailable ? 'rgba(143, 37, 37, 1)' : theme.primary,
            },
            styles.button,
          ]}>
          <ThemedText variant="bodyEmphasized" color="white">
            {isUnavailable ? 'Rearrange' : 'Book Now'}
          </ThemedText>
        </Pressable>
      ) : null}
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,

    alignItems: 'center',
    justifyContent: 'space-between',
  },
  unavailable: { flex: 1, marginRight: 20 },
  button: {
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
