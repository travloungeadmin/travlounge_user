import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';

import { showError } from '@/lib/toast';
import useUserStore, { setRegister } from '@/modules/user';
import CustomHeader from '@/old/components/common/custom-header';
import { colors, constants } from '@/old/constants';
import queryClient from '@/services/query';
import { userRegisterQuery } from '@/services/query/auth';
import { getUserDetails } from '@/services/query/profile';
import QUERIES_KEY from '@/services/query/query-keys';

const screenWidth = Dimensions.get('window').width;

type Gender = 'male' | 'female' | 'other';

const EditProfile = () => {
  const { type } = useLocalSearchParams();
  const {
    currentZipCode,
    currentCountry,
    place,
    subPlace,
    currentState,
    setProfileComplete,
    isProfileComplete,
  } = useUserStore();

  const { isLoading, refetch } = getUserDetails();
  const { mutate, isPending } = userRegisterQuery();

  const [isGender, setIsGender] = useState<Gender | ''>('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<string>();
  const [imageUri, setImageUri] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  React.useEffect(() => {
    if (type) {
      refetch().then(({ data }) => {
        setAddress(data.user_profile.address || '');
        setCity(data.user_profile.city || place || '');
        setDate(data.user_profile.dob || '');
        setPincode(data.user_profile.pincode || currentZipCode || '');
        setState(data.user_profile.state || currentState || '');
        setEmail(data.user.email || '');
        setImageUri(data.user_profile.image || '');
        setName(data.user.name || '');
        setIsGender((data.user.gender as Gender) || '');
      });
    }
  }, [type, place, currentZipCode, currentState]);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const selectedDate = date.toISOString().split('T')[0];
    setDate(selectedDate);
    hideDatePicker();
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidIndianPincode = (pincode: string): boolean => {
    const indianPincodePattern = /^[1-9][0-9]{5}$/;
    return indianPincodePattern.test(pincode);
  };

  const saveHandler = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);

    if (imageUri) {
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      } as unknown as Blob);
    }

    formData.append('city', city);
    formData.append('state', state);
    formData.append('pincode', pincode);
    formData.append('address', address);
    if (date) formData.append('dob', date);
    formData.append('gender', isGender);

    if (!name || !email || !isGender) {
      return showError(
        'Error',
        `Please select ${!name ? 'Name' : !email ? 'Email' : !isGender ? 'Gender' : ''}`
      );
    }

    if (isValidEmail(email)) {
      mutate(formData, {
        onSuccess: (res) => {
          if (!type) {
            setRegister(true);
            router.replace('/(main)/old/profile');
          } else {
            router.back();
            queryClient.invalidateQueries({
              queryKey: [QUERIES_KEY.PROFILE],
            });
            if (!isProfileComplete) {
              setProfileComplete(true);
            }
          }
        },
        onError: (err) => {
          showError('Error', 'Something went wrong');
        },
      });
    } else {
      showError('Error', 'Please enter a valid email');
    }
  };

  const getLocation = async () => {
    !city && setCity(place as string);
    !state && setState(currentState as string);
    !pincode && setPincode(currentZipCode as string);
  };
  React.useEffect(() => {
    getLocation();
  }, []);
  return (
    <LinearGradient
      colors={['#F3F7FA', '#E6EAED']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}>
      <CustomHeader
        isHome={false}
        title={type === 'edit' ? 'Edit Profile' : 'Register'}
        isBack={type === 'edit'}
        isWallet={false}
      />
      <ScrollView>
        <SafeAreaView edges={['bottom']} style={styles.safeArea}>
          <Shadow distance={8}>
            <LinearGradient
              colors={['#F3F7FA', '#DDE0E5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.formContainer}>
              <Shadow>
                <LinearGradient
                  colors={['#ECF0F3', '#ECF0F3']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.avatarContainer}>
                  <Image
                    style={styles.avatar}
                    source={
                      !imageUri ? require('@/assets/images/empty_avatar.jpeg') : { uri: imageUri }
                    }
                    contentFit="cover"
                  />
                  <TouchableOpacity onPress={selectImage} style={styles.editButton}>
                    <AntDesign name="edit" size={20} color="black" />
                  </TouchableOpacity>
                </LinearGradient>
              </Shadow>

              <View
                style={[
                  styles.input,
                  styles.nameInput,
                  !name ? { paddingRight: 0 } : null,
                  { flexDirection: 'row', alignItems: 'center' },
                ]}>
                <TextInput
                  style={{ height: '100%', flex: 1 }}
                  // style={[styles.input, styles.nameInput]}
                  placeholder="Name"
                  placeholderTextColor="#8A95BB"
                  value={name}
                  onChangeText={setName}
                />
                {!name ? (
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 30,
                      textAlign: 'center',
                      alignSelf: 'center',
                      paddingHorizontal: 5,
                    }}>
                    *
                  </Text>
                ) : null}
              </View>

              <View
                style={[
                  styles.input,
                  !email ? { paddingRight: 0 } : null,
                  { flexDirection: 'row', alignItems: 'center' },
                ]}>
                <TextInput
                  style={{ height: '100%', flex: 1 }}
                  placeholder="Email"
                  placeholderTextColor="#8A95BB"
                  value={email}
                  onChangeText={setEmail}
                />
                {!email ? (
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 30,
                      textAlign: 'center',
                      alignSelf: 'center',
                      paddingHorizontal: 5,
                    }}>
                    *
                  </Text>
                ) : null}
              </View>

              <View style={styles.genderContainer}>
                {(['male', 'female', 'other'] as Gender[]).map((gender) => (
                  <View key={gender} style={styles.genderOption}>
                    <Pressable
                      onPress={() => setIsGender(gender)}
                      style={[
                        styles.radioButton,
                        isGender === gender && styles.radioButtonSelected,
                      ]}
                    />
                    <Text style={styles.genderText}>
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={showDatePicker}
                style={styles.datePickerButton}>
                <Text style={[styles.dateText, !date && styles.placeholderText]}>
                  {date || 'Date of Birth'}
                </Text>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </TouchableOpacity>

              <TextInput
                style={[styles.input, styles.addressInput]}
                placeholder="Address"
                placeholderTextColor="#8A95BB"
                multiline
                value={address}
                onChangeText={setAddress}
              />

              <TextInput
                style={styles.input}
                placeholder="City"
                placeholderTextColor="#8A95BB"
                value={city}
                onChangeText={setCity}
              />

              <TextInput
                style={styles.input}
                placeholder="State"
                placeholderTextColor="#8A95BB"
                value={state}
                onChangeText={setState}
              />

              <TextInput
                style={styles.input}
                placeholder="Pincode"
                placeholderTextColor="#8A95BB"
                value={pincode}
                onChangeText={setPincode}
              />

              <TouchableOpacity
                onPress={saveHandler}
                activeOpacity={0.7}
                style={styles.saveButtonContainer}>
                <LinearGradient
                  style={styles.saveButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#6D8AFC', '#B5C4FF']}>
                  {isPending ? (
                    <ActivityIndicator color={colors.white} />
                  ) : (
                    <Text style={styles.saveButtonText}>Save</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </Shadow>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    padding: 20,
  },
  formContainer: {
    width: screenWidth - 40,
    borderRadius: 6,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  avatarContainer: {
    borderRadius: 50,
    height: 100,
    width: 100,
    borderWidth: 2,
    borderColor: '#FBFAFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 47,
    borderWidth: 1,
    borderColor: '#8A95BB',
    borderRadius: 6,
    width: '100%',
    paddingHorizontal: 20,
  },
  nameInput: {
    marginTop: 20,
  },
  addressInput: {
    minHeight: 47,
    paddingVertical: 0,
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: '100%',
    gap: 20,
  },
  genderOption: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  radioButton: {
    height: 18,
    width: 18,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#8A95BB',
  },
  radioButtonSelected: {
    borderWidth: 4,
    borderColor: '#00205B',
  },
  genderText: {
    fontFamily: constants.fontPopR,
    fontSize: 14,
    color: '#31456A',
  },
  datePickerButton: {
    width: '100%',
    height: 47,
    borderWidth: 1,
    borderColor: '#8A95BB',
    borderRadius: 6,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  dateText: {
    fontFamily: constants.fontPopR,
    fontSize: 14,
    color: 'black',
    marginTop: 10,
  },
  placeholderText: {
    color: '#8A95BB',
  },
  saveButtonContainer: {
    width: 200,
  },
  saveButton: {
    borderRadius: 10,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: colors.white,
    fontFamily: constants.fontPopM,
    fontSize: 16,
  },
});
