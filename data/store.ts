import { Activity } from "react-activity-calendar";
import { create } from "zustand";

export interface AppState {
    isAnimated: boolean;
    setAnimated: () => void;
    calendarSource: Activity[] | null;
    setCalendarSource: (source: Activity[] | null) => void;
}

const appStore = create<AppState>((set) => ({
    isAnimated: false,
    setAnimated: () => set(() => ({ isAnimated: true })),
    calendarSource: null,
    setCalendarSource: (source: Activity[] | null) => set(() => ({ calendarSource: source })),
}))

export default appStore;
