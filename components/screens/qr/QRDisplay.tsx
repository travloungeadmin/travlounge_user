import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';
import { useTheme } from '@/hooks';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

type QRDisplayProps = {
  username?: string;
  userId?: number | string;
};

const QRDisplay = ({ username, userId }: QRDisplayProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title} variant="titleLargeEmphasized">
        👋 Hi, {username}
      </ThemedText>
      <ThemedText variant="bodyEmphasized">
        <ThemedText variant="labelLargeEmphasized">
          show this QR code at the counter to pay,{' '}
        </ThemedText>
        redeem points, or use your subscription.
      </ThemedText>
      <View
        style={[
          styles.shadowContainer,
          {
            backgroundColor: theme.primary500,
            shadowColor: theme.primary500,
          },
        ]}>
        <LinearGradient
          style={styles.gradient}
          start={[0, 0]}
          end={[1, 1]}
          colors={[theme.primary400, theme.primary800, theme.primary600, theme.primary800]}>
          <ThemedView backgroundColor="white" style={styles.qrBackground}>
            <QRCode
              value={userId?.toString() || '0'}
              size={SPACING.contentWidth - 6 * SPACING.screenPadding}
              backgroundColor="#fff"
            />
          </ThemedView>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.screenPadding,
    paddingHorizontal: SPACING.screenPadding * 2,
  },
  title: {
    paddingBottom: moderateScale(8),
  },
  shadowContainer: {
    marginTop: SPACING.screenPadding,
    alignSelf: 'center',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 2 * SPACING.screenPadding,
  },
  gradient: {
    alignSelf: 'center',
    padding: SPACING.screenPadding,
    borderRadius: 2 * SPACING.screenPadding,
  },
  qrBackground: {
    backgroundColor: '#fff',
    padding: SPACING.screenPadding,
    borderRadius: SPACING.screenPadding,
  },
});

export default QRDisplay;
