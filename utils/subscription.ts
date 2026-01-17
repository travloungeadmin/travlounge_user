import { showError, showSuccess } from '@/lib/toast';
import queryClient from '@/services/query';
import QUERIES_KEY from '@/services/query/query-keys';
import RazorpayCheckout from 'react-native-razorpay';

interface HandleRazorpayProps {
  id: string;
  subscription_id: number;
  amount: number;
  user: any;
  verifyMutation: (data: any) => void;
}

export const handleRazorpay = async ({
  id,
  subscription_id,
  amount,
  user,
  verifyMutation,
}: HandleRazorpayProps) => {
  const options = {
    currency: 'INR',
    key: process.env.EXPO_PUBLIC_RAZOR_PAY_KEY_ID,
    amount: amount * 100,
    name: 'Travlounge',
    order_id: id,
    prefill: {
      contact: user?.mobile_number,
      name: user?.name,
    },
  };

  try {
    const data = await RazorpayCheckout.open(options);
    verifyMutation({
      razorpay_order_id: data.razorpay_order_id,
      razorpay_payment_id: data.razorpay_payment_id,
      razorpay_signature: data.razorpay_signature,
      subscription_id,
    });
    queryClient.invalidateQueries({
      queryKey: [QUERIES_KEY.PACKAGES_LIST],
    });
    showSuccess('Success', 'Payment Successful, Thank You!');
  } catch (error) {
    showError('error', 'payment failed');
  }
};
