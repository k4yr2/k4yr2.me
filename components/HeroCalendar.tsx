import k4yr2Store from "@/data/store";
import { useState, useEffect } from "react";
import ActivityCalendar, { ThemeInput } from "react-activity-calendar";

const HeroCalendar = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const isAnimated = k4yr2Store((state) => state.isAnimated);

    useEffect(() => {
        fetch('/api/github-activity')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(json => {
                setData(json);
                setLoading(false);
            })
            .catch(err => {
                console.error('Fetch error:', err);
            });
    }, []);

    const explicitTheme: ThemeInput = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#151B23', '#007728', '#02A232', '#0AC740', '#4AE168'],
    };

    return (
        <div className="hero-calendar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <ActivityCalendar style={{ visibility: isAnimated ? 'visible' : 'hidden' }}
                data={data} loading={loading}
                theme={isAnimated ? explicitTheme : undefined}
                showWeekdayLabels={false}
                hideColorLegend={true}
                hideMonthLabels={true}
                blockMargin={2}
                blockRadius={0}
                blockSize={16}
            />
        </div>
    )
}

export default HeroCalendar;