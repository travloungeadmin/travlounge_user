import { create } from "zustand"


type State = {
    fromPlace: {name:string,
        coordinates: {latitude: number, longitude: number}
    } | null
    toPlace: {name:string,
        coordinates: {latitude: number, longitude: number}
    } | null
  }
  
  type Action = {
    updateFromPlace: (from: State['fromPlace']) => void
    updateToPlace: (to: State['toPlace']) => void
    resetState: () => void  
  }
  
const useSearchStore = create<State & Action>((set) => ({
    fromPlace: null,
    toPlace: null,
    updateFromPlace: (from) => set(() => ({ fromPlace: from })),
    updateToPlace: (to) =>set(() => ({ toPlace: to })),
    resetState: () => set(() => ({ fromPlace: null, toPlace: null })),
  }))

export default useSearchStore
