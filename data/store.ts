import { create } from "zustand";

export interface AppState {
    isAnimated: boolean;
    setAnimated: () => void;
    calendarSource: object[] | null;
    setCalendarSource: (source: object[] | null) => void;
}

const appStore = create<AppState>((set) => ({
    isAnimated: false,
    setAnimated: () => set(() => ({ isAnimated: true })),
    calendarSource: null,
    setCalendarSource: (source: object[] | null) => set(() => ({ calendarSource: source })),
}))

export default appStore;
