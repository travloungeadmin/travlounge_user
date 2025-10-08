import { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import Icon from '../ui/icon';

import { Box, Row, Text, useSafeAreaInsets } from '@/core';
import { showError } from '@/lib/toast';
import useSleepingPodCart from '@/modules/sleeping-pod';

const PodSelectView = ({ onPress, item, index }) => {
  const { duration } = useSleepingPodCart();
  const { bottomHeight } = useSafeAreaInsets();
  const [selectedPod, setSelectedPod] = React.useState(item?.type || 'Single');
  const [SelectedNoOfPods, setSelectedNoOfPods] = React.useState(item?.number_of_pods || 1);
  const [is_bath, setIsBath] = React.useState(item?.is_bath || duration >= 12);
  const [is_restroom, setIsRestroom] = React.useState(item?.is_restroom || true);
  const [noOfExtraBaths, setNoOfExtraBaths] = React.useState(item?.noOfExtraBaths || 0);

  const data = [
    { key: 'single', value: 'Single' },
    { key: 'double', value: 'Double' },
  ];

  return (
    <BottomSheetView style={styles.bottomSheetContent}>
      <Text style={styles.bottomSheetTitle}>Select Sleeping Pod Type</Text>
      <Box gap={10}>
        <Text preset="POP_12_M" color="rgba(34, 49, 63, 0.8)">
          Sleeping pod
        </Text>
        <SelectList
          placeholder={selectedPod || 'Select'}
          search={false}
          setSelected={(val) => setSelectedPod(val)}
          data={data}
        />
      </Box>
      <Box gap={10}>
        <Text preset="POP_12_M" style={[styles.label]}>
          Number Of Pods
        </Text>
        <Row style={styles.counterRow}>
          <Pressable
            onPress={() => {
              if (SelectedNoOfPods > 1) {
                setSelectedNoOfPods(SelectedNoOfPods - 1);
              }
            }}>
            <Icon name="RoundMinus" size={20} />
          </Pressable>
          <Text preset="POP_14_M" style={styles.counterText}>
            {SelectedNoOfPods}
          </Text>
          <Pressable
            onPress={() => {
              setSelectedNoOfPods(SelectedNoOfPods + 1);
            }}>
            <Icon name="RoundPlus" size={20} />
          </Pressable>
        </Row>
        {duration > 3 && (
          <Box style={{ marginTop: 20 }} gap={15}>
            <View style={{ gap: 10 }}>
              <Text preset="POP_12_M" style={styles.label}>
                Sleeping Pod with
              </Text>
              <Row style={{ justifyContent: 'space-between' }}>
                <Pressable
                  disabled
                  onPress={() => {
                    setIsRestroom(!is_restroom);
                  }}
                  style={{ flex: 1 }}>
                  <Row style={{ alignItems: 'center' }} gap={10}>
                    <Box
                      style={{
                        borderWidth: 1,
                        borderColor: 'rgba(230, 232, 233, 1)',
                        height: 20,
                        width: 20,
                        borderRadius: 4,
                        backgroundColor: is_restroom
                          ? 'rgba(37, 61, 143, 1)'
                          : 'rgba(245, 246, 246, 1)',
                      }}
                    />

                    <Text color="rgba(34, 49, 63, 1)" preset="POP_14_M">
                      Restroom
                    </Text>
                  </Row>
                </Pressable>
                <Pressable
                  disabled={duration >= 12}
                  onPress={() => {
                    setIsBath(!is_bath);
                    if (is_bath) {
                      setNoOfExtraBaths(0);
                    } else {
                      setNoOfExtraBaths(1);
                    }
                  }}
                  style={{ flex: 1 }}>
                  <Row style={{ alignItems: 'center' }} gap={10}>
                    <Box
                      style={{
                        borderWidth: 1,
                        borderColor: 'rgba(230, 232, 233, 1)',
                        height: 20,
                        width: 20,
                        borderRadius: 4,
                        backgroundColor: is_bath
                          ? 'rgba(37, 61, 143, 1)'
                          : 'rgba(245, 246, 246, 1)',
                      }}
                    />

                    <Text color="rgba(34, 49, 63, 1)" preset="POP_14_M">
                      Bath
                    </Text>
                  </Row>
                </Pressable>
              </Row>
            </View>
            {is_bath ? (
              <Pressable
                disabled={noOfExtraBaths > 1}
                onPress={() => {
                  setNoOfExtraBaths(2);
                }}
                style={{ marginTop: 10 }}>
                <View
                  style={{
                    backgroundColor: '#EBF1F5',
                    borderRadius: 8,
                    justifyContent: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text preset="POP_16_SB" style={{ color: 'rgba(37, 61, 143, 1)' }}>
                      Add Extra Bath
                    </Text>
                    {noOfExtraBaths > 1 && (
                      <Pressable
                        onPress={() => {
                          setNoOfExtraBaths(1);
                        }}
                        style={{ backgroundColor: '#FFFFFF', padding: 8, borderRadius: 8 }}>
                        <Icon name="Delete" size={24} />
                      </Pressable>
                    )}
                  </View>
                  {noOfExtraBaths > 1 && (
                    <>
                      <Text
                        preset="POP_12_M"
                        style={[
                          styles.label,
                          {
                            marginBottom: 10,
                          },
                        ]}>
                        Select Number of Bath
                      </Text>
                      <Row style={styles.counterRow}>
                        <Pressable
                          onPress={() => {
                            if (noOfExtraBaths > 2) {
                              setNoOfExtraBaths((prev) => prev - 1);
                            }
                          }}>
                          <Icon name="RoundMinus" size={20} />
                        </Pressable>
                        <Text preset="POP_14_M" style={styles.counterText}>
                          {noOfExtraBaths - 1}
                        </Text>
                        <Pressable
                          onPress={() => {
                            setNoOfExtraBaths((prev) => prev + 1);
                          }}>
                          <Icon name="RoundPlus" size={20} />
                        </Pressable>
                      </Row>
                    </>
                  )}
                </View>
              </Pressable>
            ) : null}
          </Box>
        )}
      </Box>

      <Pressable
        // disabled={!selectedPod || !SelectedNoOfPods}
        style={{
          marginBottom: bottomHeight,
          backgroundColor: '#253D8F',
          borderRadius: 24,
          height: 45,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}
        onPress={() => {
          if (!selectedPod) {
            showError('Whoops!', 'Kindly select a pod type in order to proceed.');
            return;
          }
          if (SelectedNoOfPods < 1) {
            showError('Error', 'Number of pods must be at least 1.');
            return;
          }

          if (selectedPod === 'double') {
            Alert.alert(
              'Couples Not Allowed',
              'Kindly note that couples are not allowed to take booking',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    onPress({
                      type: selectedPod,
                      number_of_pods: SelectedNoOfPods,
                      isBath: is_bath,
                      isRestroom: is_restroom,
                      noOfExtraBaths,
                    });
                  },
                },
              ]
            );
          } else {
            onPress({
              type: selectedPod,
              number_of_pods: SelectedNoOfPods,
              isBath: is_bath,
              isRestroom: is_restroom,
              noOfExtraBaths,
            });
          }
        }}>
        <Text preset="POP_16_M" color="#fff">
          Done
        </Text>
      </Pressable>
    </BottomSheetView>
  );
};

export default PodSelectView;

const styles = StyleSheet.create({
  bottomSheetContent: {
    padding: 16,
    paddingBottom: 20,
    gap: 30,
  },
  bottomSheetTitle: {
    color: '#253D8F',
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '600',
  },
  podTypeRow: {
    justifyContent: 'space-evenly',
  },
  podTypeButton: {
    alignItems: 'center',
    gap: 8,
  },
  podTypeText: {
    color: '#253D8F',
  },
  label: {
    color: 'rgba(34, 49, 63, 0.8)',
  },
  counterRow: {
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#F5F6F6',
    borderWidth: 1,
    borderColor: '#E6E8E9',
    height: 45,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'space-between',
  },
  counterText: {
    color: '#22313F',
  },
});
