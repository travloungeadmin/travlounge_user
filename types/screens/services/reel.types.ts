export interface VideoItem {
  video: string;
  id?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  duration?: number;
  [key: string]: any;
}

export interface RenderItemProps {
  item: VideoItem;
  isSelected: boolean;
}

export interface ReelScreenParams {
  index: string | string[];
  videos: string | string[];
}

export interface ReelState {
  currentIndex: number;
  isLoading: boolean;
  error: string | null;
}
