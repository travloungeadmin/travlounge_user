import { useTheme } from '@/newTheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  // Define icons for routes
  const icons: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
    index: 'home',
    qr: 'qrcode',
    'make-a-trip': 'map-marker-radius',
  };

  const labels: Record<string, string> = {
    index: 'Home',
    qr: 'QR',
    'make-a-trip': 'Make a Trip',
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 10 }]}>
      <View style={[styles.tabBar, { backgroundColor: theme.backgroundCard }]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.tabItem,
                isFocused && { backgroundColor: theme.primary + '20' }, // 20% opacity primary for active bg
              ]}>
              <MaterialCommunityIcons
                name={icons[route.name] || 'circle'}
                size={24}
                color={isFocused ? theme.primary : theme.gray500}
              />
              <Text style={[styles.label, { color: isFocused ? theme.primary : theme.gray500 }]}>
                {labels[route.name] || route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    // Transparent container to allow content behind
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 35,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    width: 'auto', // Allow growing based on content/min-width
    minWidth: 200,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  tabItem: {
    flexDirection: 'row', // Or column depending on exact look, image showed row for label+icon or stacked?
    // Image showed: icon top, text bottom OR icon left, text right.
    // Wait, the image showed: [ (Icon Home) ]  (Icon Settings)
    // Actually the image showed two items: one active with pill shape (Icon + Text), one inactive (Icon + Text).
    // Let's look closer at the image description: "Floating capsule... Active indicator pill".
    // Usually active is: pill shape with text. Inactive: just icon? Or both?
    // The user's image shows: Left Item (Home) has a light grey background pill. Right item (Settings) has no background.
    // Both have Icon above Text.
    // Let's implement Column layout for items, but verify the pill.
    // The pill in the image surrounds the item.
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});
