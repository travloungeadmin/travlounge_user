import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const CustomScreen = ({ children, style }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#F3F7FA', '#E6EAED']} angle={180} style={[{ flex: 1 }, style]}>
        {children}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default CustomScreen;

const styles = StyleSheet.create({});
