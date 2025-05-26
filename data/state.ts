import { Activity } from "react-activity-calendar";

interface AppState {
    home : HomeState;
}

export default AppState;

// ------------------------------ // -  - // ------------------------------ //

export interface HomeState {
    animation: HomeAnimationState;
    calendar: HomeCalendarState;
}

export interface HomeAnimationState {
    title_hi: AnimationState;
    tagline_once: AnimationState;
    title_back: AnimationState;
    tagline_now: AnimationState;
    title_name: AnimationState
    calendar: AnimationState;
    techStack: AnimationState;

    frame: (trigger? : boolean) => boolean;
}

export interface HomeCalendarState {
    source : Activity[];
    loading: boolean;
    bind : (source: Activity[]) => void;
}

// ------------------------------ // -  - // ------------------------------ //

export enum AnimationState {
    waiting = 'waiting',
    animating = 'animating',
    animated = 'animated',
}

export interface AnimationRecord {
    [key: string]: AnimationState;
}