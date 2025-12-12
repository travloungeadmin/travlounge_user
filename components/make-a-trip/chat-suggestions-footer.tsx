import { Image, Pressable } from '@/core';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { useTheme } from '@/newTheme';
import { ThemedView } from '@/old/components/ThemedView';
import { getMakeATripChatSuggestionsQuery } from '@/services/query/make-a-trip';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '../common/ThemedText';

const ChatSuggestionsFooter = ({ onPress }: { onPress: (topic: string) => void }) => {
  const { theme } = useTheme();
  const { data: suggestions } = getMakeATripChatSuggestionsQuery();

  return (
    <View
      style={{
        // height: 100,
        height: SPACING.contentHeight - 200,

        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingBottom: SPACING.bottomHeight + 20,
        // paddingTop: 10,
        // gap: 12,
        transform: Platform.OS === 'ios' ? [{ scaleY: -1 }] : [{ scaleY: -1 }, { scaleX: -1 }],
      }}>
      <Image
        source={require('../../assets/images/chatAgent.png')}
        style={{ width: moderateScale(250), height: moderateScale(250) }}
      />
      <ThemedText
        style={{ marginBottom: moderateScale(8) }}
        color="primary"
        variant="headlineSmallEmphasized">
        👋 Hey traveler
      </ThemedText>
      <ThemedText
        style={{ marginBottom: moderateScale(16) }}
        color="primary"
        variant="bodyEmphasized">
        What can I do for you?
      </ThemedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ThemedView
          style={{
            height: moderateScale(40),
            flexDirection: 'row',
            gap: moderateScale(8),
            alignItems: 'center',
            paddingHorizontal: moderateScale(10),
          }}>
          {suggestions?.suggestions?.map((topic) => (
            <Pressable onPress={() => onPress(topic)} key={topic}>
              <ThemedView
                style={{
                  height: moderateScale(40),
                  paddingHorizontal: moderateScale(12),
                  borderRadius: moderateScale(20),
                  alignItems: 'center',
                  justifyContent: 'center',
                  //add shadow
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: moderateScale(2),
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                backgroundColor="white">
                <ThemedText
                  variant="bodyLarge"
                  color="primary"
                  key={topic}
                  // onPress={() => {
                  //   const quickMessage = {
                  //     _id: Math.random().toString(36).substring(7),
                  //     text: topic,
                  //     createdAt: new Date(),
                  //     user: {
                  //       _id: 1,
                  //     },
                  //   };
                  //   onSend([quickMessage]);
                  // }}
                >
                  {topic}
                </ThemedText>
              </ThemedView>
            </Pressable>
          ))}
        </ThemedView>
      </ScrollView>
    </View>
  );
};

export default ChatSuggestionsFooter;

const styles = StyleSheet.create({});
