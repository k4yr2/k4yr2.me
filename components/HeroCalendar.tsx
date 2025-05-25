import appStore from "@/data/store";
import formatDate from "@/utils/formatDate";
import { Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import ActivityCalendar, { ThemeInput } from "react-activity-calendar";

const HeroCalendar = () => {
    const source = appStore((state) => state.calendarSource);
    const setSource = appStore((state) => state.setCalendarSource);

    const onDev = process.env.NODE_ENV === 'development';

    const [loading, setLoading] = useState(true);
    const isAnimated = appStore((state) => state.isAnimated);

    useEffect(() => {
        fetch('/api/github-activity')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(json => {
                setSource(json);
                setLoading(false);
            })
            .catch(err => {
                console.error('Fetch error:', err);
            });
    }, []);

    const [blockSize, setBlockSize] = useState(12);

    useEffect(() => {
        const resizeHandler = () => {
            const width = window.innerWidth;
            
            if (width < 500) setBlockSize(8);
            else if (width < 768) setBlockSize(10);
            else if (width < 1024) setBlockSize(12);
            else if (width < 1280) setBlockSize(14);
            else if (width < 1440) setBlockSize(16);
            else if (width < 1920) setBlockSize(18);
            else setBlockSize(20);
        };

        resizeHandler();
        window.addEventListener("resize", resizeHandler);

        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    const explicitTheme: ThemeInput = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#151B23', '#007728', '#02A232', '#0AC740', '#4AE168'],
    };

    return (
        <div className="hero-calendar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <ActivityCalendar style={{ visibility: isAnimated ? 'visible' : 'hidden' }}
                data={source} loading={isAnimated ? false : loading}
                theme={isAnimated ? explicitTheme : undefined}
                showWeekdayLabels={false}
                hideColorLegend={true}
                hideMonthLabels={true}
                blockMargin={2}
                blockRadius={0}
                blockSize={blockSize}
                renderBlock={(block, activity) => (
                    onDev ? <>{block}</> :
                    <Tooltip title={`${activity.count} contributions on ${formatDate(activity.date)}`}>
                        {block}
                    </Tooltip>
                )}
            />
        </div>
    )
}

export default HeroCalendar;