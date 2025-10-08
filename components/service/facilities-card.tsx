import { Box, Row, Text } from '@/core';
import { colors } from '@/theme';
import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from '../ui/icon';

interface FacilityItemProps {
  name: string;
  icon: string;
}

const FacilityItem: React.FC<FacilityItemProps> = ({ name, icon }) => (
  <Box gap={8} style={styles.facilityItem}>
    <Icon name={icon} size={32} />
    <Text style={{ textAlign: 'center' }} color="#232323" preset="POP_12_R">
      {name}
    </Text>
  </Box>
);

const FacilitiesCard = () => {
  return (
    <Box gap={16} style={styles.container}>
      <Text color="#232323" preset="POP_16_SB">
        Facilities
      </Text>
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
    backgroundColor: colors.cardBackgroundPrimary,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
