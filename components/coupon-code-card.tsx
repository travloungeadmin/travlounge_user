import { shadow } from '@/constants';
import { Box, Pressable, Row } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import { getCouponQuery } from '@/services/query/service';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { ThemedText } from './common/ThemedText';

type propsType = {
  id: number;
  description: string;
  title: string;
};

const CouponCodeCard = (props: propsType) => {
  const { id, description, title } = props;
  const { theme } = useTheme();

  const [isVisible, setIsVisible] = React.useState(false);
  const { data, isLoading, refetch, isFetching } = getCouponQuery({ id: id });

  React.useEffect(() => {
    if (isVisible) {
      refetch();
    }
  }, [isVisible]);

  return (
    <Box
      style={[
        {
          borderRadius: 8,
          // overflow: "hidden",
          marginHorizontal: 16,
          marginBottom: 20,
          backgroundColor: '#F8FAFC',
        },
        shadow,
      ]}>
      <Row>
        <Box
          style={{
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: isVisible ? 0 : 8,
            width: 18,
            backgroundColor: 'rgba(37, 61, 143, 1)',
          }}></Box>
        <Box
          style={{
            backgroundColor: '#F8FAFC',
            padding: 16,
            paddingLeft: 10,
            flex: 1,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          }}>
          <Row
            style={{
              flex: 1,
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <ThemedText variant="bodyEmphasized" color="gray900">
              {title}
            </ThemedText>
            <Pressable onPress={() => setIsVisible((prev) => !prev)}>
              <ThemedText variant="bodyEmphasized" color="primary">
                View Code
              </ThemedText>
            </Pressable>
          </Row>
          <ThemedText variant="label" color="gray600">
            {description}
          </ThemedText>
        </Box>
      </Row>
      {isVisible && (
        <Box
          style={{
            backgroundColor: theme.backgroundCard,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 8,
            borderBottomRightRadius: 8,
            borderTopWidth: 1,
            borderColor: theme.gray300,
            height: 40,
            borderBottomLeftRadius: 8,
          }}>
          <ThemedText variant="bodySmall" color="gray900">
            {isFetching ? <ActivityIndicator size={14} color={theme.gray900} /> : data?.data}
          </ThemedText>
        </Box>
      )}
    </Box>
  );
};

export default CouponCodeCard;

const styles = StyleSheet.create({});
