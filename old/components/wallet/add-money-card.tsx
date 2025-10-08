import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { Shadow } from 'react-native-shadow-2';

// import { addMoney } from "../redux/actions/generalActions";
// import { toast } from "../utils/generalUtils";
// import { RAZORPAY_KEY_ID } from '@env';
import { showError, showSuccess } from '@/lib/toast';
import useUserStore from '@/modules/user';
import { colors, constants } from '@/old/constants';
import { addMoneyMutation, updateAddMoneyMutation } from '@/services/query/wallet';
const RAZORPAY_KEY_ID = 'rzp_test_1DP5mmOlF5G5ag';

const screenWidth = Dimensions.get('window').width;

const AddMoneyCard = ({ onPress }) => {
  const [amount, setAmount] = useState('100');
  const [isFocused, setIsFocused] = useState(false);
  // const [loading, setLoading] = useState(false);
  const { mutate, isPending } = addMoneyMutation();
  const { mutate: updateMutation } = updateAddMoneyMutation();
  const { user } = useUserStore();

  const handleRazorpay = async (id) => {
    const options = {
      // description: "Credits towards consultation",
      // image: "https://i.imgur.com/3g7nmJC.jpg",
      currency: 'INR',
      key: process.env.EXPO_PUBLIC_RAZOR_PAY_KEY_ID,
      amount: amount * 100,
      name: 'Travlounge',
      order_id: id,
      prefill: {
        // email: "gaurav.kumar@example.com",
        contact: user?.mobile_number,
        name: user?.name,
      },
      // theme: { color: "#53a20e" },
    };
    RazorpayCheckout.open(options)
      .then(() => {
        updateMutation(
          {
            id: user?.id,
            amount,
            requested_by: user?.id,
            pk: id,
          },
          {
            onSuccess: () => {
              onPress();
              showSuccess('Success', 'Payment Successful, Thank You!');
            },
            onError: () => {
              showError('Error', 'Payment failed');
            },
          }
        );
      })
      .catch(() => {
        showError('Error', 'Payment failed');
      });
  };

  const addMoneyHandler = async () => {
    const formData = new FormData();
    formData.append('amount', amount * 100);
    mutate(formData, {
      onSuccess: (res) => {
        handleRazorpay(res.order_id);
      },
      onError: (err) => {
        showError('Error', 'Something went wrong');
      },
    });

    // addMoney(formData)
    //   .then((response) => {
    //     handleRazorpay(response.order_id);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //     showError("Error","Something went wrong");
    //   });
  };

  return (
    <Shadow>
      <LinearGradient
        colors={['#F3F7FA', '#DDE0E5']}
        angle={139}
        style={{
          width: screenWidth - 40,
          borderRadius: 20,
          padding: 20,
          //   height: 180,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#babdbf',
        }}>
        <Text
          style={{
            fontFamily: constants.fontPopM,
            fontSize: 15,
            color: '#00205B',
            marginBottom: Platform.OS === 'ios' ? 28 : 20,
          }}>
          Add Money to Wallet
        </Text>
        <TextInput
          placeholder="Amount"
          placeholderTextColor={colors.font_color2}
          value={amount}
          onChangeText={(text) => setAmount(text)}
          maxLength={10}
          style={{
            borderColor: colors.tb_border1,
            borderWidth: isFocused ? 2 : 1,
            borderRadius: 5,
            // flex: 1,
            // marginLeft: 10,
            paddingHorizontal: 8,
            color: colors.font_color2,
            fontFamily: constants.fontRobM,
            fontSize: 14,
            height: 47,
            paddingLeft: 15,
            // backgroundColor: 'red',
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType="number-pad"
        />
        <TouchableOpacity
          onPress={addMoneyHandler}
          style={{
            backgroundColor: '#000',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            marginTop: 20,
          }}>
          {isPending ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text
              style={{
                fontFamily: constants.fontRobM,
                fontSize: 13,
                color: '#FFF',
              }}>
              Proceed to add ₹ {amount}
            </Text>
          )}
        </TouchableOpacity>
      </LinearGradient>
    </Shadow>
  );
};

export default AddMoneyCard;

const styles = StyleSheet.create({});
