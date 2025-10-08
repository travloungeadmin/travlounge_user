import CustomHeader from '@/old/components/common/custom-header';
import Loading from '@/old/components/common/Loading';
import DeleteCard from '@/old/components/profile/delete-card';
import LogoutCard from '@/old/components/profile/logout-card';
import OfferCardContainer from '@/old/components/profile/offer-card-container';
import SupportCard from '@/old/components/profile/support-card';
import UsageHistoryCard from '@/old/components/profile/usage-history-card';
import UserCard from '@/old/components/profile/user-card';
import { getProfileQuery } from '@/services/query/profile';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const Profile = () => {
  const { data, isLoading } = getProfileQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <CustomHeader isHome={false} title={'Profile'} isBack={true} isWallet={true} />

      <ScrollView>
        <View style={styles.userCardContainer}>
          <UserCard />
          {data?.packages?.length !== 0 && (
            <>
              <UsageHistoryCard packages={data?.packages} />
              {/* <RedeemCard /> */}
            </>
          )}
        </View>
        <OfferCardContainer />
        <View style={styles.supportLogoutContainer}>
          <SupportCard />
          <DeleteCard />
          <LogoutCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userCardContainer: {
    padding: 20,
    gap: 30,
    paddingBottom: 0,
  },
  supportLogoutContainer: {
    paddingHorizontal: 20,
    marginBottom: 70,
    marginTop: 10,
    gap: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
