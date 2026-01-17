import ScreenWrapper from '@/components/common/ScreenWrapper';
import SubscriptionCard from '@/components/screens/subscription/SubscriptionCard';
import SubscriptionEmpty from '@/components/screens/subscription/SubscriptionEmpty';
import SubscriptionHeader from '@/components/screens/subscription/SubscriptionHeader';
import SubscriptionSkeleton from '@/components/screens/subscription/SubscriptionSkeleton';
import { SPACING } from '@/newConstants/spacing';
import { useGetPackagesSubscriptionQuery } from '@/services/query/subscription';
import { useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

const SubscriptionScreen = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useGetPackagesSubscriptionQuery(
    id === '[id]' ? undefined : String(id)
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <FlatList
              data={[1]}
              renderItem={() => <SubscriptionSkeleton />}
              contentContainerStyle={styles.listContent}
            />
          </View>
        ) : (
          <FlatList
            ListHeaderComponent={() => <SubscriptionHeader />}
            contentContainerStyle={styles.flatListContent}
            data={data?.packages || []}
            renderItem={({ item }) => <SubscriptionCard subscription={item} />}
            ListEmptyComponent={<SubscriptionEmpty />}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.screenPadding,
    flex: 1,
    paddingTop: 0,
  },
  loadingContainer: {
    marginTop: SPACING.screenPadding,
  },
  listContent: {
    gap: SPACING.screenPadding,
  },
  flatListContent: {
    gap: SPACING.screenPadding,
    paddingTop: SPACING.screenPadding,
    flexGrow: 1,
  },
});

export default SubscriptionScreen;
