import { Text } from '@/core';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Icon from '../ui/icon';

const PartnerTab = ({
  isPartner,
  onPressAllCafes,
  onPressPartner,
  service,
}: {
  isPartner: boolean;
  onPressAllCafes: () => void;
  onPressPartner: () => void;
  service: string;
}) => {
  const serviceName = (name) => {
    switch (name) {
      case 'Hygeinic Washrooms':
        return 'Hygeinic Washrooms';
      case 'Cafe':
        return 'Cafes';
      case 'Restaurant':
        return 'Restaurants';
      case 'Petrol Pump':
        return 'Petrol Pumps';
      case 'Car Wash':
        return 'Car Washes';
      case 'Travelmart':
        return 'Travelmarts';
      case 'Resort':
        return 'Resorts';
      case 'Buffet':
        return 'Buffets';
      case 'Mechanic':
        return 'Mechanics';
      case 'Sleeping Pod':
        return 'Sleeping Pods';
      default:
        return `${name}s`;
    }
  };
  return (
    <View
      style={{
        backgroundColor: 'rgba(229, 234, 240, 1)',
        margin: 16,
        borderWidth: 1,
        borderColor: 'rgba(219, 226, 234, 1)',
        height: 46,
        borderRadius: 12,
        padding: 4,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Pressable
        onPress={onPressAllCafes}
        style={{
          backgroundColor: isPartner ? 'transparent' : 'rgba(255, 255, 255, 1)',
          borderRadius: 8,
          height: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text color={isPartner ? 'rgba(51, 51, 51, 1)' : 'rgba(37, 61, 143, 1)'} preset="POP_12_M">
          All {serviceName(service)}
        </Text>
      </Pressable>
      <Pressable
        onPress={onPressPartner}
        style={{
          backgroundColor: isPartner ? 'rgba(255, 255, 255, 1)' : 'transparent',
          borderRadius: 8,
          height: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Icon name="PartnerIcon" />

          <Text
            color={isPartner ? 'rgba(37, 61, 143, 1)' : 'rgba(51, 51, 51, 1)'}
            preset={isPartner ? 'POP_12_SB' : 'POP_12_M'}>
            Travlounge Partner
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default PartnerTab;

const styles = StyleSheet.create({});
