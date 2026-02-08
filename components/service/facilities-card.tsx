import { Box, Row } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '../common/ThemedText';
import Icon from '../ui/icon';

interface FacilityItemProps {
  name: string;
  icon: any;
}

const FacilityItem: React.FC<FacilityItemProps> = ({ name, icon }) => {
  const { theme } = useTheme();
  return (
    <Box gap={8} style={[styles.facilityItem, { backgroundColor: theme.backgroundCard }]}>
      <Icon name={icon} size={32} />
      <ThemedText style={{ textAlign: 'center' }} color="gray900" variant="label">
        {name}
      </ThemedText>
    </Box>
  );
};

const FacilitiesCard = () => {
  return (
    <Box gap={16} style={styles.container}>
      <ThemedText color="gray900" variant="bodyEmphasized">
        Facilities
      </ThemedText>
      <Row style={styles.row}>
        <FacilityItem name="Bath Towel" icon="BathTowel" />
        <FacilityItem name="Dental Kit" icon="DentalKit" />
        <FacilityItem name="Mineral Water" icon="MinaralWater" />
        <FacilityItem name="Shower Kit" icon="ShowerKit" />
      </Row>
    </Box>
  );
};

export default FacilitiesCard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  facilityItem: {
    width: '23%',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
