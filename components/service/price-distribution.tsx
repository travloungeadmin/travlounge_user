import React from 'react';
import { StyleSheet } from 'react-native';

import { Box, Row } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import { ThemedText } from '../common/ThemedText';

type propsType = {
  priceData: {
    available_pods: {
      pod_type: string;
      price: number;
      number_of_pods: number;
    }[];
    tax_rate: number;
    tax: number;
    total_price: number;
    total_base_price: number;
    discount_amount?: number;
    discount_percentage?: number;
    add_ons?: {
      quantity: number;
      price_per_unit: number;
      total_price: number;
    }[];
    payable_amount?: number;
    subtotal?: number;
  };
  isGst?: boolean;
};

const PriceDistribution = (props: propsType) => {
  const { priceData, isGst } = props;
  const { theme } = useTheme();

  return (
    <Box gap={8}>
      {priceData?.available_pods.map((item, index) => (
        <Row key={index} style={styles.row}>
          <ThemedText color="gray900" variant="bodySmall">
            {item.pod_type}
          </ThemedText>
          <ThemedText color="gray900" variant="bodySmall">
            {item.price} X {item.number_of_pods} = {item.price * item.number_of_pods}
          </ThemedText>
        </Row>
      ))}
      {(priceData?.discount_amount ?? 0) > 0 ? (
        <Row style={styles.row}>
          <ThemedText color="gray900" variant="bodySmall">
            Discount
          </ThemedText>
          <ThemedText color="gray900" variant="bodySmall">
            -{priceData?.discount_percentage}% = -{priceData?.discount_amount}
          </ThemedText>
        </Row>
      ) : null}
      {isGst && (
        <Row style={styles.row}>
          <ThemedText color="gray900" variant="bodySmall">
            Gst
          </ThemedText>
          <ThemedText color="gray900" variant="bodySmall">
            {priceData?.tax_rate * 100}% ={priceData?.tax}
          </ThemedText>
        </Row>
      )}
      {(priceData?.add_ons?.length ?? 0) > 0 &&
        priceData?.add_ons?.map((item) => (
          <Row key={item.quantity /* or other unique key if available */} style={styles.row}>
            <ThemedText color="gray900" variant="bodySmall">
              {item?.quantity} Add On Bath
            </ThemedText>
            <ThemedText color="gray900" variant="bodySmall">
              {item?.price_per_unit}X{item?.quantity} ={item?.total_price}
            </ThemedText>
          </Row>
        ))}

      <Row style={[styles.row, styles.totalRow]}>
        <ThemedText color="gray900" variant="bodySmallEmphasized">
          Total
        </ThemedText>
        <ThemedText color="gray900" variant="bodySmallEmphasized">
          {isGst ? priceData?.payable_amount : priceData?.subtotal}
        </ThemedText>
      </Row>
    </Box>
  );
};

export default PriceDistribution;

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
  },
  totalRow: {
    marginTop: 10,
  },
});
