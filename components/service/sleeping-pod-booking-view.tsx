import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { format, formatDate, isBefore } from 'date-fns';
import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import PodSelectContainer from '../sleeping-pod/pod-select-container';
import SelectionCard from '../sleeping-pod/selection-card';
import PriceDistribution from './price-distribution';

import SingleSelectList from '@/components/bottom-sheet/single-select-list';
import { shadow } from '@/constants';
import { Box, Pressable, Row, Text, useSafeAreaInsets } from '@/core';
import BottomSheet from '@/core/bottom-sheet';
import DatePicker from '@/core/date-picker';
import { showError } from '@/lib/toast';
import useSleepingPodCart from '@/modules/sleeping-pod';
import useUserStore from '@/modules/user';
import { getSleepingPodLists } from '@/services/query/service';
import { colors } from '@/theme';
import { convertTimeTo12Hour, formatDateToDMY, revertFormattedDate } from '@/utils/string';

const durationList = [
  { id: 1, name: '3 Hours', value: 3 },
  { id: 2, name: '6 Hours', value: 6 },
  { id: 3, name: '12 Hours', value: 12 },
];

type PropsType = {
  isSearch?: boolean;
  priceData?: any;
};

const SleepingPodBookingView = (props: PropsType) => {
  const { isSearch, priceData } = props;
  const { bottomHeight } = useSafeAreaInsets();
  const { place: currentPlace, latitude, longitude } = useUserStore();
  const {
    place,
    duration,
    date,
    list_of_pods,
    time,
    updatePods,
    updateTime,
    updateDate,
    updatePlace,
    updateDuration,
  } = useSleepingPodCart();
  const { mutate, isPending } = getSleepingPodLists();

  const [isDatePickerVisible, setDatePickerVisible] = React.useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = React.useState(false);

  const podTypeRef = React.useRef<BottomSheetModal>(null);
  const durationRef = React.useRef<BottomSheetModal>(null);
  const handleSearch = () => {
    const combinedDateTime = new Date(`${date}T${time}`);
    const isPast = isBefore(combinedDateTime, new Date());
    if (isPast) {
      showError('Whoops!', 'Hmm, that doesn’t look right. Pick a valid date and time.');
      return;
    }

    if (!date) {
      showError('Error', 'Please select date');
      return;
    }
    if (!time) {
      showError('Error', 'Please select time');
      return;
    }
    if (!duration) {
      showError('Error', 'Please select duration');
      return;
    }
    if (list_of_pods.some((item) => !item.type)) {
      showError('Error', 'Please select pod type');
      return;
    }
    if (list_of_pods.some((item) => item.number_of_pods < 1)) {
      showError('Error', 'Please select number of pods');
      return;
    }
    const required_list_of_pods = list_of_pods?.map(
      ({ number_of_pods, type, is_bath, is_restroom }) => ({
        is_bath,
        is_restroom,
        number_of_pods,
        type,
      })
    );
    const mutationData = {
      latitude: place ? place.coordinates.latitude : latitude,
      longitude: place ? place.coordinates.longitude : longitude,
      date,
      time,
      duration,
      list_of_pods: required_list_of_pods,
    };
    mutate(mutationData, {
      onSuccess: (data) => {
        router.navigate({
          pathname: '/services/service',
          params: {
            name: 'Sleeping Pod',
            sleepingPodData: JSON.stringify(data.available_places),
          },
        });
      },
    });
  };

  React.useEffect(() => {
    if (!date && !time && !duration) {
      updateTime(format(new Date(), 'HH:mm:ss'));
      updateDate(formatDate(new Date(), 'yyyy-MM-dd'));
      updateDuration(durationList[0].value);
    }
  }, [date, time, duration]);

  React.useEffect(() => {
    if (!place?.name) {
      updatePlace({
        name: currentPlace as string,
        coordinates: {
          latitude: latitude as number,
          longitude: longitude as number,
        },
      });
    }
  }, []);

  const selectedDuration = durationList.find((item) => item.value === duration)?.name;
  const datePickerValue = date ? revertFormattedDate(date) : new Date();
  const timePickerValue = time ? new Date(`2025-02-25T${time}`) : new Date();
  console.log({ datePickerValue });

  return (
    <Box style={[styles.contentBox, !isSearch && { marginTop: 0 }, shadow]}>
      <SelectionCard
        header="Location"
        icon="Pin"
        value={place?.name || 'Select Location'}
        onPress={() =>
          router.navigate({
            pathname: '/search',
            params: { isSleepingPod: 'true' },
          })
        }
      />
      <Row style={styles.pickerRow}>
        <SelectionCard
          header="Check-in Date"
          icon="Calendar"
          value={date ? formatDateToDMY(date) : 'Select Date'}
          onPress={() => setDatePickerVisible(true)}
        />
        <SelectionCard
          header="Arrival Time"
          icon="Clock"
          value={time ? convertTimeTo12Hour(time) : 'Select Time'}
          onPress={() => setTimePickerVisible(true)}
        />
      </Row>

      <Row style={styles.pickerRow}>
        <SelectionCard
          header="Duration"
          icon="DurationIcon"
          value={selectedDuration || 'Select'}
          onPress={() => durationRef?.current?.present()}
        />
        <Box style={{ flex: 1 }} />
      </Row>

      <Box style={styles.divider} />
      <PodSelectContainer />

      {isSearch ? (
        <Pressable onPress={handleSearch} style={styles.searchButton}>
          {isPending ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text preset="POP_16_M" style={styles.searchButtonText}>
              Search
            </Text>
          )}
        </Pressable>
      ) : priceData ? (
        <Box gap={10}>
          <Box style={{ height: 1, backgroundColor: 'rgba(37, 61, 143, 0.3)' }} />
          <PriceDistribution priceData={priceData} />
        </Box>
      ) : null}

      <DatePicker
        onCancel={() => setTimePickerVisible(false)}
        type="time"
        // minimumDate={new Date()}
        showDatePicker={isTimePickerVisible}
        value={timePickerValue}
        // blockPastTime
        onPress={(date) => {
          updateTime(format(date, 'HH:mm:ss'));
          setTimePickerVisible(false);
        }}
      />

      <DatePicker
        onCancel={() => setDatePickerVisible(false)}
        type="date"
        minimumDate={new Date()}
        showDatePicker={isDatePickerVisible}
        value={datePickerValue}
        onPress={(date) => {
          updateDate(formatDate(date, 'yyyy-MM-dd'));
          setDatePickerVisible(false);
        }}
      />

      <BottomSheet enableDynamicSizing ref={durationRef}>
        <SingleSelectList
          headerTitle="Select Duration"
          selectedValue={selectedDuration}
          onSelect={(name) => {
            const selectedDuration = durationList.find((item) => item.name === name)?.value;
            updateDuration(selectedDuration as number);
            if (selectedDuration === 3) {
              updatePods([]);
            }
            durationRef?.current?.dismiss();
          }}
          data={durationList}
        />
      </BottomSheet>
    </Box>
  );
};

export default SleepingPodBookingView;

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  contentBox: {
    marginTop: 200,
    backgroundColor: colors.cardBackgroundPrimary,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
    gap: 20,
  },
  section: {
    gap: 8,
  },
  label: {
    color: 'rgba(34, 49, 63, 0.8)',
  },
  locationRow: {
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#F5F6F6',
    borderWidth: 1,
    borderColor: '#E6E8E9',
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  locationText: {
    color: '#22313F',
  },
  pickerRow: {
    justifyContent: 'space-between',
    gap: 16,
  },
  pickerContainer: {
    flex: 1,
    gap: 8,
  },
  pickerInput: {
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#F5F6F6',
    borderWidth: 1,
    borderColor: '#E6E8E9',
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  pickerText: {
    color: '#22313F',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(37, 61, 143, 0.3)',
  },
  podRow: {
    justifyContent: 'space-between',
    gap: 16,
  },
  podTypeContainer: {
    flex: 1,
    gap: 8,
  },
  podCountContainer: {
    flex: 1,
    gap: 8,
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
  addPodText: {
    color: '#253D8F',
    textAlign: 'right',
  },
  searchButton: {
    height: 45,
    backgroundColor: colors.buttonBackgroundPrimary,
    borderRadius: 45 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
  },
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
});
