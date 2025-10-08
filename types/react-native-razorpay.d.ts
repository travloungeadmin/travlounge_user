declare module 'react-native-razorpay' {
  interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    order_id: string;
    prefill?: {
      contact?: string;
      name?: string;
    };
  }

  const RazorpayCheckout: {
    open: (options: RazorpayOptions) => Promise<any>;
  };

  export default RazorpayCheckout;
}
