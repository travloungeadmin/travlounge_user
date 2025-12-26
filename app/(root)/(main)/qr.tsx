// import { useFocusEffect } from 'expo-router';
// import * as Sharing from 'expo-sharing';
// import React, { useCallback, useEffect, useState } from 'react';
// import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

// // import {
// //   CustomHeader,
// //   HowToScanCard,
// //   Loading,
// //   QRContainer,
// // } from "../../components";
// import QRCode from 'react-native-qrcode-svg';
// import ViewShot from 'react-native-view-shot';

// import { getServiceListQuery, getWalletDetails } from '@//services/query/qr';
// import SubscriptionView from '@/components/dashboard/subscription-view';
// import { shadow } from '@/constants';
// import { Box, Device, Row, Text } from '@/core';
// import useUserStore from '@/modules/user';
// import Loading from '@/old/components/common/Loading';
// import LocationPermissionView from '@/old/components/common/location-permission-view';
// import queryClient from '@/services/query';
// import QUERIES_KEY from '@/services/query/query-keys';
// import { colors } from '@/theme';
// import { encrypt } from '@/utils/encription';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const SubscribedCard = ({ subscription_data }) => {
//   const list = subscription_data?.flatMap((item) => item?.service_type_counts);

//   return (
//     <Box gap={10} style={{ marginHorizontal: 40, marginTop: 20 }}>
//       <Text preset="POP_16_SB" color="#333333">
//         Subscription Details
//       </Text>
//       <Box gap={5}>
//         {list?.map((item) => (
//           <Row
//             style={{
//               justifyContent: 'space-between',
//               gap: 20,
//               flex: 1,
//               alignItems: 'center',
//             }}>
//             <Text style={{ flex: 1 }} preset="POP_14_R" color="#333333">
//               {item?.service}
//             </Text>
//             <Text preset="POP_14_R" color="#333333">
//               {item?.remaining}
//             </Text>
//           </Row>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// const QRTimer = ({ onExpire }: { onExpire: () => void }) => {
//   const [remainingTime, setRemainingTime] = useState(600); // 10 minutes in seconds

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setRemainingTime((prevTime) => {
//         if (prevTime <= 1) {
//           onExpire();
//           return 600;
//         }
//         return prevTime - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [onExpire]);

//   return (
//     <Text
//       style={{
//         width: 200,
//         textAlign: 'center',
//       }}
//       preset="POP_14_R"
//       color={remainingTime < 60 ? 'red' : '#333333'}>
//       Expires in:{' '}
//       {Math.floor(remainingTime / 60)
//         .toString()
//         .padStart(2, '0')}
//       :{(remainingTime % 60).toString().padStart(2, '0')}
//     </Text>
//   );
// };

// const QR = () => {
//   const { bottom } = useSafeAreaInsets();
//   const { data, isFetching } = getServiceListQuery();
//   const { user } = useUserStore();
//   const { data: qrWalletData, isLoading, refetch } = getWalletDetails();
//   const { isLocationPermissionGranted } = useUserStore();
//   const viewShot = React.useRef<ViewShot>(null);
//   const [qrData, setQrData] = useState({
//     id: '',
//     expaire_date: '',
//   });

//   const packages = queryClient.getQueryData([QUERIES_KEY.PACKAGES_LIST]);

//   const captureAndShareScreenshot = () => {
//     viewShot.current.capture().then((uri) => {
//       Sharing.shareAsync('file://' + uri);
//     }),
//       (error) => console.error('Oops, snapshot failed', error);
//   };
//   useFocusEffect(
//     useCallback(() => {
//       refetch();
//     }, [])
//   );

//   useEffect(() => {
//     if (user?.id) {
//       regenerateQRCode();
//     }
//   }, [user]);

//   const regenerateQRCode = useCallback(() => {
//     const expaireDate = new Date();
//     expaireDate.setMinutes(expaireDate.getMinutes() + 10);
//     setQrData({
//       id: user?.id || '',
//       expaire_date: expaireDate.toISOString(),
//     });
//   }, [user?.id]);

//   const qrString = encrypt(JSON.stringify(qrData));

//   if (isLoading) return <Loading />;

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: colors.backgroundPrimary,
//       }}>
//       <ScrollView>
//         <Box>
//           <ViewShot ref={viewShot} options={{ format: 'jpg', quality: 0.9 }}>
//             <View
//               style={[
//                 {
//                   marginTop: 20,
//                   alignSelf: 'center',
//                   backgroundColor: '#fff',
//                   padding: 40,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   borderRadius: 50,
//                   gap: 30,
//                 },
//                 shadow,
//               ]}>
//               <QRCode value={qrString} size={Device.width - 150} backgroundColor="#fff" />
//               <Box gap={5} style={{ alignItems: 'center' }}>
//                 <Text preset="POP_16_SB" color="#333333">
//                   {user?.name || user?.mobile_number}
//                 </Text>
//                 <QRTimer key={qrData.expaire_date} onExpire={regenerateQRCode} />
//                 {/* <Pressable
//                   onPress={regenerateQRCode}
//                   style={{
//                     paddingHorizontal: 20,
//                     paddingVertical: 10,
//                     backgroundColor: '#f0f0f0',
//                     borderRadius: 20,
//                   }}>
//                   <Text preset="POP_14_SB" color="#333333">
//                     Regenerate QR Code
//                   </Text>
//                 </Pressable> */}
//               </Box>
//             </View>
//           </ViewShot>
//           <Row
//             style={{
//               justifyContent: 'space-between',
//               marginHorizontal: 40,
//               marginTop: 50,
//               paddingBottom: 30,
//               borderBottomWidth: 1,
//               borderColor: 'rgba(37, 61, 143, 0.3)',
//             }}>
//             <Text preset="POP_16_SB" color="#333333">
//               Wallet Balance
//             </Text>
//             <Text preset="POP_16_SB" color="#333333">
//               {qrWalletData.wallet_balance}
//             </Text>
//           </Row>
//           {qrWalletData.packages.length > 0 && (
//             <SubscribedCard subscription_data={qrWalletData.subscription_data} />
//           )}
//           {qrWalletData.packages.length === 0 && (
//             <Box gap={20} style={{ marginTop: 20 }}>
//               <Box style={{ marginHorizontal: 40 }}>
//                 <Text preset="POP_16_SB" color="#333333">
//                   You don't have subscription
//                 </Text>
//                 <Text style={{ lineHeight: 24 }} preset="POP_14_R" color="#333333">
//                   Here are some of the best offer for you.{' '}
//                 </Text>
//               </Box>
//               <SubscriptionView packages={packages} />
//             </Box>
//           )}
//         </Box>
//         <Pressable
//           onPress={captureAndShareScreenshot}
//           style={{
//             backgroundColor: '#FFFFFF',
//             height: 44,
//             borderRadius: 22,
//             marginHorizontal: 16,
//             alignItems: 'center',
//             justifyContent: 'center',
//             marginVertical: 20,
//             marginBottom: bottom || 20,
//           }}>
//           <Text preset="POP_16_SB" color="#253D8F">
//             Share QR Code
//           </Text>
//         </Pressable>
//         {/* <Text
//           style={{
//             textAlign: 'center',
//             marginBottom: 40,
//           }}
//           preset="POP_14_R"
//           color="#333333">
//           Note: The QR code is valid for only{' '}
//           <Text preset="POP_14_SB" color="#333333">
//             30 minutes.
//           </Text>
//         </Text> */}
//       </ScrollView>
//       {!isLocationPermissionGranted && <LocationPermissionView />}
//     </View>
//   );
// };

// export default QR;

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import { useFocusEffect } from 'expo-router';
import * as Sharing from 'expo-sharing';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

// import {
//   CustomHeader,
//   HowToScanCard,
//   Loading,
//   QRContainer,
// } from "../../components";
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';

import { getServiceListQuery, getWalletDetails } from '@//services/query/qr';
import { ThemedText } from '@/components/common/ThemedText';
import SubscriptionView from '@/components/dashboard/subscription-view';
import { shadow } from '@/constants';
import { Box, Device, Row } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import useUserStore from '@/modules/user';
import Loading from '@/old/components/common/Loading';
import LocationPermissionView from '@/old/components/common/location-permission-view';
import queryClient from '@/services/query';
import QUERIES_KEY from '@/services/query/query-keys';

const SubscribedCard = ({ subscription_data }) => {
  const list = subscription_data?.flatMap((item) => item?.service_type_counts);

  return (
    <Box gap={10} style={{ marginHorizontal: 40, marginTop: 20 }}>
      <ThemedText variant="bodyLargeEmphasized" color="gray900">
        Subscription Details
      </ThemedText>
      <Box gap={5}>
        {list?.map((item) => (
          <Row
            style={{
              justifyContent: 'space-between',
              gap: 20,
              flex: 1,
              alignItems: 'center',
            }}>
            <ThemedText variant="bodySmall" color="gray900" style={{ flex: 1 }}>
              {item?.service}
            </ThemedText>
            <ThemedText variant="bodySmall" color="gray900">
              {item?.remaining}
            </ThemedText>
          </Row>
        ))}
      </Box>
    </Box>
  );
};

const QR = () => {
  const { data, isFetching } = getServiceListQuery();
  const { user } = useUserStore();
  const { data: qrWalletData, isLoading, refetch } = getWalletDetails();
  const { isLocationPermissionGranted } = useUserStore();
  const viewShot = React.useRef<ViewShot>(null);
  const { theme } = useTheme();

  const packages = queryClient.getQueryData([QUERIES_KEY.PACKAGES_LIST]);

  const captureAndShareScreenshot = () => {
    viewShot.current.capture().then((uri) => {
      Sharing.shareAsync('file://' + uri);
    }),
      (error) => console.error('Oops, snapshot failed', error);
  };
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  if (isLoading) return <Loading />;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.backgroundPrimary,
      }}>
      <ScrollView>
        <Box>
          <ViewShot ref={viewShot} options={{ format: 'jpg', quality: 0.9 }}>
            <View
              style={[
                {
                  marginTop: 20,
                  alignSelf: 'center',
                  backgroundColor: '#fff',
                  padding: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  gap: 30,
                },
                shadow,
              ]}>
              <QRCode
                value={user?.id?.toString()}
                size={Device.width - 150}
                backgroundColor="#fff"
              />
              <ThemedText variant="bodyLargeEmphasized" color="gray900">
                {user?.name || user?.mobile_number}
              </ThemedText>
            </View>
          </ViewShot>
          <Row
            style={{
              justifyContent: 'space-between',
              marginHorizontal: 40,
              marginTop: 50,
              paddingBottom: 30,
              borderBottomWidth: 1,
              borderColor: 'rgba(37, 61, 143, 0.3)',
            }}>
            <ThemedText variant="bodyLargeEmphasized" color="gray900">
              Wallet Balance
            </ThemedText>
            <ThemedText variant="bodyLargeEmphasized" color="gray900">
              {qrWalletData.wallet_balance}
            </ThemedText>
          </Row>
          {qrWalletData.packages.length > 0 && (
            <SubscribedCard subscription_data={qrWalletData.subscription_data} />
          )}
          {qrWalletData.packages.length === 0 && (
            <Box gap={20} style={{ marginTop: 20 }}>
              <Box style={{ marginHorizontal: 40 }}>
                <ThemedText variant="bodyLargeEmphasized" color="gray900">
                  You don't have subscription
                </ThemedText>
                <ThemedText style={{ lineHeight: 24 }} variant="bodySmall" color="gray900">
                  Here are some of the best offer for you.{' '}
                </ThemedText>
              </Box>
              <SubscriptionView packages={packages} />
            </Box>
          )}
        </Box>
        {/* <Pressable
          onPress={captureAndShareScreenshot}
          style={{
            backgroundColor: '#FFFFFF',
            height: 44,
            borderRadius: 22,
            marginHorizontal: 16,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          <Text preset="POP_16_SB" color="#253D8F">
            Share QR Code
          </Text>
        </Pressable>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 40,
          }}
          preset="POP_14_R"
          color="#333333">
          Note: The QR code is valid for only{' '}
          <Text preset="POP_14_SB" color="#333333">
            30 minutes.
          </Text>
        </Text> */}
      </ScrollView>
      {!isLocationPermissionGranted && <LocationPermissionView />}
    </View>
  );
};

export default QR;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
