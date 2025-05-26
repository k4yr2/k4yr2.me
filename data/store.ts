import { Activity } from "react-activity-calendar";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import AppState, { AnimationState } from "./state";

const appStore = create<AppState>()(immer((set) => ({
    home: {
        animation: {
            title: AnimationState.waiting,
            tagline: AnimationState.waiting,
            calendar: AnimationState.waiting,
            techStack: AnimationState.waiting
        },
        calendar: {
            source: [],
            loading: true,
            
            bind: (source: Activity[]) => set((state) => {
                state.home.calendar.source = source;
                state.home.calendar.loading = false;
            }),
        },
    }
})));

export default appStore;
