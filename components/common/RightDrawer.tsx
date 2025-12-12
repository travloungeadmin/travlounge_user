import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutRight } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/theme';
import { DrawerItem, RightDrawerProps } from '@/types/components/common/rightDrawer.types';
import { router, usePathname } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.7; // 70% of screen width

const defaultItems: DrawerItem[] = [
  // add home
  {
    id: 'home',
    title: 'Home',
    iconName: 'home',
    iconFamily: 'FontAwesome',
    onPress: () => router.navigate('/'),
    pathName: '/',
  },
  {
    id: 'profile',
    title: 'Profile',
    iconName: 'user',
    iconFamily: 'FontAwesome',
    onPress: () => router.navigate('/profile'),
    pathName: '/profile',
  },
  {
    id: 'bookings',
    title: 'My Bookings',
    iconName: 'book-online',
    iconFamily: 'MaterialIcons',
    onPress: () => router.navigate('/booking-history'),
    pathName: '/booking-history',
  },
];

const RightDrawer: React.FC<RightDrawerProps> = ({ visible, onClose, items = defaultItems }) => {
  const { top, bottom } = useSafeAreaInsets();
  const pathname = usePathname();
  console.log(pathname);

  const handleItemPress = (onPress: () => void) => {
    onPress();
    onClose();
  };

  const renderDrawerItem = (item: DrawerItem) => {
    const isActive = pathname === item.pathName;
    const iconColor = isActive ? colors.iconTertiary : colors.iconSecondary;

    const renderIcon = () => {
      if (item.icon) {
        return item.icon;
      }

      if (item.iconName && item.iconFamily) {
        const iconSize = 20;
        switch (item.iconFamily) {
          case 'FontAwesome':
            return <FontAwesome name={item.iconName as any} size={iconSize} color={iconColor} />;
          case 'MaterialIcons':
            return <MaterialIcons name={item.iconName as any} size={iconSize} color={iconColor} />;
          case 'Entypo':
            return <Entypo name={item.iconName as any} size={iconSize} color={iconColor} />;
          default:
            return null;
        }
      }

      return null;
    };

    return (
      <View key={item.id}>
        <Pressable
          style={[
            styles.drawerItem,
            {
              backgroundColor: isActive ? colors.cardBackgroundSecondary : 'transparent',
            },
          ]}
          onPress={() => handleItemPress(item.onPress)}
          android_ripple={{ color: colors.cardBackgroundPrimary }}>
          <View style={styles.itemContent}>
            <View style={styles.iconContainer}>{renderIcon()}</View>
            <Text
              style={[
                styles.itemText,
                {
                  color: isActive ? colors.textTertiary : colors.textPrimary,
                },
              ]}>
              {item.title}
            </Text>
          </View>
        </Pressable>
        {item.separator && <View style={styles.separator} />}
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}>
      {/* Backdrop */}
      <Animated.View
        style={styles.backdrop}
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(150)}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdropTouchable} />
        </TouchableWithoutFeedback>
      </Animated.View>

      {/* Drawer Content */}
      <Animated.View
        style={[
          styles.drawer,
          {
            // paddingTop: top + 60,
            top: top || 20,
            bottom: bottom || 20,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          },
        ]}
        entering={SlideInRight.duration(300).damping(15)}
        exiting={SlideOutRight.duration(250).damping(15)}>
        {/* Header */}
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerTitle}>Menu</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Entypo name="cross" size={24} color={colors.iconSecondary} />
          </Pressable>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>{defaultItems.map(renderDrawerItem)}</View>

        {/* Footer */}
        {/* <View style={styles.drawerFooter}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View> */}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropTouchable: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    right: 0,

    width: DRAWER_WIDTH,
    backgroundColor: colors.backgroundPrimary,
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.dividerPrimary,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.cardBackgroundPrimary,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 10,
  },
  drawerItem: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 50,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    color: colors.textPrimary,
    marginLeft: 10,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: colors.dividerPrimary,
    marginVertical: 5,
    marginHorizontal: 20,
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.dividerPrimary,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default RightDrawer;
