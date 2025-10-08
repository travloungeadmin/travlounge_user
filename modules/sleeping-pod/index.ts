import { create } from 'zustand';

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Place = {
  name: string;
  coordinates: Coordinates;
} | null;

type Pod = {
  type: string | null;
  number_of_pods: number;
  is_bath: boolean;
  is_restroom: boolean;
  noOfExtraBaths: number;
};

type State = {
  place: Place;
  duration: number;
  date: string;
  time: string;
  list_of_pods: Pod[];
};

type Actions = {
  updatePlace: (place: Place) => void;
  updateDuration: (duration: number) => void;
  updateDate: (date: string) => void;
  updateTime: (time: string) => void;
  updatePods: (list_of_pods: Pod[]) => void;
  resetState: () => void;
};

const useSleepingPodCart = create<State & Actions>((set) => ({
  place: null,
  duration: 0,
  date: '',
  time: '',
  list_of_pods: [
    {
      type: null,
      number_of_pods: 0,
      is_bath: false,
      is_restroom: false,
      noOfExtraBaths: 0,
    },
  ],
  updatePlace: (place: Place) => set(() => ({ place })),
  updateDuration: (duration: number) => set(() => ({ duration })),
  updateDate: (date: string) => set(() => ({ date })),
  updateTime: (time: string) => set(() => ({ time })),
  updatePods: (list_of_pods: Pod[]) => set(() => ({ list_of_pods })),
  resetState: () =>
    set(() => ({
      place: null,
      duration: 0,
      date: '',
      time: '',
      list_of_pods: [
        {
          type: null,
          number_of_pods: 0,
          is_bath: false,
          is_restroom: false,
          noOfExtraBaths: 0,
        },
      ],
    })),
}));

export default useSleepingPodCart;
