import { Box, Row } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '../common/ThemedText';
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
  const { theme } = useTheme();

  return (
    <Box style={{ flex: 1 }} gap={8}>
      <ThemedText variant="label" color="gray600" style={styles.label}>
        {header}
      </ThemedText>
      <Pressable onPress={onPress}>
        <Row
          style={[
            styles.row,
            { backgroundColor: theme.backgroundTop, borderColor: theme.gray200 },
          ]}>
          <Icon name={icon as any} size={20} stroke={theme.primary} />
          <ThemedText variant="bodySmall" color="gray900" style={styles.text}>
            {value}
          </ThemedText>
        </Row>
        {enableDrop && <Icon name="ArrowDown" size={15} />}
      </Pressable>
    </Box>
  );
};

export default SelectionCard;

const styles = StyleSheet.create({
  label: {},
  row: {
    gap: 10,
    alignItems: 'center',
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  text: {},
});
