import { useTheme } from '@/hooks/useTheme';
// ...
export const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  isMuted,
  isPlayerReady,
  onPlayPress,
  onMutePress,
}) => {
  const { theme } = useTheme();
  return (
    <>
      <Pressable
        onPress={onPlayPress}
        style={styles.playButton}
        disabled={!isPlayerReady}
        accessibilityRole="button"
        accessibilityLabel={isPlaying ? 'Pause video' : 'Play video'}
        accessibilityHint={isPlaying ? 'Double tap to pause' : 'Double tap to play'}>
        <Feather name={isPlaying ? 'pause' : 'play'} size={24} color={theme.white} />
      </Pressable>
      <Pressable
        onPress={onMutePress}
        style={styles.muteButton}
        disabled={!isPlayerReady}
        accessibilityRole="button"
        accessibilityLabel={isMuted ? 'Unmute video' : 'Mute video'}
        accessibilityHint={isMuted ? 'Double tap to unmute' : 'Double tap to mute'}>
        <Octicons name={isMuted ? 'mute' : 'unmute'} size={24} color={theme.white} />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  playButton: {
    height: 48,
    width: 48,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 4,
    position: 'absolute',
    bottom: 7,
    left: 7,
    alignItems: 'center',
    zIndex: 99,
    justifyContent: 'center',
  } as ViewStyle,
  muteButton: {
    height: 48,
    width: 48,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 4,
    position: 'absolute',
    bottom: 7,
    left: 63,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  } as ViewStyle,
});
