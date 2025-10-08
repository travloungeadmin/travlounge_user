import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { setUserDetails } from '@/modules/user';
import Loading from '@/old/components/common/Loading';
import BannerContainer from '@/old/components/home/banner-container';
import DetailsCard from '@/old/components/home/details-card';
import PackagesContainer from '@/old/components/home/packagesContainer';
import ServiceContainer from '@/old/components/home/service-container';
import SpecialityContainer from '@/old/components/home/speciality-container';
import { getHomeListQuery } from '@/services/query/home';
// import { getCurrentLocation } from "@/modules/location";

const Home = () => {
  const { data, isFetching, error } = getHomeListQuery();

  React.useEffect(() => {
    if (data?.user) {
      setUserDetails({
        id: data.user.user_id,
        name: data.user.user_name,
        mobile_number: data.user.mobile_number,
      });
    }
  }, [data]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getCurrentLocation();
  //   }, [])
  // );
  if (isFetching) return <Loading />;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {data && (
          <>
            <BannerContainer banners={data?.banners || []} />
            {data.subscription_data.length !== 0 ? <DetailsCard /> : <PackagesContainer />}
          </>
        )}
        <ServiceContainer />
        <SpecialityContainer />
        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingBottom: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSpace: {
    height: 50,
  },
});

export default Home;
