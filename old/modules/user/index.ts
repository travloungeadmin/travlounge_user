import queryClient from '@/services/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Platform } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserType = {
  id: string;
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
  latitude: null,
  longitude: null,
  isRegistered: true,
};

type Action = {
  setFirstLogin: () => void;
  setSession: (session: State['session']) => void;
  setRefresh: (refresh: State['refresh']) => void;
  setUserDetails: (user: UserType) => void;
  setFailedLogin: () => void;
  setLoggedIn: (loggedIn: State['loggedIn']) => void;
  reset: () => void;
  setPlaces: (props: { place: string; subPlace: string }) => void;
  setCoordinates: (props: { latitude: number; longitude: number }) => void;
  setRegister: (status: boolean) => void;
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
      setUserDetails: (user: UserType) => {
        set((state) => ({
          user: {
            ...state.user,
            ...user,
          },
        }));
      },
      setLoggedIn: (loggedIn: State['loggingIn']) => {
        set(() => ({ loggedIn }));
      },
      setCoordinates: ({ latitude, longitude }) => {
        set(() => ({ latitude, longitude }));
      },
      setPlaces: ({ place, subPlace }) => {
        set(() => ({ place, subPlace }));
      },
      setFailedLogin: () => {
        set((state) => ({ loginFailed: state.loginFailed + 1 }));
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
} = useUserStore.getState();

const logout = async () => {
  console.log('Logging out...');

  try {
    useUserStore.getState().reset();
    queryClient.clear();
    router.replace('/auth');
  } catch (error) {
    console.log(error);
  }
};

export { logout };

export default useUserStore;
