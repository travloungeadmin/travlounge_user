import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/common/ThemedText';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';

interface CoinSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  amount: number;
}

const CoinSuccessModal = ({ visible, onClose, amount }: CoinSuccessModalProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <BlurView intensity={20} style={styles.absolute} />
        <View style={styles.modalContent}>
          <View style={styles.dashedHeader}>
            <ThemedText variant="bodyLargeEmphasized" color="gray900">
              Transaction Successful
            </ThemedText>
          </View>

          <View style={styles.iconContainer}>
            <Image
              source={require('../../assets/images/elite-card/success-check.png')}
              style={styles.checkIcon}
              contentFit="contain"
            />
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.amountRow}>
              <Image
                source={require('../../assets/images/elite-card/elite-coin.png')}
                style={styles.coinIcon}
              />
              <ThemedText variant="headlineEmphasized" color="gray900">
                {amount} Pts
              </ThemedText>
            </View>

            <ThemedText variant="bodySmall" color="gray600" style={styles.transferText}>
              Transferred to Wallet
            </ThemedText>

            <ThemedText variant="labelSmall" color="gray500">
              {new Date().toLocaleString('en-US', {
                day: 'numeric',
                month: 'short',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
            </ThemedText>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.screenPadding,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#E8FBF0', // Light green background from image
    borderRadius: moderateScale(16),
    alignItems: 'center',
    paddingVertical: moderateScale(32),
    borderWidth: 4,
    borderColor: '#00A3FF', // Blue border from image
    position: 'relative',
  },
  dashedHeader: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(24),
    backgroundColor: '#E8FBF0',
  },
  iconContainer: {
    width: moderateScale(120),
    height: moderateScale(120),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(24),
    borderWidth: 1,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    borderRadius: moderateScale(12),
    padding: moderateScale(10),
  },
  checkIcon: {
    width: '120%',
    height: '120%',
  },
  detailsContainer: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#E8FBF0',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
    marginBottom: moderateScale(8),
  },
  coinIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
  },
  transferText: {
    marginBottom: moderateScale(4),
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default CoinSuccessModal;
