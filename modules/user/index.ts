import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Platform } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { showError } from '@/lib/toast';
import queryClient from '@/services/query';

type UserType = {
  id: string | number;
  mobile_number?: string;
  name?: string;
  image?: string;
};

type State = {
  loggedIn: boolean;
  loggingIn: boolean;
  loginFailed: number;
  isFirstLogin: boolean;
  session: string | null;
  user?: UserType | null;
  refresh?: string | null;
  place?: null | string;
  subPlace?: null | string;
  latitude?: null | number;
  longitude?: null | number;
  isRegistered?: boolean;
  isLocationPermissionGranted?: boolean;
  currentZipCode?: null | string | number;
  currentCountry?: null | string;
  currentState?: null | string;
  isAutoFetchLocation?: boolean;
  isWelcomeBonusClaimed: boolean;
  isLoginFistTime: boolean;
  isProfileComplete: boolean;
};

const initialState: State = {
  isFirstLogin: true,
  loggedIn: false,
  loggingIn: false,
  loginFailed: 0,
  session: null,
  user: null,
  refresh: null,
  place: null,
  subPlace: null,
  isLocationPermissionGranted: false,
  currentZipCode: null,
  currentCountry: null,
  currentState: null,
  latitude: null,
  longitude: null,
  isRegistered: true,
  isAutoFetchLocation: true,
  isWelcomeBonusClaimed: false,
  isLoginFistTime: true,
  isProfileComplete: false,
};

type Action = {
  setFirstLogin: () => void;
  setSession: (session: State['session']) => void;
  setRefresh: (refresh: State['refresh']) => void;
  setUserDetails: (user: UserType | null) => void;
  setFailedLogin: () => void;
  setLoggedIn: (loggedIn: State['loggedIn']) => void;
  reset: () => void;
  setPlaces: (props: { place: string; subPlace: string }) => void;
  setCoordinates: (props: { latitude: number; longitude: number }) => void;
  setRegister: (status: boolean) => void;
  setAutoFetchLocation: (isAutoFetchLocation: boolean) => void;
  setLoginFistTime: (isLoginFistTime: boolean) => void;
  setWelcomeBonusClaimed: (isWelcomeBonusClaimed: boolean) => void;
  setLocationPermissionGranted: (isGranted: boolean) => void;
  setProfileComplete: (isProfileComplete: boolean) => void;
  updateLocation: (props: {
    latitude: number | null;
    longitude: number | null;
    currentZipCode: string | number | null;
    currentCountry: string | null;
    currentState: string | null;
    place: string | null;
    subPlace: string | null;
  }) => void;
};

const useUserStore = create(
  persist<State & Action>(
    (set) => ({
      ...initialState,
      setFirstLogin: () => {
        set((state) => ({ isFirstLogin: !state.isFirstLogin }));
      },
      setSession: (session: State['session']) => {
        set(() => ({ session }));
      },
      setRefresh: (refresh: State['refresh']) => {
        set(() => ({ refresh }));
      },
      setRegister: (status) => {
        set(() => ({ isRegistered: status }));
      },
      setUserDetails: (user: UserType | null) => {
        set((state) => ({
          user: user
            ? {
                ...state.user,
                ...user,
              }
            : null,
        }));
      },
      setLoggedIn: (loggedIn: State['loggingIn']) => {
        set(() => ({ loggedIn }));
      },
      setCoordinates: ({ latitude, longitude }) => {
        set(() => ({ latitude, longitude }));
      },
      updateLocation: ({
        latitude,
        longitude,
        currentZipCode,
        currentCountry,
        currentState,
        place,
        subPlace,
      }) => {
        set(() => ({
          latitude,
          longitude,
          currentZipCode,
          currentCountry,
          currentState,
          place,
          subPlace,
        }));
      },
      setPlaces: ({ place, subPlace }) => {
        set(() => ({ place, subPlace }));
      },
      setFailedLogin: () => {
        set((state) => ({ loginFailed: state.loginFailed + 1 }));
      },
      setAutoFetchLocation: (isAutoFetchLocation: boolean) => {
        set(() => ({ isAutoFetchLocation }));
      },
      setLoginFistTime: (isLoginFistTime: boolean) => {
        set(() => ({ isLoginFistTime }));
      },
      setWelcomeBonusClaimed: (isWelcomeBonusClaimed: boolean) => {
        set(() => ({ isWelcomeBonusClaimed }));
      },
      setLocationPermissionGranted: (isGranted: boolean) => {
        set(() => ({ isLocationPermissionGranted: isGranted }));
      },
      setProfileComplete: (isProfileComplete: boolean) => {
        set(() => ({ isProfileComplete }));
      },
      reset: () => {
        set(() => ({
          isFirstLogin: true,
          loggedIn: false,
          loggingIn: false,
          loginFailed: 0,
          session: null,
          user: null,
          refresh: null,
          place: null,
          subPlace: null,
          latitude: null,
          longitude: null,
          isRegistered: true,
          isLocationPermissionGranted: false,
          currentZipCode: null,
          currentCountry: null,
          currentState: null,
          isProfileComplete: false,
        }));
      },
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => (Platform.OS === 'web' ? localStorage : AsyncStorage)),
    }
  )
);
export const {
  setRegister,
  setFirstLogin,
  setSession,
  setLoggedIn,
  setFailedLogin,
  setUserDetails,
  reset,
  setRefresh,
  setPlaces,
  setCoordinates,
  updateLocation,
  setAutoFetchLocation,
  setLoginFistTime,
  setWelcomeBonusClaimed,
  setLocationPermissionGranted,
} = useUserStore.getState();

const logout = async () => {
  if (useUserStore.getState()?.user === null) {
    return;
  }

  try {
    useUserStore.getState().setUserDetails(null);
    useUserStore.getState().reset();
    useUserStore.getState().setLoggedIn(false);
    queryClient.clear();
    router.replace('/auth');
  } catch (error) {
    showError('Error', 'An error occurred while logging out. Please try again later.');
  }
};

export { logout };
export default useUserStore;
