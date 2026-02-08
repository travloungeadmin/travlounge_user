import { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import Icon from '../ui/icon';

import { Box, Row, useSafeAreaInsets } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import { showError } from '@/lib/toast';
import useSleepingPodCart from '@/modules/sleeping-pod';
import { ThemedText } from '../common/ThemedText';

const PodSelectView = ({ onPress, item, index }: any) => {
  const { duration } = useSleepingPodCart();
  const { bottomHeight } = useSafeAreaInsets();
  const [selectedPod, setSelectedPod] = React.useState(item?.type || 'Single');
  const [SelectedNoOfPods, setSelectedNoOfPods] = React.useState(item?.number_of_pods || 1);
  const [is_bath, setIsBath] = React.useState(item?.is_bath || duration >= 12);
  const [is_restroom, setIsRestroom] = React.useState(item?.is_restroom || true);
  const [noOfExtraBaths, setNoOfExtraBaths] = React.useState(item?.noOfExtraBaths || 0);
  const { theme } = useTheme();

  const data = [
    { key: 'single', value: 'Single' },
    { key: 'double', value: 'Double' },
  ];

  return (
    <BottomSheetView style={styles.bottomSheetContent}>
      <ThemedText variant="headline" style={{ color: theme.primary }}>
        Select Sleeping Pod Type
      </ThemedText>
      <Box gap={10}>
        <ThemedText variant="label" color="gray600">
          Sleeping pod
        </ThemedText>
        <SelectList
          placeholder={selectedPod || 'Select'}
          search={false}
          setSelected={(val: any) => setSelectedPod(val)}
          data={data}
        />
      </Box>
      <Box gap={10}>
        <ThemedText variant="label" style={styles.label}>
          Number Of Pods
        </ThemedText>
        <Row
          style={[
            styles.counterRow,
            { backgroundColor: theme.backgroundTop, borderColor: theme.gray200 },
          ]}>
          <Pressable
            onPress={() => {
              if (SelectedNoOfPods > 1) {
                setSelectedNoOfPods(SelectedNoOfPods - 1);
              }
            }}>
            <Icon name="RoundMinus" size={20} stroke={theme.icon} />
          </Pressable>
          <ThemedText variant="bodySmall" color="gray900">
            {SelectedNoOfPods}
          </ThemedText>
          <Pressable
            onPress={() => {
              setSelectedNoOfPods(SelectedNoOfPods + 1);
            }}>
            <Icon name="RoundPlus" size={20} stroke={theme.icon} />
          </Pressable>
        </Row>
        {duration > 3 && (
          <Box style={{ marginTop: 20 }} gap={15}>
            <View style={{ gap: 10 }}>
              <ThemedText variant="label" style={styles.label}>
                Sleeping Pod with
              </ThemedText>
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
                        borderColor: theme.gray200,
                        height: 20,
                        width: 20,
                        borderRadius: 4,
                        backgroundColor: is_restroom ? theme.primary : theme.backgroundTop,
                      }}
                    />

                    <ThemedText color="gray900" variant="bodySmall">
                      Restroom
                    </ThemedText>
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
                        borderColor: theme.gray200,
                        height: 20,
                        width: 20,
                        borderRadius: 4,
                        backgroundColor: is_bath ? theme.primary : theme.backgroundTop,
                      }}
                    />

                    <ThemedText color="gray900" variant="bodySmall">
                      Bath
                    </ThemedText>
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
                    backgroundColor: theme.primary50,
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
                    <ThemedText variant="bodySmallEmphasized" style={{ color: theme.primary }}>
                      Add Extra Bath
                    </ThemedText>
                    {noOfExtraBaths > 1 && (
                      <Pressable
                        onPress={() => {
                          setNoOfExtraBaths(1);
                        }}
                        style={{ backgroundColor: theme.white, padding: 8, borderRadius: 8 }}>
                        <Icon name="Delete" size={24} stroke={theme.error} />
                      </Pressable>
                    )}
                  </View>
                  {noOfExtraBaths > 1 && (
                    <>
                      <ThemedText
                        variant="label"
                        style={[
                          styles.label,
                          {
                            marginBottom: 10,
                          },
                        ]}>
                        Select Number of Bath
                      </ThemedText>
                      <Row
                        style={[
                          styles.counterRow,
                          { backgroundColor: theme.backgroundTop, borderColor: theme.gray200 },
                        ]}>
                        <Pressable
                          onPress={() => {
                            if (noOfExtraBaths > 2) {
                              setNoOfExtraBaths((prev: number) => prev - 1);
                            }
                          }}>
                          <Icon name="RoundMinus" size={20} stroke={theme.gray900} />
                        </Pressable>
                        <ThemedText variant="bodySmall" color="gray900">
                          {noOfExtraBaths - 1}
                        </ThemedText>
                        <Pressable
                          onPress={() => {
                            setNoOfExtraBaths((prev: any) => prev + 1);
                          }}>
                          <Icon name="RoundPlus" size={20} stroke={theme.gray900} />
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
          backgroundColor: theme.primary,
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
        <ThemedText variant="bodySmallEmphasized" color="white">
          Done
        </ThemedText>
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
  podTypeText: {},
  label: {
    color: 'rgba(34, 49, 63, 0.8)',
  },
  counterRow: {
    gap: 10,
    alignItems: 'center',
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'space-between',
  },
  counterText: {},
});
