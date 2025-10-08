import { VideoItem } from '@/components/screens/reel/VideoItem';
import { VideoItem as VideoItemType } from '@/types/screens/services/reel.types';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, ViewToken } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Reel = () => {
  const flatListRef = useRef<FlatList<VideoItemType>>(null);
  const { index, videos } = useLocalSearchParams();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Parse videos data
  const list = useMemo(() => {
    try {
      if (typeof videos === 'string') {
        return JSON.parse(videos);
      }
      if (Array.isArray(videos) && videos.length > 0) {
        return JSON.parse(videos[0]);
      }
      return [];
    } catch (error) {
      console.warn('Error parsing videos:', error);
      return [];
    }
  }, [videos]);

  // Parse initial index
  const initialIndex = useMemo(() => {
    try {
      if (typeof index === 'string') {
        return parseInt(index, 10) || 0;
      }
      if (Array.isArray(index) && index.length > 0) {
        return parseInt(index[0], 10) || 0;
      }
      return 0;
    } catch (error) {
      console.warn('Error parsing initial index:', error);
      return 0;
    }
  }, [index]);

  // Handle viewable items change
  const onViewRef = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      const firstVisibleIndex = viewableItems[0].index ?? 0;
      setCurrentIndex(firstVisibleIndex);
    }
  });

  // Viewability configuration
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  // Handle navigation and scroll initialization
  const navigation = useNavigation();

  useEffect(() => {
    let mounted = true;
    let scrollTimer: NodeJS.Timeout;

    const initializeScroll = () => {
      if (!mounted || !flatListRef.current || !list.length) return;

      const targetIndex = Math.min(initialIndex, list.length - 1);
      try {
        flatListRef.current.scrollToIndex({
          index: targetIndex,
          animated: false,
          viewPosition: 0,
        });
      } catch (error) {
        console.warn('Error during initial scroll:', error);
      }
    };

    // Add a focus listener for when returning to the screen
    const unsubscribe = navigation.addListener('focus', () => {
      scrollTimer = setTimeout(initializeScroll, 100);
    });

    // Initial scroll
    scrollTimer = setTimeout(initializeScroll, 100);

    return () => {
      mounted = false;
      if (scrollTimer) clearTimeout(scrollTimer);
      unsubscribe();
    };
  }, [initialIndex, list.length, navigation]);

  // Error boundary for scroll failures
  const handleScrollToIndexFailed = useCallback(
    (info: { index: number; highestMeasuredFrameIndex: number; averageItemLength: number }) => {
      console.warn('Failed to scroll to index', info);
      const fallbackIndex = Math.min(info.highestMeasuredFrameIndex, list.length - 1);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: fallbackIndex,
          animated: false,
        });
      }
    },
    [list.length]
  );

  return (
    <FlatList
      ref={flatListRef}
      onScrollToIndexFailed={handleScrollToIndexFailed}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
      pagingEnabled
      removeClippedSubviews={false} // Disable this to prevent Android issues
      windowSize={2}
      maxToRenderPerBatch={1}
      initialNumToRender={1}
      getItemLayout={(_, index) => ({
        length: SCREEN_HEIGHT,
        offset: SCREEN_HEIGHT * index,
        index,
      })}
      snapToInterval={SCREEN_HEIGHT}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      bounces={false}
      overScrollMode="never"
      scrollEventThrottle={16}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item, index }) => (
        <VideoItem
          key={`video-${item.id || index}`}
          isSelected={currentIndex === index}
          item={item}
        />
      )}
      data={list}
      keyExtractor={(item, index) => `video-${item.id || index}`}
    />
  );
};

export default Reel;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#000',
  },
  contentContainer: {
    // minHeight: SCREEN_HEIGHT, // Ensure minimum height
  },
});
