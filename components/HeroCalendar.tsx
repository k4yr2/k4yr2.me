import { useState, useEffect } from "react";
import ActivityCalendar, { ThemeInput } from "react-activity-calendar";

const HeroCalendar = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

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
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    };

    return <ActivityCalendar data={data} loading={loading} theme={explicitTheme} />;
}

export default HeroCalendar;