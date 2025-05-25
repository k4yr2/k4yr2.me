import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export async function GET() {
    const cacheKey = 'github_activity';
    const cached = await redis.get(cacheKey);

    if (cached) {
        return NextResponse.json(typeof cached === 'string' ? JSON.parse(cached) : cached);
    }

    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`, 'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query() }),
    });

    const result = await response.json();

    const days =
        result.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
        (week: any) => week.contributionDays
    );

    const maxCount = Math.max(...days.map((d: any) => d.contributionCount));

    const data = days.map((d: any) => {
        return {
            date: d.date,
            count: d.contributionCount,
            level: level(d.contributionCount, maxCount),
        };
    });

    await redis.set(cacheKey, JSON.stringify(data), { ex: 3600 });

    return NextResponse.json(data);
}

// ------------------------------ // -  - // ------------------------------ //

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_HOST!,
    token: process.env.UPSTASH_REDIS_PASSWORD!,
});

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const username = 'k4yr2';

const query = () =>`
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

const level = (count: number, maxCount: number) => {
    const ratio = count / maxCount;

    if (ratio > 0.75) return 4;
    if (ratio > 0.5) return 3;
    if (ratio > 0.25) return 2;
    if (count > 0) return 1;

    return 0;
}