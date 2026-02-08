import { shadow } from '@/constants';
import { Box, Device, Row, Text } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet } from 'react-native';

interface BalanceInfoProps {
  currentBalance: string;
  requiredAmount: string;
}

export const BalanceInfo: React.FC<BalanceInfoProps> = ({ currentBalance, requiredAmount }) => {
  const { theme } = useTheme();
  return (
    <Row style={[styles.container, { backgroundColor: theme.backgroundCard }, shadow]}>
      <Box gap={5}>
        <Text color="rgba(34, 49, 63, 0.8)" preset="POP_14_M">
          Current Balance
        </Text>
        <Text color="rgba(51, 51, 51, 1)" preset="POP_16_SB">
          ₹ {currentBalance}
        </Text>
      </Box>
      <Box gap={5}>
        <Text color="rgba(34, 49, 63, 0.8)" preset="POP_14_M">
          Balance Required
        </Text>
        <Text color="rgba(51, 51, 51, 1)" preset="POP_16_SB">
          ₹ {requiredAmount}
        </Text>
      </Box>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 20,
    borderRadius: 8,
    width: Device.width - 40,
    justifyContent: 'space-between',
  },
});
