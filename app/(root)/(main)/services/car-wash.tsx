import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';

import SingleSelectList from '@/components/bottom-sheet/single-select-list';
import Icon from '@/components/ui/icon';
import { shadow } from '@/constants';
import { vehicleOptions } from '@/constants/data';
import { Device, Text, TextInput, useSafeAreaInsets } from '@/core';
import BottomSheet from '@/core/bottom-sheet';
import { showError } from '@/lib/toast';
import { useGetCarWashServices, useGetCarWashTimeSlots } from '@/services/query/car-wash';

const CarWash = () => {
  const featuresRef = React.useRef<BottomSheetModal>(null);
  const { bottomHeight } = useSafeAreaInsets();
  const { id, header, place, image } = useLocalSearchParams();
  const [carTypeId, setCarTypeId] = React.useState<number | null>(null);
  const [featuresId, setFeaturesId] = React.useState<number | null>(null);
  const [vehicleNumber, setVehicleNumber] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedTime, setSelectedTime] = React.useState('');

  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const { data: services } = useGetCarWashServices({
    car_id: carTypeId,
    listing_id: id,
  });
  const { data: timeSlots } = useGetCarWashTimeSlots({
    date: selectedDate ? selectedDate.toISOString().slice(0, 10) : undefined,
    listing_id: id as string,
  });

  const reqServices = services?.map((service) => ({
    id: service.id,
    name: service.name,
  }));

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ padding: 16, gap: 26 }}>
          <View style={{ gap: 10 }}>
            <Text preset="POP_12_M" color="rgba(34, 49, 63, 0.8)">
              Select your vehicle
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
              {vehicleOptions.map((option) => (
                <Pressable
                  onPress={() => setCarTypeId(option.id)}
                  key={option.type}
                  style={{
                    borderWidth: carTypeId === option.id ? 1 : 0,
                    borderColor: '#253D8F',
                    backgroundColor: carTypeId === option.id ? '#EFF3FF' : '#fff',
                    padding: 10,
                    borderRadius: 6,
                    gap: 10,
                    width: (Device.width - 64) / 3,
                    alignItems: 'center',
                    ...shadow,
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    elevation: 4,
                  }}>
                  <Image
                    contentFit="contain"
                    source={option.image}
                    style={{
                      width: (Device.width - 64) / 3 - 40,
                      height: (Device.width - 64) / 3 - 60,
                    }}
                  />
                  <Text color="#333333" preset="POP_12_M">
                    {option.type}
                  </Text>
                  <Text style={{ textAlign: 'center' }} color="#333333" preset="POP_12_R">
                    {option.description}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          <View style={{ gap: 10 }}>
            <Text preset="POP_12_M" color="rgba(34, 49, 63, 0.8)">
              Special Features
            </Text>
            <Pressable
              onPress={() => featuresRef?.current?.present()}
              style={{
                backgroundColor: '#F5F6F6',
                borderRadius: 12,
                height: 44,
                borderWidth: 1,
                borderColor: '#E6E8E9',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 12,
              }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Icon name="Stars" />
                <Text color="#22313F" preset="POP_14_M">
                  {featuresId
                    ? reqServices?.find((s) => s.id === featuresId)?.name
                    : 'Select Features'}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={24} color="#22313F" />
            </Pressable>
          </View>
          <View style={{ gap: 10 }}>
            <Text preset="POP_12_M" color="rgba(34, 49, 63, 0.8)">
              Vehicle Number
            </Text>
            <Pressable
              style={{
                backgroundColor: '#F5F6F6',
                borderRadius: 12,
                height: 44,
                borderWidth: 1,
                borderColor: '#E6E8E9',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 12,
              }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Icon name="Car" />
                <TextInput
                  value={vehicleNumber}
                  onChangeText={setVehicleNumber}
                  placeholder="e.g. KL-11-BD-9818"
                  placeholderTextColor="rgba(34, 49, 63, 0.5)"
                  style={{
                    flex: 1,
                    color: '#22313F',
                    fontFamily: 'Poppins_400Regular',
                  }}
                />
              </View>
            </Pressable>
          </View>

          <View style={{ gap: 10 }}>
            <Text preset="POP_12_M" color="rgba(34, 49, 63, 0.8)">
              Select Date
            </Text>
            <View style={{ flexDirection: 'row', gap: 10, display: 'flex', flexWrap: 'wrap' }}>
              <Pressable
                onPress={() => setSelectedDate(new Date())}
                style={[
                  {
                    height: 44,
                    backgroundColor:
                      selectedDate?.toDateString() === new Date().toDateString()
                        ? '#EFF3FF'
                        : '#fff',
                    borderRadius: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: selectedDate?.toDateString() === new Date().toDateString() ? 1 : 0,
                    borderColor: '#253D8F',
                    paddingHorizontal: 16,
                  },
                  shadow,
                  {
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    elevation: 4,
                  },
                ]}>
                <Text preset="POP_14_M">Today</Text>
              </Pressable>
              <Pressable
                onPress={() => setSelectedDate(new Date(Date.now() + 24 * 60 * 60 * 1000))}
                style={[
                  {
                    height: 44,
                    backgroundColor:
                      selectedDate?.toDateString() ===
                      new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString()
                        ? '#EFF3FF'
                        : '#fff',
                    borderRadius: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth:
                      selectedDate?.toDateString() ===
                      new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString()
                        ? 1
                        : 0,
                    borderColor: '#253D8F',
                    paddingHorizontal: 16,
                  },
                  shadow,
                  {
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    elevation: 4,
                  },
                ]}>
                <Text preset="POP_14_M">Tomorrow</Text>
              </Pressable>
              <Pressable
                onPress={() => setShowDatePicker(true)}
                style={{
                  backgroundColor: '#F5F6F6',
                  borderRadius: 12,
                  height: 44,
                  borderWidth: 1,
                  borderColor: '#E6E8E9',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 12,
                  flex: 1,
                }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Icon name="Calendar" />
                  <Text color="#22313F" preset="POP_14_M">
                    {selectedDate
                      ? selectedDate.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : 'Select Date'}
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
          {timeSlots?.time_slots && (
            <View style={{ gap: 10 }}>
              <Text preset="POP_12_M" color="rgba(34, 49, 63, 0.8)">
                Select Time Slot
              </Text>
              {timeSlots?.time_slots?.length === 0 ? (
                <View
                  style={{
                    width: '100%',
                    height: 60,
                    backgroundColor: '#F5F6F6',
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text preset="POP_14_M" color="rgba(34, 49, 63, 0.6)">
                    No slots available
                  </Text>
                </View>
              ) : (
                <View style={{ flexDirection: 'row', gap: 10, display: 'flex', flexWrap: 'wrap' }}>
                  {timeSlots?.time_slots?.map((item) => (
                    <Pressable
                      disabled={!item.is_available}
                      onPress={() => setSelectedTime(item.time)}
                      style={[
                        {
                          height: 44,
                          backgroundColor: selectedTime === item.time ? '#EFF3FF' : '#fff',
                          borderRadius: 44,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: selectedTime === item.time ? 1 : 0,
                          borderColor: '#253D8F',
                          paddingHorizontal: 10,
                        },
                        shadow,
                        {
                          shadowOffset: {
                            width: 0,
                            height: 4,
                          },
                          elevation: 4,
                        },
                        !item?.is_available && {
                          opacity: 0.5,
                        },
                      ]}>
                      <Text preset="POP_14_M">{item.time}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
        <BottomSheet ref={featuresRef} enableDynamicSizing>
          <SingleSelectList
            data={reqServices || []}
            headerTitle="Select Features"
            selectedId={featuresId}
            onSelect={(val, index, id) => {
              setFeaturesId(id);
              featuresRef?.current?.dismiss();
            }}
          />
        </BottomSheet>
        <DatePicker
          modal
          mode="date"
          minimumDate={new Date()}
          open={showDatePicker}
          date={selectedDate || new Date()}
          onConfirm={(date) => {
            setSelectedDate(date);
            setShowDatePicker(false);
          }}
          onCancel={() => {
            setShowDatePicker(false);
          }}
        />
      </ScrollView>
      <View style={{ padding: 16, backgroundColor: '#fff', paddingBottom: bottomHeight || 20 }}>
        <Pressable
          style={{
            height: 44,
            backgroundColor: '#253D8F',
            borderRadius: 44,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            if (!carTypeId || !featuresId || !vehicleNumber || !selectedTime || !selectedDate) {
              showError('Error', 'Please select all fields before booking.');
              return;
            }
            router.navigate({
              pathname: '/services/carwash/payment',
              params: {
                vehicleTypeId: carTypeId,
                vehicleType: vehicleOptions.find((v) => v.id === carTypeId)?.type,
                listing_id: id,
                service: JSON.stringify(services?.find((s) => s.id === Number(featuresId))),
                time_slot_id: selectedTime,
                date: selectedDate ? selectedDate.toISOString().slice(0, 10) : undefined,
                vehicle_number: vehicleNumber,
                header,
                place,
                image,
                id,
              },
            });
          }}>
          <Text preset="POP_16_SB" color="#FFF">
            Book Now
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CarWash;

const styles = StyleSheet.create({});
