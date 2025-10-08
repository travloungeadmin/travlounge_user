import { Device } from '@/core';
import { useReelVideoPlayer } from '@/hooks/reel/useReelVideoPlayer';
import { RenderItemProps } from '@/types/screens/services/reel.types';
import { useFocusEffect } from 'expo-router';
import { VideoView } from 'expo-video';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VideoControls } from './VideoControls';

export const VideoItem: React.FC<RenderItemProps> = ({ item, isSelected }) => {
  const { top, bottom } = useSafeAreaInsets();
  const videoSource = item?.video || '';

  const { player, isPlaying, muted, togglePlay, toggleMute } = useReelVideoPlayer({
    videoSource,
    isSelected,
  });

  // Handle screen focus changes
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (player && isPlaying) {
          try {
            player?.pause();
          } catch (error) {
            console.warn('Error pausing video on focus loss:', error);
          }
        }
      };
    }, [isPlaying, player])
  );

  return (
    <View>
      <VideoView
        contentFit="cover"
        style={{
          width: '100%',
          height: Device.height - top - 50,
          backgroundColor: '#fff',
        }}
        player={player}
        nativeControls={false}
        allowsPictureInPicture
      />
      <VideoControls
        isPlaying={isPlaying}
        isMuted={muted}
        onPlayPress={togglePlay}
        onMutePress={toggleMute}
        bottom={bottom || 20}
      />
    </View>
  );
};
