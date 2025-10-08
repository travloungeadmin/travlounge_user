import CustomHeader from '@/old/components/common/custom-header';
import PackageCard from '@/old/components/profile/package-card';
import { getPackagesListQuery } from '@/services/query/home';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const Package = () => {
  const { packageDetails, isPlans, plans } = useLocalSearchParams();
  const { data } = getPackagesListQuery();

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#F3F7FA', '#E6EAED']} style={{ flex: 1 }}>
        <CustomHeader
          isHome={false}
          title={isPlans ? 'Best plans' : 'Add Offer'}
          isBack={true}
          isWallet={true}
        />
        <ScrollView>
          {isPlans ? (
            data.map((item) => (
              <View style={{ padding: 15 }}>
                <PackageCard item={item} />
              </View>
            ))
          ) : (
            <View style={{ padding: 15 }}>
              <PackageCard item={JSON.parse(packageDetails)} />
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default Package;

const styles = StyleSheet.create({});
