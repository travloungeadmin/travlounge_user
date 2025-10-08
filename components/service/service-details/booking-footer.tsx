import { format } from 'date-fns';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { Box, Row, Text } from '@/core';
import { colors } from '@/theme';

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
  return (
    <Row
      style={[
        {
          paddingBottom: bottomHeight || 20,
          backgroundColor: isUnavailable ? 'rgba(255, 190, 157, 1)' : colors.cardBackgroundPrimary,
        },
        styles.container,
      ]}>
      {isUnavailable ? (
        <Text style={styles.unavailable} preset="POP_14_SB" color="#333333">
          {!price
            ? 'Please select a date and pod for booking'
            : 'This sleeping Pod is not available on this date'}
        </Text>
      ) : (
        <Box gap={8}>
          <Text preset="POP_18_SB" color="#333333">
            ₹ {price}
          </Text>
          <Text preset="POP_14_R" color="#333333">
            {noOfPods} Pods - {date && format(new Date(date), 'dd/MM/yyyy')}
          </Text>
        </Box>
      )}
      {price ? (
        <Pressable
          disabled={!price}
          onPress={onBook}
          style={[
            {
              backgroundColor: !price || isUnavailable ? 'rgba(143, 37, 37, 1)' : '#253D8F',
            },
            styles.button,
          ]}>
          <Text preset="POP_16_SB" color="#FFF">
            {isUnavailable ? 'Rearrange' : 'Book Now'}
          </Text>
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
