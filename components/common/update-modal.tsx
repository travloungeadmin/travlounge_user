import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Column } from '@/core/column';
import { Text } from '@/core/text';
import { useTheme } from '@/hooks/useTheme';

interface UpdateModalProps {
  visible: boolean;
  isForceUpdate: boolean;
  onUpdate: () => void;
  onLater?: () => void;
}

export const UpdateModal: React.FC<UpdateModalProps> = ({
  visible,
  isForceUpdate,
  onUpdate,
  onLater,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Define snap points
  const snapPoints = useMemo(() => ['60%'], []);

  // Control bottom sheet visibility
  useEffect(() => {
    if (visible) {
      // Small delay to ensure the component is mounted
      const timer = setTimeout(() => {
        bottomSheetRef.current?.snapToIndex(0);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  // Render backdrop - only allow dismiss if not force update
  const renderBackdrop = useMemo(
    () => (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior={isForceUpdate ? 'none' : 'close'}
      />
    ),
    [isForceUpdate]
  );

  const handleSheetChanges = useMemo(
    () => (index: number) => {
      console.log('Bottom sheet index changed to:', index);
    },
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={!isForceUpdate}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={isForceUpdate ? styles.hiddenHandle : styles.handleIndicator}
      onChange={handleSheetChanges}
      enableDynamicSizing={false}>
      <BottomSheetView style={styles.contentContainer}>
        <Column gap={24} style={styles.content}>
          {/* Rocket Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.rocketWrapper}>
              <Text style={styles.rocketIcon}>🚀</Text>
            </View>
          </View>

          {/* Title */}
          <Text preset="POP_24_B" color={theme.gray900} style={styles.title}>
            Please Update to Continue
          </Text>

          {/* Description */}
          <Text preset="POP_14_R" color={theme.gray600} style={styles.message}>
            To continue using the app, please update to the latest version.
          </Text>

          <Text preset="POP_14_R" color={theme.gray600} style={styles.message}>
            This update includes performance improvements, bug fixes, and essential enhancements for
            a smoother learning experience.
          </Text>

          {/* Update Button */}
          <Pressable style={styles.primaryButton} onPress={onUpdate}>
            <Text preset="POP_16_SB" color={theme.white}>
              Update Now
            </Text>
          </Pressable>

          {/* Safe message */}
          <Text preset="POP_12_R" color={theme.gray500} style={styles.safeMessage}>
            Your progress and data are safe.
          </Text>
        </Column>
      </BottomSheetView>
    </BottomSheet>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    bottomSheetBackground: {
      backgroundColor: theme.white,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    handleIndicator: {
      backgroundColor: theme.gray300,
      width: 40,
      height: 4,
    },
    hiddenHandle: {
      display: 'none',
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 24,
      paddingBottom: 32,
    },
    content: {
      flex: 1,
      alignItems: 'center',
    },
    iconContainer: {
      marginTop: 8,
      marginBottom: 8,
    },
    rocketWrapper: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: '#E8F0FE',
      justifyContent: 'center',
      alignItems: 'center',
    },
    rocketIcon: {
      fontSize: 64,
    },
    title: {
      textAlign: 'center',
      paddingHorizontal: 16,
    },
    message: {
      textAlign: 'center',
      lineHeight: 22,
      paddingHorizontal: 8,
    },
    primaryButton: {
      width: '100%',
      height: 52,
      backgroundColor: '#2563EB',
      borderRadius: 26,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 8,
      shadowColor: '#2563EB',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    safeMessage: {
      textAlign: 'center',
      marginTop: 4,
    },
  });
