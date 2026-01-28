import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

interface UsePaymentTimerProps {
  requestedAt: string;
  requestId: string;
  onExpire?: () => void;
}

interface TimeRemaining {
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalSeconds: number;
}

const TIMER_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const STORAGE_KEY_PREFIX = 'payment_timer_';

export const usePaymentTimer = ({
  requestedAt,
  requestId,
  onExpire,
}: UsePaymentTimerProps): TimeRemaining => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    minutes: 5,
    seconds: 0,
    isExpired: false,
    totalSeconds: 300,
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const storageKey = `${STORAGE_KEY_PREFIX}${requestId}`;

    const initializeTimer = async () => {
      try {
        // Check if we have a stored expiry time for this request
        const storedExpiryTime = await AsyncStorage.getItem(storageKey);

        let expiryTime: number;

        if (storedExpiryTime) {
          // Use stored expiry time
          expiryTime = parseInt(storedExpiryTime, 10);
        } else {
          // Calculate new expiry time based on requested_at
          const requestedTime = new Date(requestedAt).getTime();
          expiryTime = requestedTime + TIMER_DURATION;

          // Store the expiry time
          await AsyncStorage.setItem(storageKey, expiryTime.toString());
        }

        // Calculate remaining time
        const calculateTimeRemaining = () => {
          const now = Date.now();
          const remaining = Math.max(0, expiryTime - now);
          const totalSeconds = Math.floor(remaining / 1000);
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
          const isExpired = remaining <= 0;

          setTimeRemaining({
            minutes,
            seconds,
            isExpired,
            totalSeconds,
          });

          if (isExpired) {
            clearInterval(intervalId);
            // Clean up storage
            AsyncStorage.removeItem(storageKey);
            // Call onExpire callback
            onExpire?.();
          }
        };

        // Initial calculation
        calculateTimeRemaining();

        // Update every second
        intervalId = setInterval(calculateTimeRemaining, 1000);
      } catch (error) {
        console.error('Error initializing payment timer:', error);
      }
    };

    initializeTimer();

    // Cleanup
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [requestedAt, requestId, onExpire]);

  return timeRemaining;
};

// Utility function to clear expired timers
export const clearExpiredTimers = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const timerKeys = keys.filter((key) => key.startsWith(STORAGE_KEY_PREFIX));

    const now = Date.now();
    const keysToRemove: string[] = [];

    for (const key of timerKeys) {
      const expiryTime = await AsyncStorage.getItem(key);
      if (expiryTime && parseInt(expiryTime, 10) < now) {
        keysToRemove.push(key);
      }
    }

    if (keysToRemove.length > 0) {
      await AsyncStorage.multiRemove(keysToRemove);
    }
  } catch (error) {
    console.error('Error clearing expired timers:', error);
  }
};
