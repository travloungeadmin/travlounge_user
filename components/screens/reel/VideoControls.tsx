import { Feather, Octicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  onPlayPress: () => void;
  onMutePress: () => void;
  bottom: number;
}

export const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  isMuted,
  onPlayPress,
  onMutePress,
  bottom,
}) => {
  return (
    <>
      <Pressable onPress={onPlayPress} style={[styles.controlButton, { bottom, right: 20 }]}>
        <Feather name={isPlaying ? 'pause' : 'play'} size={24} color={'#fff'} />
      </Pressable>
      <Pressable onPress={onMutePress} style={[styles.controlButton, { bottom, right: 78 }]}>
        <Octicons name={isMuted ? 'mute' : 'unmute'} size={24} color={'#fff'} />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  controlButton: {
    height: 48,
    width: 48,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 4,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },
});
