import { Activity } from "react-activity-calendar";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import AppState, { AnimationRecord, AnimationState } from "./state";
import animationFrame from "@/utils/nextAnimation";

const appStore = create<AppState>()(immer((set) => ({
    home: {
        animation: {
            title: AnimationState.waiting,
            tagline: AnimationState.waiting,
            calendar: AnimationState.waiting,
            techStack: AnimationState.waiting,

            frame: () => {
                let changed = false;
                set((state) => {
                    changed = animationFrame(state.home.animation as unknown as AnimationRecord);
                })

                return changed;
            },
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
