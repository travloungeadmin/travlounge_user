import { shadow } from '@/constants';
import { Device } from '@/core';
import { useReelsVideoPlayer } from '@/hooks/useReelsVideoPlayer';
import { useTheme } from '@/hooks/useTheme';
import { ReelsProps, VideoItem, VideoPlayerProps } from '@/types/components/service/reels.types';
import { router } from 'expo-router';
import { VideoView } from 'expo-video';
import React, { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { ThemedText } from '../common/ThemedText';
import { VideoControls } from './VideoControls';

const VideoPlayer: React.FC<VideoPlayerProps> = React.memo(
  ({ item, isSelected, isSingle, onChangeSelection, index, onPress }) => {
    const videoSource = item?.video || '';
    const { theme } = useTheme();

    const { player, isPlaying, muted, isPlayerReady, togglePlay, toggleMute } = useReelsVideoPlayer(
      {
        videoSource,
        isSelected,
      }
    );

    const handlePlayPress = useCallback(() => {
      if (!isPlayerReady) return;
      onChangeSelection(index);
      togglePlay();
    }, [isPlayerReady, onChangeSelection, index, togglePlay]);

    return (
      <Pressable
        style={styles.videoContainer}
        onPress={() => {
          player?.pause();
          onPress(index);
        }}
        accessibilityRole="button"
        accessibilityLabel={`Play video ${index + 1}`}
        accessibilityHint="Double tap to play this video in full screen">
        <VideoView
          contentFit="cover"
          style={[
            styles.videoView,
            {
              width: isSingle ? Device.width - 32 : Device.width / 2,
              height: Device.width - 32,
              backgroundColor: theme.backgroundCard,
            },
            shadow,
          ]}
          player={player}
          nativeControls={false}
          allowsPictureInPicture
        />
        <Pressable
          style={styles.controlsOverlay}
          onPress={() => {
            player?.pause();
            onPress(index);
          }}>
          <VideoControls
            isPlaying={isPlaying}
            isMuted={muted}
            isPlayerReady={isPlayerReady}
            onPlayPress={handlePlayPress}
            onMutePress={toggleMute}
          />
        </Pressable>
      </Pressable>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';

const Reels: React.FC<ReelsProps> = ({ header, videos }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme } = useTheme();

  const handleVideoPress = useCallback(
    (index: number) => {
      try {
        router.navigate({
          pathname: '/services/reel',
          params: {
            index: index.toString(),
            videos: JSON.stringify(videos),
            header: header,
          },
        });
      } catch (error) {
        console.warn('Error navigating to reel screen:', error);
      }
    },
    [videos, header]
  );

  const handleSelectionChange = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ThemedText style={styles.headerText} variant="headline" color="gray900">
        Our Social Media Presence
      </ThemedText>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <View style={styles.scrollContainer}>
          {videos.map((item: VideoItem, index: number) => (
            <VideoPlayer
              key={`video-${index}-${item.video}`}
              onPress={handleVideoPress}
              index={index}
              isSingle={videos.length === 1}
              isSelected={selectedIndex === index}
              item={item}
              onChangeSelection={handleSelectionChange}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Reels;

const styles = StyleSheet.create({
  container: {
    // marginBottom: 20,
  },
  headerText: {
    marginLeft: 16,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    gap: 16,
    flexDirection: 'row',
  } as ViewStyle,
  videoContainer: {
    marginTop: 12,
    marginBottom: 30,
    borderRadius: 8,
    overflow: 'hidden',
  } as ViewStyle,
  videoView: {
    backgroundColor: '#fff',
    borderRadius: 8,
  } as ViewStyle,
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  } as ViewStyle,
});
