import useUserStore from '@/modules/user';
import { Redirect } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

const Index = () => {
  const { session } = useUserStore();
  if (!session) {
    return <Redirect href="/auth" />;
  }
  return <Redirect href="/(root)/(main)/(tab)" />;
};

export default Index;

const styles = StyleSheet.create({});
