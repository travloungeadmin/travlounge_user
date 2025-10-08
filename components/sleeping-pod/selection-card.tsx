import { Box, Row, Text } from '@/core';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Icon from '../ui/icon';

type propsType = {
  onPress: () => void;
  header: string;
  icon: string;
  value: string;
  enableDrop?: boolean;
};

const SelectionCard = (props: propsType) => {
  const { onPress, header, icon, value, enableDrop = false } = props;
  return (
    <Box style={{ flex: 1 }} gap={8}>
      <Text preset="POP_12_M" style={styles.label}>
        {header}
      </Text>
      <Pressable onPress={onPress}>
        <Row style={styles.row}>
          <Icon name={icon} size={20} stroke="#253D8F" />
          <Text preset="POP_14_M" style={styles.text}>
            {value}
          </Text>
        </Row>
        {enableDrop && <Icon name="ArrowDown" size={15} />}
      </Pressable>
    </Box>
  );
};

export default SelectionCard;

const styles = StyleSheet.create({
  label: {
    color: 'rgba(34, 49, 63, 0.8)',
  },
  row: {
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#F5F6F6',
    borderWidth: 1,
    borderColor: '#E6E8E9',
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  text: {
    color: '#22313F',
  },
});
