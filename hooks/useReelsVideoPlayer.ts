import { useEvent } from 'expo';
import { useFocusEffect } from 'expo-router';
import { useVideoPlayer } from 'expo-video';
import { useCallback, useEffect, useState } from 'react';

interface UseVideoPlayerProps {
  videoSource: string;
  isSelected: boolean;
}

export const useReelsVideoPlayer = ({
  videoSource,
  isSelected,
}: UseVideoPlayerProps): {
  player: ReturnType<typeof useVideoPlayer>;
  isPlaying: boolean;
  muted: boolean;
  isPlayerReady: boolean;
  isVideoEnded: () => boolean;
  togglePlay: () => void;
  toggleMute: () => void;
} => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const player = useVideoPlayer(videoSource, (player) => {
    setIsPlayerReady(true);
    player.muted = true;
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const { muted } = useEvent(player, 'mutedChange', { muted: player.muted });

  // Check if video has ended and reset to beginning for replay
  const isVideoEnded = useCallback(() => {
    try {
      return (
        player.status === 'readyToPlay' &&
        player.currentTime >= player.duration &&
        player.duration > 0
      );
    } catch (error) {
      console.warn('Error checking video end state:', error);
      return false;
    }
  }, [player.status, player.currentTime, player.duration]);

  const togglePlay = useCallback(() => {
    try {
      if (!isPlayerReady || !player) return;

      if (isVideoEnded()) {
        player.currentTime = 0;
        player.play();
      } else if (isPlaying) {
        player.pause();
      } else {
        player.play();
      }
    } catch (error) {
      console.warn('Error controlling video playback:', error);
    }
  }, [isPlayerReady, player, isPlaying, isVideoEnded]);

  const toggleMute = useCallback(() => {
    try {
      if (!isPlayerReady || !player) return;
      player.muted = !muted;
    } catch (error) {
      console.warn('Error toggling video mute:', error);
    }
  }, [isPlayerReady, player, muted]);

  // Handle video playback based on selection
  useEffect(() => {
    if (!isPlayerReady) return;

    try {
      if (isSelected) {
        player.play();
      } else {
        player.pause();
      }
    } catch (error) {
      console.warn('Error controlling video player:', error);
    }
  }, [isSelected, isPlayerReady, player]);

  // Handle screen focus changes
  useFocusEffect(
    useCallback(() => {
      return () => {
        try {
          if (isPlayerReady && isPlaying && player) {
            player.pause();
          }
        } catch (error) {
          console.warn('Error pausing video on focus loss:', error);
        }
      };
    }, [isPlaying, player, isPlayerReady])
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      try {
        if (isPlayerReady && player) {
          player.pause();
        }
      } catch (error) {
        console.warn('Error during video player cleanup:', error);
      }
    };
  }, [player, isPlayerReady]);

  return {
    player,
    isPlaying,
    muted,
    isPlayerReady,
    isVideoEnded,
    togglePlay,
    toggleMute,
  };
};
