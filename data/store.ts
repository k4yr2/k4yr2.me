import { Activity } from "react-activity-calendar";
import { create } from "zustand";

export interface AppState {
    isAnimated: boolean;
    setAnimated: () => void;
    calendarSource: Activity[];
    setCalendarSource: (source: Activity[]) => void;
}

const appStore = create<AppState>((set) => ({
    isAnimated: false,
    setAnimated: () => set(() => ({ isAnimated: true })),
    calendarSource: [],
    setCalendarSource: (source: Activity[]) => set(() => ({ calendarSource: source })),
}))

export default appStore;
