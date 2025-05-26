import { Activity } from "react-activity-calendar";

interface AppState {
    isAnimated: boolean;
    setAnimated: () => void;
    calendarSource: Activity[];
    setCalendarSource: (source: Activity[]) => void;
}

export default AppState;