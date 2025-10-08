export type DrawerItem = {
  id: string;
  title: string;
  icon?: React.ReactNode;
  iconName?: string;
  iconFamily?: 'FontAwesome' | 'MaterialIcons' | 'Entypo';
  onPress: () => void;
  pathName?: string;
  separator?: boolean;
};

export type RightDrawerProps = {
  visible: boolean;
  onClose: () => void;
  items?: DrawerItem[];
  pathName?: string;
};
