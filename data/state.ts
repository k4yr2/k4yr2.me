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
    title: AnimationState;
    tagline: AnimationState;
    calendar: AnimationState;
    techStack: AnimationState;
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