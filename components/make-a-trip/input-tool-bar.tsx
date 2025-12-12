import { moderateScale } from '@/lib/responsive-dimensions';
import { useTheme } from '@/newTheme';

import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import {
  ActionsProps,
  Composer,
  ComposerProps,
  IMessage,
  SendProps,
} from 'react-native-gifted-chat';
import Icon from '../ui/icon';
import { Send } from './send';

export interface InputToolbarProps<TMessage extends IMessage> {
  options?: { [key: string]: () => void };
  optionTintColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  primaryStyle?: StyleProp<ViewStyle>;
  accessoryStyle?: StyleProp<ViewStyle>;
  renderAccessory?(props: InputToolbarProps<TMessage>): React.ReactNode;
  renderActions?(props: ActionsProps): React.ReactNode;
  renderSend?(props: SendProps<TMessage>): React.ReactNode;
  renderComposer?(props: ComposerProps): React.ReactNode;
  onPressActionButton?(): void;
  icon?: () => React.ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>;
}

export function InputToolbar<TMessage extends IMessage = IMessage>(
  props: InputToolbarProps<TMessage>
) {
  const { renderComposer, renderSend, containerStyle } = props;
  const { theme } = useTheme();

  const composerFragment = useMemo(() => {
    return (
      renderComposer?.(props as ComposerProps) || (
        <Composer
          {...(props as ComposerProps)}
          placeholder="What is the best hotel in Kozhikode?"
        />
      )
    );
  }, [renderComposer, props]);

  return (
    <View style={[styles.container, { backgroundColor: theme.white }]}>
      <View style={[styles.primary]}>
        {composerFragment}
        {renderSend?.(props) || (
          <Send
            {...props}
            containerStyle={{
              backgroundColor: theme.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="SendIcon" stroke={theme.white} size={moderateScale(20)} />
          </Send>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(12),
    marginBottom: moderateScale(8),
    borderRadius: moderateScale(12),
    minHeight: moderateScale(56),
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
