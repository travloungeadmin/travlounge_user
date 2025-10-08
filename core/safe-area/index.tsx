import { useSafeAreaInsets as Insets } from "react-native-safe-area-context";

export const useSafeAreaInsets = () => ({
  bottomHeight: Insets().bottom,
  topHeight: Insets().top,
  rightHeight: Insets().right,
  leftHeight: Insets().left,
});
