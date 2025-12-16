import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { services } from '../data';

export type Service = (typeof services)[number]['service'];

type serviceType = {
  id: number;
  title: string;
  icon: string;
  service: Service;
};

type State = {
  services: serviceType[];
};

const initialState: State = {
  services: [],
};

type Action = {
  setServices: (services: State['services']) => void;
  reset: () => void;
};

const useServiceStore = create(
  persist<State & Action>(
    (set) => ({
      ...initialState,
      setServices: (services: State['services']) => {
        set(() => ({ services }));
      },
      reset: () => {
        set(() => ({
          services: [],
        }));
      },
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => (Platform.OS === 'web' ? localStorage : AsyncStorage)),
    }
  )
);
export const { setServices, reset } = useServiceStore.getState();
export default useServiceStore;
