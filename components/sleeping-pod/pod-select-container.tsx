import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import Icon from '../ui/icon';
import PodSelectView from './pod-selection-view';
import SelectionCard from './selection-card';

import { Box, Row, Text } from '@/core';
import BottomSheet from '@/core/bottom-sheet';
import useSleepingPodCart from '@/modules/sleeping-pod';
import { colors } from '@/theme';
import { capitalizeFirstLetter } from '@/utils/string';

interface PodSelection {
  type: string | null;
  number_of_pods: number;
  is_bath: boolean;
  is_restroom: boolean;
  noOfExtraBaths: number;
}

interface PodSelectionHandlerProps {
  type: string;
  number_of_pods: number;
  isBath: boolean;
  isRestroom: boolean;
  noOfExtraBaths: number;
}

const PodSelectContainer = () => {
  const { list_of_pods, updatePods } = useSleepingPodCart();
  const podTypeRef = React.useRef<BottomSheetModal>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  const handlePod = ({
    type,
    number_of_pods,
    isBath,
    isRestroom,
    noOfExtraBaths,
  }: PodSelectionHandlerProps) => {
    if (list_of_pods?.length === selectedIndex) {
      const newPod: PodSelection = {
        type,
        number_of_pods,
        is_bath: isBath,
        is_restroom: isRestroom,
        noOfExtraBaths,
      };
      updatePods([...list_of_pods, newPod]);
    } else {
      const updatedPods = list_of_pods.map((item, i) => {
        if (i === selectedIndex) {
          return {
            type,
            number_of_pods,
            is_bath: isBath,
            is_restroom: isRestroom,
            noOfExtraBaths,
          };
        }
        return item;
      });
      updatePods(updatedPods);
    }

    podTypeRef.current?.dismiss();
  };

  const handleAddNewPod = () => {
    setSelectedIndex(list_of_pods.length);
    podTypeRef.current?.present();
    // const newPod: PodSelection = {
    //   type: null,
    //   number_of_pods: 1,
    //   is_bath: false,
    //   is_restroom: false,
    // };
    // updatePods([...list_of_pods, newPod]);
  };

  const renderPodSelection = (item: PodSelection, index: number) => {
    const value = !(item?.number_of_pods && item?.type)
      ? 'Select type'
      : `${item?.number_of_pods}  ${capitalizeFirstLetter(item?.type)}${
          item?.is_bath ? `,${item.noOfExtraBaths} Bath` : ''
        }${item?.is_restroom ? `, Restroom` : ''}`;

    return (
      <Row key={index} gap={10}>
        <SelectionCard
          header="Sleeping Pod"
          icon="PodTypeIcon"
          value={value}
          onPress={() => {
            setSelectedIndex(index);
            podTypeRef.current?.present();
          }}
        />
        {index !== 0 && (
          <Pressable
            onPress={() => updatePods(list_of_pods.filter((_, i) => i !== index))}
            style={styles.deleteButton}>
            <Icon name="Delete" size={24} />
          </Pressable>
        )}
      </Row>
    );
  };

  return (
    <Box gap={20}>
      {list_of_pods.map(renderPodSelection)}
      <Pressable onPress={handleAddNewPod}>
        <Text preset="POP_16_SB" style={styles.addPodText}>
          Add New Pod
        </Text>
      </Pressable>
      <BottomSheet ref={podTypeRef} enableDynamicSizing>
        <PodSelectView
          index={selectedIndex}
          item={list_of_pods[selectedIndex]}
          onPress={handlePod}
        />
      </BottomSheet>
    </Box>
  );
};

export default PodSelectContainer;

const styles = StyleSheet.create({
  deleteButton: {
    alignSelf: 'flex-end',
    height: 45,
    width: 45,
    backgroundColor: colors.cardBackgroundPrimary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPodText: {
    color: colors.textSecondary,
    textAlign: 'right',
  },
});
