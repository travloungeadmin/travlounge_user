import { useTheme } from '@/hooks/useTheme';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface ErrorViewProps {
  error?: Error | string | null;
  onRetry?: () => void;
  title?: string;
  message?: string;
  style?: ViewStyle;
}

export function ErrorView({
  error,
  onRetry,
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  style,
}: ErrorViewProps) {
  const { theme } = useTheme();

  return (
    <ThemedView backgroundColor="backgroundTop" style={[styles.container, style]}>
      <View style={[styles.iconContainer, { backgroundColor: theme.error + '1A' }]}>
        <Feather name="alert-triangle" size={moderateScale(60)} color={theme.error} />
      </View>

      <ThemedText variant="titleLarge" style={styles.title}>
        {title}
      </ThemedText>

      <ThemedText variant="body" style={[styles.message, { color: theme.gray500 }]}>
        {message}
      </ThemedText>

      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          style={[styles.button, { backgroundColor: theme.primary }]}
          activeOpacity={0.8}>
          <Feather
            name="refresh-cw"
            size={moderateScale(16)}
            color={theme.white}
            style={styles.buttonIcon}
          />
          <ThemedText color={'white'} variant="labelLarge">
            Try Again
          </ThemedText>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.large,
  },
  iconContainer: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  title: {
    textAlign: 'center',
    marginBottom: SPACING.small,
  },
  message: {
    textAlign: 'center',
    marginBottom: SPACING.large,
    lineHeight: 22,
    maxWidth: '80%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.extraLarge,
    borderRadius: SPACING.medium,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonIcon: {
    marginRight: SPACING.small,
  },
});
