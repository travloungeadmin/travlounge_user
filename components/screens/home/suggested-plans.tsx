import { ThemedText } from '@/components/common/ThemedText';
import Icon from '@/components/ui/icon';

import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { useTheme } from '@/newTheme';
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

// Define a type for Package if not available globally
interface Package {
  id: number;
  package_name: string;
  price: number;
  description?: string;
  // Add other fields as needed based on API response
}

interface SuggestedPlansProps {
  packages?: Package[];
}

const SuggestedPlans: React.FC<SuggestedPlansProps> = ({ packages }) => {
  const { theme } = useTheme();
  if (!packages || packages.length === 0) {
    return null;
  }
  const renderItem = ({ item }: { item: Package }) => {
    return (
      <Pressable
        onPress={() => {
          router.navigate(`/subscription/${item.id}`);
        }}
        style={[
          styles.cardContainer,
          packages.length > 1 && {
            width: SPACING.contentWidth - moderateScale(30),
          },
        ]}>
        <LinearGradient
          colors={[theme.primary800, theme.primary600]} // Approx blue gradient from screenshot
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0, y: 0.5 }}
          style={styles.card}>
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
            <Icon name="SubscriptionBg" width={'100%'} height={'100%'} />
          </View>
          <View style={styles.leftContent}>
            <ThemedText style={styles.price} variant="headline" color="secondary">
              {Math.floor(item.price) || 'Free'}
            </ThemedText>
          </View>

          <View style={styles.centerContent}>
            <ThemedText variant="bodyEmphasized" color="white" numberOfLines={2}>
              {item.price != 0
                ? `Get the ${item.package_name} for just ₹${item.price}`
                : `Enjoy premium comfort.`}
            </ThemedText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <ThemedText variant="bodySmall" color="white" style={styles.subtitle}>
                Don't miss out
              </ThemedText>
              <View style={styles.rightContent}>
                <ThemedText variant="bodyLargeEmphasized" color="secondary">
                  Get Now
                </ThemedText>
                <Entypo name="chevron-right" size={moderateScale(20)} color={theme.secondary} />
              </View>
            </View>
          </View>
        </LinearGradient>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={packages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ width: moderateScale(12) }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: moderateScale(20),
  },
  listContent: {
    paddingHorizontal: SPACING.screenPadding,
  },
  cardContainer: {
    width: SPACING.contentWidth,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(16),
    borderRadius: moderateScale(12),
    height: moderateScale(80),
  },
  leftContent: {
    marginRight: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    fontSize: moderateScale(32),
    // specific styling for the 3D-ish gold text could go here
    // using color="secondary" which is usually gold/yellow in this app context based on home-status-cards
    fontWeight: '900',
    fontStyle: 'italic',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    color: '#FFD700', // Hardcoding gold for safety
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  subtitle: {
    opacity: 0.8,
    marginTop: moderateScale(2),
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: moderateScale(8),
  },
});

export default SuggestedPlans;
