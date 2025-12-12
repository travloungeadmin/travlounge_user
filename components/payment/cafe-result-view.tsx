import { Box, Device, Image, Row, Text as ThemedText } from '@/core';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface CafeItem {
  id: string;
  name: string;
  count: number;
}

interface CafeResultViewProps {
  data: CafeItem[];
  image: string;
  name: string;
  location?: string;
}

const CafeResultView: React.FC<CafeResultViewProps> = ({
  data,

  image,
  name,
  location,
}) => {
  const totalCount = data.reduce((acc, item) => acc + item.count, 0);

  const listHeaderComponent = () => (
    <Row style={{ marginBottom: 10 }} gap={20}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
      />
      <Box style={styles.centeredBox} gap={4}>
        <ThemedText preset="POP_16_SB" color="#333333">
          {name}
        </ThemedText>
        {location && (
          <ThemedText preset="POP_12_R" color="rgba(51, 51, 51, 1)">
            {location}
          </ThemedText>
        )}
      </Box>
    </Row>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.totalText}>Total</Text>
      <Text style={styles.totalText}>{totalCount}</Text>
    </View>
  );

  const renderItem = ({ item, index }: { item: CafeItem; index: number }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemLeftSection}>
        <View style={styles.indexContainer}>
          <Text style={styles.indexText}>{index + 1}</Text>
        </View>
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
      <Text style={styles.itemCount}>{item.count}</Text>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={listHeaderComponent}
      scrollEnabled={false}
      contentContainerStyle={styles.container}
      data={data}
      ListFooterComponent={renderFooter}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default CafeResultView;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 20,
    width: Device.width - 40,
    backgroundColor: '#fff',
  },
  footerContainer: {
    paddingVertical: 5,
    paddingTop: 15,
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: 'rgba(37, 61, 143, 0.3)',
  },
  totalText: {
    color: '#253D8F',
    fontSize: 16,
    fontWeight: '600',
  },
  itemContainer: {
    paddingVertical: 5,
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemLeftSection: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  indexContainer: {
    backgroundColor: '#66A1F4',
    height: 35,
    width: 35,
    borderRadius: 17.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  itemName: {
    color: '#253D8F',
    fontSize: 16,
    fontWeight: '600',
  },
  itemCount: {
    color: '#253D8F',
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
    width: 47,
    height: 47,
    borderRadius: 4,
  },
  centeredBox: {
    justifyContent: 'center',
  },
});
