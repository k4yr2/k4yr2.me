import { create } from "zustand";

export interface AppState {
    isAnimated: boolean;
    setAnimated: () => void;
}

const k4yr2Store = create<AppState>((set) => ({
    isAnimated: false,
    setAnimated: () => set(() => ({ isAnimated: true })),
}))

export default k4yr2Store;
