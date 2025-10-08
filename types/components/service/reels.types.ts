export interface VideoItem {
  video: string;
  id?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  duration?: number;
  [key: string]: any;
}

export interface VideoPlayerProps {
  item: VideoItem;
  isSelected: boolean;
  isSingle: boolean;
  onChangeSelection: (index: number) => void;
  index: number;
  onPress: (index: number) => void;
}

export interface ReelsProps {
  header: string;
  videos: VideoItem[];
}

export interface VideoPlayerState {
  isPlayerReady: boolean;
  isPlaying: boolean;
  muted: boolean;
  isVideoEnded: boolean;
}
