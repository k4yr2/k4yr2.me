import { Activity } from "react-activity-calendar";
import { create } from "zustand";
import AppState from "./state";

const appStore = create<AppState>((set) => ({
    isAnimated: false,
    setAnimated: () => set(() => ({ isAnimated: true })),
    calendarSource: [],
    setCalendarSource: (source: Activity[]) => set(() => ({ calendarSource: source })),
}))

export default appStore;
