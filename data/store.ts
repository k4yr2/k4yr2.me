import { Activity } from "react-activity-calendar";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import AppState, { AnimationRecord, AnimationState } from "./state";
import animationFrame from "@/utils/animationFrame";

const appStore = create<AppState>()(immer((set) => ({
    home: {
        animation: {
            title_hi: AnimationState.waiting,
            tagline_once: AnimationState.waiting,
            tagline_now: AnimationState.waiting,
            title_back: AnimationState.waiting,
            title_name: AnimationState.waiting,
            calendar: AnimationState.waiting,
            techStack: AnimationState.waiting,

            frame: (trigger? : boolean) => {
                let changed = false;
                set((state) => {
                    changed = animationFrame(state.home.animation as unknown as AnimationRecord, trigger);
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
