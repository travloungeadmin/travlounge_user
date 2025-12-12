// import ChatSuggestionsFooter from '@/components/make-a-trip/chat-suggestions-footer';
// import { InputToolbar } from '@/components/make-a-trip/input-tool-bar';
// import { moderateScale } from '@/lib/responsive-dimensions';
// import { useTheme } from '@/newTheme';
// import { getMakeATripChatMutation } from '@/services/query/make-a-trip';
// import React, { useCallback, useState } from 'react';
// import { Bubble, GiftedChat, IMessage } from 'react-native-gifted-chat';

// const MakeATrip = () => {
//   const { theme } = useTheme();
//   const [messages, setMessages] = useState<IMessage[]>([]);
//   const [session_id, setSessionId] = useState<string | null>(null);

//   const { mutate: makeATripChat, isPending } = getMakeATripChatMutation();

//   const onSend = useCallback(
//     (messages: IMessage[] = []) => {
//       console.log(messages[0]?.text);

//       makeATripChat(
//         { prompt: messages[0]?.text ?? '', session_id },
//         {
//           onSuccess: (data) => {
//             setSessionId(data.session_id);

//             const botMessage: IMessage = {
//               _id: Math.random().toString(36).substring(7),
//               text: data.response,
//               createdAt: new Date(),
//               user: {
//                 _id: 2,
//                 name: 'Travel Agent',
//                 avatar: 'https://placeimg.com/140/140/any',
//               },
//             };
//             setMessages((previousMessages) => GiftedChat.append(previousMessages, [botMessage]));
//           },
//           onError: (error) => {
//             console.log({ error });
//           },
//         }
//       );
//       setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
//     },
//     [makeATripChat, session_id]
//   );

//   const renderChatFooter = () => (
//     <ChatSuggestionsFooter
//       onPress={(topic) =>
//         onSend([
//           {
//             _id: Math.random().toString(36).substring(7),
//             text: topic,
//             createdAt: new Date(),
//             user: { _id: 1 },
//           },
//         ])
//       }
//     />
//   );

//   return (
//     <GiftedChat
//       isTyping={isPending}
//       messages={messages}
//       onSend={(messages) => onSend(messages)}
//       // renderChatFooter={renderChatFooter}
//       renderChatEmpty={renderChatFooter}
//       renderInputToolbar={(props) => <InputToolbar {...props} />}
//       renderBubble={(props) => (
//         <Bubble
//           renderTime={(props) => null}
//           wrapperStyle={{
//             left: {
//               paddingHorizontal: moderateScale(12),
//               paddingVertical: moderateScale(8),
//               backgroundColor: 'transparent',
//             },
//             right: {
//               backgroundColor: '#DCEEFD',
//               paddingHorizontal: moderateScale(12),
//               paddingVertical: moderateScale(8),
//             },
//           }}
//           {...props}
//           textStyle={{
//             left: {
//               color: '#101828',
//             },
//             right: {
//               color: '#333333',
//             },
//           }}
//         />
//       )}
//       renderAvatar={null}
//       user={{
//         _id: 1,
//         name: 'User',
//       }}
//     />
//   );
// };

// export default MakeATrip;

import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import Header from '@/components/header';
import { Device, Image, Text, useSafeAreaInsets } from '@/core';

const MakeATrip = () => {
  const { bottomHeight } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <Header profileIcon title="Make a trip" />
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text preset="POP_28_B" color="#253D8F">
          Coming Soon!
        </Text>
        <Text preset="POP_16_SB" color="#253D8F">
          We are working for you
        </Text>
        <Image
          source={require('@/assets/images/coming_soon_make_a_trip.png')}
          priority="high"
          style={{
            width: Device.width,
            height: Device.width * 1.105,
          }}
          contentFit="contain"
        />
        <Pressable
          onPress={() => router.back()}
          style={{
            position: 'absolute',
            bottom: bottomHeight || 20,
            left: 20,
            alignSelf: 'flex-end',
            backgroundColor: '#253D8F',
            height: 48,
            width: Device.width - 40,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text preset="POP_16_SB" color="#FFF">
            Go To Home
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MakeATrip;

const styles = StyleSheet.create({});
