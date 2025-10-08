import React from 'react';
import { StyleSheet } from 'react-native';

import { Box, Row, Text } from '@/core';

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
  };
  isGst?: boolean;
};

const PriceDistribution = (props: propsType) => {
  const { priceData, isGst } = props;

  return (
    <Box gap={8}>
      {priceData?.available_pods.map((item, index) => (
        <Row key={index} style={styles.row}>
          <Text color="#333333" preset="POP_14_R">
            {item.pod_type}
          </Text>
          <Text color="#333333" preset="POP_14_R">
            {item.price} X {item.number_of_pods} = {item.price * item.number_of_pods}
          </Text>
        </Row>
      ))}
      {priceData?.discount_amount > 0 ? (
        <Row style={styles.row}>
          <Text color="#333333" preset="POP_14_R">
            Discount
          </Text>
          <Text color="#333333" preset="POP_14_R">
            -{priceData?.discount_percentage}% = -{priceData?.discount_amount}
          </Text>
        </Row>
      ) : null}
      {isGst && (
        <Row style={styles.row}>
          <Text color="#333333" preset="POP_14_R">
            Gst
          </Text>
          <Text color="#333333" preset="POP_14_R">
            {priceData?.tax_rate * 100}% ={priceData?.tax}
          </Text>
        </Row>
      )}
      {priceData?.add_ons?.length > 0 &&
        priceData?.add_ons?.map((item) => (
          <Row style={styles.row}>
            <Text color="#333333" preset="POP_14_R">
              {item?.quantity} Add On Bath
            </Text>
            <Text color="#333333" preset="POP_14_R">
              {item?.price_per_unit}X{item?.quantity} ={item?.total_price}
            </Text>
          </Row>
        ))}

      <Row style={[styles.row, styles.totalRow]}>
        <Text color="#333333" preset="POP_16_SB">
          Total
        </Text>
        <Text color="#333333" preset="POP_16_SB">
          {isGst ? priceData?.payable_amount : priceData?.subtotal}
        </Text>
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
