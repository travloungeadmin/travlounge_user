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
  pause: () => void;
  resume: () => void;
  isPaused: boolean;
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
    pause: () => {},
    resume: () => {},
    isPaused: false,
  });

  const [isPaused, setIsPaused] = useState(false);
  const [pausedTimeRemaining, setPausedTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const storageKey = `${STORAGE_KEY_PREFIX}${requestId}`;
    const pauseStateKey = `${STORAGE_KEY_PREFIX}${requestId}_paused`;
    const pausedTimeKey = `${STORAGE_KEY_PREFIX}${requestId}_paused_time`;

    const initializeTimer = async () => {
      try {
        // Check if timer was paused
        const storedPauseState = await AsyncStorage.getItem(pauseStateKey);
        const storedPausedTime = await AsyncStorage.getItem(pausedTimeKey);

        if (storedPauseState === 'true' && storedPausedTime) {
          // Timer was paused, restore the paused state
          const remainingMs = parseInt(storedPausedTime, 10);
          const totalSeconds = Math.floor(remainingMs / 1000);
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;

          setIsPaused(true);
          setPausedTimeRemaining(remainingMs);
          setTimeRemaining((prev) => ({
            ...prev,
            minutes,
            seconds,
            totalSeconds,
            isExpired: remainingMs <= 0,
            isPaused: true,
          }));
          return;
        }

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
          if (isPaused) return; // Don't update if paused

          const now = Date.now();
          const remaining = Math.max(0, expiryTime - now);
          const totalSeconds = Math.floor(remaining / 1000);
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
          const isExpired = remaining <= 0;

          setTimeRemaining((prev) => ({
            ...prev,
            minutes,
            seconds,
            isExpired,
            totalSeconds,
            isPaused: false,
          }));

          if (isExpired) {
            clearInterval(intervalId);
            // Clean up storage
            AsyncStorage.multiRemove([storageKey, pauseStateKey, pausedTimeKey]);
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
  }, [requestedAt, requestId, onExpire, isPaused]);

  // Pause function
  const pause = async () => {
    try {
      const storageKey = `${STORAGE_KEY_PREFIX}${requestId}`;
      const pauseStateKey = `${STORAGE_KEY_PREFIX}${requestId}_paused`;
      const pausedTimeKey = `${STORAGE_KEY_PREFIX}${requestId}_paused_time`;

      // Get current expiry time
      const storedExpiryTime = await AsyncStorage.getItem(storageKey);
      if (storedExpiryTime) {
        const expiryTime = parseInt(storedExpiryTime, 10);
        const now = Date.now();
        const remaining = Math.max(0, expiryTime - now);

        // Store paused state and remaining time
        await AsyncStorage.setItem(pauseStateKey, 'true');
        await AsyncStorage.setItem(pausedTimeKey, remaining.toString());

        setIsPaused(true);
        setPausedTimeRemaining(remaining);
      }
    } catch (error) {
      console.error('Error pausing timer:', error);
    }
  };

  // Resume function
  const resume = async () => {
    try {
      const storageKey = `${STORAGE_KEY_PREFIX}${requestId}`;
      const pauseStateKey = `${STORAGE_KEY_PREFIX}${requestId}_paused`;
      const pausedTimeKey = `${STORAGE_KEY_PREFIX}${requestId}_paused_time`;

      if (pausedTimeRemaining !== null) {
        // Calculate new expiry time based on paused remaining time
        const now = Date.now();
        const newExpiryTime = now + pausedTimeRemaining;

        // Update storage
        await AsyncStorage.setItem(storageKey, newExpiryTime.toString());
        await AsyncStorage.multiRemove([pauseStateKey, pausedTimeKey]);

        setIsPaused(false);
        setPausedTimeRemaining(null);
      }
    } catch (error) {
      console.error('Error resuming timer:', error);
    }
  };

  // Update the return value with pause/resume functions
  return {
    ...timeRemaining,
    pause,
    resume,
    isPaused,
  };
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
