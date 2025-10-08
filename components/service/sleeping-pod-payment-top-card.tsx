import { shadow } from '@/constants';
import { Box, Image, Row, Text } from '@/core';
import { colors } from '@/theme';
import { convertTimeTo12Hour, formatDateToDMY } from '@/utils/string';
import { StyleSheet } from 'react-native';

type propsType = {
  id: string;
  image: string;
  name: string;
  location: string;
  date: string;
  time: string;
  duration: number;
  isToloo?: boolean;
  service_name?: string;
};

const SleepingPodPaymentTopCard = (props: propsType) => {
  const { id, image, name, location, date, time, duration, isToloo, service_name } = props;

  return (
    <Box style={[styles.topCard, shadow]}>
      <Row gap={20}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />
        <Box style={styles.centeredBox} gap={4}>
          <Text preset="POP_16_SB" color="#333333">
            {name}
          </Text>
          {location && (
            <Text preset="POP_12_R" color="rgba(51, 51, 51, 1)">
              {location}
            </Text>
          )}
        </Box>
      </Row>
      {!isToloo && (
        <>
          <Box style={styles.divider} />
          <Row style={styles.spaceBetween}>
            <Box gap={4}>
              <Text preset="POP_12_M" color="rgba(34, 49, 63, 0.8)">
                {service_name === 'car_wash' ? 'Booked Date' : 'Check-in Date'}
              </Text>
              <Text preset="POP_14_M" color="#333333">
                {date ? formatDateToDMY(date) : ''}
              </Text>
            </Box>
            <Box gap={4}>
              <Text preset="POP_12_M" color="rgba(34, 49, 63, 0.8)">
                Arrival Time
              </Text>
              <Text preset="POP_14_M" color="#333333">
                {time ? convertTimeTo12Hour(time) : ''}
              </Text>
            </Box>
            {duration > 0 && (
              <Box gap={4}>
                <Text preset="POP_12_M" color="rgba(34, 49, 63, 0.8)">
                  Duration
                </Text>
                <Text preset="POP_14_M" color="#333333">
                  {duration} Hours
                </Text>
              </Box>
            )}
          </Row>
        </>
      )}
    </Box>
  );
};

export default SleepingPodPaymentTopCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  topCard: {
    padding: 16,
    margin: 16,
    backgroundColor: colors.cardBackgroundPrimary,
    borderRadius: 8,
    gap: 16,
  },
  image: {
    width: 47,
    height: 47,
    borderRadius: 4,
  },
  centeredBox: {
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(37, 61, 143, 0.3)',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  rulesTitle: {
    margin: 16,
    textAlign: 'center',
  },
});
