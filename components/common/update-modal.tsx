import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { Column } from '@/core/column';
import { Text } from '@/core/text';
import { colors } from '@/theme/colors';

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
  return (
    <Modal visible={visible} animationType="fade" transparent statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Column gap={20}>
            <Text preset="POP_18_SB" color={colors.textPrimary} style={styles.title}>
              {isForceUpdate ? 'Update Required' : 'Update Available'}
            </Text>

            <Text preset="POP_14_R" color={colors.textPrimaryDescription} style={styles.message}>
              {isForceUpdate
                ? 'A new version of the app is required to continue. Please update to the latest version.'
                : 'A new version of the app is available. Update now to get the latest features and improvements.'}
            </Text>

            <Column gap={12}>
              <Pressable style={styles.primaryButton} onPress={onUpdate}>
                <Text preset="POP_16_SB" color={colors.textTertiary}>
                  {isForceUpdate ? 'Update Now' : 'Update'}
                </Text>
              </Pressable>
              {!isForceUpdate && onLater && (
                <Pressable style={styles.secondaryButton} onPress={onLater}>
                  <Text preset="POP_16_SB" color={colors.textPrimaryDescription}>
                    Later
                  </Text>
                </Pressable>
              )}
            </Column>
          </Column>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: colors.cardBackgroundPrimary,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
  },
  primaryButton: {
    height: 44,
    backgroundColor: colors.cardBackgroundSecondary,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.cardBackgroundSecondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  secondaryButton: {
    height: 44,
    backgroundColor: 'transparent',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderPrimary,
  },
});
