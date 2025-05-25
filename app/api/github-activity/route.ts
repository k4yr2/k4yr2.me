import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_HOST!,
    token: process.env.UPSTASH_REDIS_PASSWORD!,
});

export async function GET() {
    const cacheKey = 'github_activity';
    const cached = await redis.get(cacheKey);

    if (cached) {
        return NextResponse.json(typeof cached === 'string' ? JSON.parse(cached) : cached);
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
    const username = 'k4yr2';

    const query = `
        query {
        user(login: "${username}") {
            contributionsCollection {
            contributionCalendar {
                weeks {
                contributionDays {
                    date
                    contributionCount
                }
                }
            }
            }
        }
        }
    `;

    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    const result = await response.json();

    const days =
        result.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
        (week: any) => week.contributionDays
    );

    const maxCount = Math.max(...days.map((d: any) => d.contributionCount));

    const withLevels = days.map((d: any) => {
        let level = 0;
        const count = d.contributionCount;

        if (count > 0) {
        const ratio = count / maxCount;
        if (ratio > 0.75) level = 4;
        else if (ratio > 0.5) level = 3;
        else if (ratio > 0.25) level = 2;
        else if (ratio > 0) level = 1;
        }

        return {
            date: d.date,
            count: d.contributionCount,
            level,
        };
    });

    await redis.set(cacheKey, JSON.stringify(withLevels), { ex: 3600 });

    return NextResponse.json(withLevels);
}