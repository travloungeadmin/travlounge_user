import ScreenWrapper from '@/components/common/ScreenWrapper';

const StatusScreen = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ThemedText variant="titleLargeEmphasized" color="gray900">
          Status
        </ThemedText>
      </View>
    </ScreenWrapper>
  );
};

export default StatusScreen;
