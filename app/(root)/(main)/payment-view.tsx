import { verifySleepingPodOrder } from '@/services/query/service';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

export default function PaymentView() {
  const { link, id, image, name, location, date, time, duration } = useLocalSearchParams();
  const { mutate: verifyMutation } = verifySleepingPodOrder();
  const [isLoading, setIsLoading] = React.useState(true);
  const handleNavigationStateChange = (navState) => {
    const { url } = navState;

    const parsedUrl = new URL(url);
    const params = new URLSearchParams(parsedUrl.search);

    const paymentStatus = params.get('razorpay_payment_link_status');
    const razorpay_signature = params.get('razorpay_signature');
    const razorpay_payment_id = params.get('razorpay_payment_id');
    const razorpay_payment_link_id = params.get('razorpay_payment_link_id');

    if (paymentStatus) {
      if (paymentStatus !== 'paid') {
        router.replace({
          pathname: '/(root)/(main)/payment-result',
          params: {
            status: 'failed',
          },
        });
      }
      verifyMutation(
        {
          razorpay_payment_link_id: razorpay_payment_link_id as string,
          razorpay_payment_id: razorpay_payment_id as string,
          razorpay_signature: razorpay_signature as string,
        },
        {
          onSuccess(data, variables, context) {
            router.replace({
              pathname: '/(root)/(main)/payment-result',
              params: {
                id,
                image,
                name,
                location,
                date,
                time,
                duration,
                status: 'success',
              },
            });
          },
        }
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <SafeAreaView style={[styles.loadingContainer, StyleSheet.absoluteFillObject]}>
          <ActivityIndicator size="large" color="#fff" />
        </SafeAreaView>
      )}

      <WebView
        style={styles.webView}
        onLoadEnd={() => setIsLoading(false)}
        source={{ uri: link as string }}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        onNavigationStateChange={handleNavigationStateChange}
        renderLoading={() => (
          <SafeAreaView style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </SafeAreaView>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  leaveButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    zIndex: 1,
  },
  leaveButtonText: {
    color: 'black',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    zIndex: 1,
  },
  webView: {
    flex: 1,
    backgroundColor: '#000',
  },
});
