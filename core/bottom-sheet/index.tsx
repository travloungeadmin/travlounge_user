import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React from 'react';
import { StyleSheet } from 'react-native';

import { useSafeAreaInsets } from '@/core/safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { moderateScale } from '@/lib/responsive-dimensions';

type PropsType = {
  children: React.ReactNode;
  snapPoint?: (string | number)[];
  enableDynamicSizing?: boolean;
  enablePanDownToClose?: boolean;
  handleIndicatorStyle?: any;
  onDismiss?: () => void;
};

const BottomSheet = React.forwardRef((props: PropsType, ref) => {
  const {
    children,
    enableDynamicSizing,
    enablePanDownToClose,
    handleIndicatorStyle,
    snapPoint,
    onDismiss,
  } = props;
  const { bottomHeight } = useSafeAreaInsets();
  const { theme } = useTheme();

  const renderBackdrop = React.useCallback(
    (param: React.PropsWithChildren<BottomSheetBackdropProps>) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.19}
        pressBehavior="close"
        {...param}
        style={styles.backdrop}
      />
    ),
    []
  );

  const snapPoints = React.useMemo(() => snapPoint || ['50%', '75%'], [snapPoint]);

  const animationConfigs = useBottomSheetSpringConfigs({
    duration: 400,
    overshootClamping: true,
  });

  return (
    <BottomSheetModal
      onDismiss={onDismiss}
      animationConfigs={animationConfigs}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.modalBackground}
      enableDynamicSizing={enableDynamicSizing || false}
      enableOverDrag={false}
      enablePanDownToClose={enablePanDownToClose || true}
      {...(!handleIndicatorStyle && { handleComponent: () => null })}
      handleIndicatorStyle={[
        styles.handleIndicator,
        { backgroundColor: theme.backgroundCard },
        handleIndicatorStyle,
      ]}
      index={0}
      ref={ref as React.RefObject<BottomSheetModalMethods>}
      style={[
        styles.modal,
        { backgroundColor: theme.backgroundCard, shadowColor: theme.backgroundCard },
      ]}
      {...(!enableDynamicSizing && { snapPoints })}>
      {children}
      {/* <View style={{ height: bottomHeight }} /> */}
    </BottomSheetModal>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(43, 44, 170,0.8)',
  },

  handleIndicator: {
    // backgroundColor: colors.cardBackgroundPrimary,
  },
  modal: {
    // backgroundColor: colors.cardBackgroundPrimary,
    borderRadius: moderateScale(20),
    overflow: 'hidden',
    // shadowColor: colors.cardBackgroundPrimary,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowRadius: 3.84,
    zIndex: 3,
  },
  modalBackground: {
    backgroundColor: 'transparent',
  },
});
