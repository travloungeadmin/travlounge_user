import { useSafeAreaInsets } from '@/core';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import React from 'react';
import CheckBox from './check-box';
import Header from './header';




type PropsType = {
  onSelect: (val: string, index: number, id: string) => void;
  data: { id: number | string; name: string }[];
  enableSearch?: boolean;
  onPressClear?: () => void;
  headerTitle?: string | undefined;
  headerRight?: React.ReactNode;
  selectedValue?: string | number;
  selectedId?: string | number;
  selectedIndex?: number | string;
  onLayout?: (event: any) => void;
};

const SingleSelectList = (props: PropsType) => {
  const {
    onLayout,
    data,
    enableSearch,
    headerRight,
    headerTitle,
    onPressClear,
    onSelect,
    selectedValue,
    selectedId,
    selectedIndex,
  } = props;

  const { bottomHeight } = useSafeAreaInsets();
  const renderListHeader = () => (
    <Header
      enableSearch={enableSearch}
      headerRight={headerRight}
      onPressClear={onPressClear}
      title={headerTitle}
    />
  );

  const renderItem = ({ index, item }) => (
    <CheckBox
      id={item?.id}
      index={index}
      label={item.name}
      onSelect={onSelect}
      selectedValue={selectedValue}
      selectedIndex={selectedIndex}
      selectedId={selectedId}
    />
  );
  return (
    <BottomSheetFlatList
      onLayout={onLayout}
      contentContainerStyle={{ paddingBottom: bottomHeight }}
      ListHeaderComponent={renderListHeader}
      data={data}
      renderItem={renderItem}
    />
  );
};

export default SingleSelectList;
