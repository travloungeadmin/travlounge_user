import { ThemedText } from '@/components/common/ThemedText';
import { shadow } from '@/constants';
import { Box, Image, Row } from '@/core';
import { useTheme } from '@/hooks/useTheme';
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
  const { theme } = useTheme();

  return (
    <Box style={[styles.topCard, shadow, { backgroundColor: theme.backgroundCard }]}>
      <Row gap={20}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />
        <Box style={styles.centeredBox} gap={4}>
          <ThemedText variant="bodySmallEmphasized" color="gray800">
            {name}
          </ThemedText>
          {location && (
            <ThemedText variant="label" color="gray800">
              {location}
            </ThemedText>
          )}
        </Box>
      </Row>
      {!isToloo && (
        <>
          <Box style={[styles.divider, { backgroundColor: 'rgba(37, 61, 143, 0.3)' }]} />
          <Row style={styles.spaceBetween}>
            <Box gap={4}>
              <ThemedText variant="label" color="gray600">
                {service_name === 'car_wash' ? 'Booked Date' : 'Check-in Date'}
              </ThemedText>
              <ThemedText variant="label" color="gray800">
                {date ? formatDateToDMY(date) : ''}
              </ThemedText>
            </Box>
            <Box gap={4}>
              <ThemedText variant="label" color="gray600">
                Arrival Time
              </ThemedText>
              <ThemedText variant="label" color="gray800">
                {time ? convertTimeTo12Hour(time) : ''}
              </ThemedText>
            </Box>
            {duration > 0 && (
              <Box gap={4}>
                <ThemedText variant="label" color="gray600">
                  Duration
                </ThemedText>
                <ThemedText variant="label" color="gray800">
                  {duration} Hours
                </ThemedText>
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
  },
  topCard: {
    padding: 16,
    margin: 16,
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
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  rulesTitle: {
    margin: 16,
    textAlign: 'center',
  },
});
