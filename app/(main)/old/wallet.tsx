import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
// import { AddMoneyCard, CustomHeader, WalletCard } from "../components";
import CustomHeader from '@/old/components/common/custom-header';
import AddMoneyCard from '@/old/components/wallet/add-money-card';
import WalletCard from '@/old/components/wallet/wallet-card';
import { getWalletQuery } from '@/services/query/wallet';
import { LinearGradient } from 'expo-linear-gradient';

const Wallet = () => {
  const { data, isLoading, refetch } = getWalletQuery();
  const [isAddMoneyClicked, setIsAddMoneyClicked] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#F3F7FA', '#E6EAED']} angle={180} style={{ flex: 1 }}>
        <CustomHeader isHome={false} title={'Wallet'} isBack={true} isWallet={false} />
        <View style={{ padding: 20, gap: 30 }}>
          <WalletCard
            data={data}
            isLoading={isLoading}
            isAddMoneyClicked={isAddMoneyClicked}
            setIsAddMoneyClicked={setIsAddMoneyClicked}
          />
          {isAddMoneyClicked && (
            <AddMoneyCard
              onPress={() => {
                refetch();
                setIsAddMoneyClicked(false);
              }}
            />
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({});
