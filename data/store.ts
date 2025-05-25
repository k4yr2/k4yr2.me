import { create } from "zustand";

export interface AppState {
    isAnimated: boolean;
    setAnimated: () => void;
}

const appStore = create<AppState>((set) => ({
    isAnimated: false,
    setAnimated: () => set(() => ({ isAnimated: true })),
}))

export default appStore;
