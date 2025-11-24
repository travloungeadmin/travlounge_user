import ChatSuggestionsFooter from '@/components/make-a-trip/chat-suggestions-footer';
import { InputToolbar } from '@/components/make-a-trip/input-tool-bar';
import { moderateScale } from '@/core/responsive-dimensions';
import { useTheme } from '@/newTheme';
import { getMakeATripChatMutation } from '@/services/query/make-a-trip';
import React, { useCallback, useState } from 'react';
import { Bubble, GiftedChat, IMessage } from 'react-native-gifted-chat';

const MakeATrip = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [session_id, setSessionId] = useState<string | null>(null);

  const { mutate: makeATripChat, isPending } = getMakeATripChatMutation();

  const onSend = useCallback(
    (messages: IMessage[] = []) => {
      console.log(messages[0]?.text);

      makeATripChat(
        { prompt: messages[0]?.text ?? '', session_id },
        {
          onSuccess: (data) => {
            setSessionId(data.session_id);

            const botMessage: IMessage = {
              _id: Math.random().toString(36).substring(7),
              text: data.response,
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'Travel Agent',
                avatar: 'https://placeimg.com/140/140/any',
              },
            };
            setMessages((previousMessages) => GiftedChat.append(previousMessages, [botMessage]));
          },
          onError: (error) => {
            console.log({ error });
          },
        }
      );
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    },
    [makeATripChat, session_id]
  );

  const renderChatFooter = () => (
    <ChatSuggestionsFooter
      onPress={(topic) =>
        onSend([
          {
            _id: Math.random().toString(36).substring(7),
            text: topic,
            createdAt: new Date(),
            user: { _id: 1 },
          },
        ])
      }
    />
  );

  return (
    <GiftedChat
      isTyping={isPending}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      // renderChatFooter={renderChatFooter}
      renderChatEmpty={renderChatFooter}
      renderInputToolbar={(props) => <InputToolbar {...props} />}
      renderBubble={(props) => (
        <Bubble
          renderTime={(props) => null}
          wrapperStyle={{
            left: {
              paddingHorizontal: moderateScale(12),
              paddingVertical: moderateScale(8),
              backgroundColor: 'transparent',
            },
            right: {
              backgroundColor: '#DCEEFD',
              paddingHorizontal: moderateScale(12),
              paddingVertical: moderateScale(8),
            },
          }}
          {...props}
          textStyle={{
            left: {
              color: '#101828',
            },
            right: {
              color: '#333333',
            },
          }}
        />
      )}
      renderAvatar={null}
      user={{
        _id: 1,
        name: 'User',
      }}
    />
  );
};

export default MakeATrip;
