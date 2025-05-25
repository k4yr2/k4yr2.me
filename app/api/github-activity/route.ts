import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_HOST!,
  token: process.env.UPSTASH_REDIS_PASSWORD!,
});

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;

const query = `
  query {
    user(login: "k4yr2") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
    const dataName = 'github-activity-calendar';
    const cachedData = await redis.get<string>(dataName);
    if (cachedData) {
        const data = typeof cachedData === 'string' ? JSON.parse(cachedData) : cachedData;
        return NextResponse.json({ data, source: 'cache' });
    }

    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    if (!response.ok) {
        return NextResponse.json({ error: 'GitHub API error' }, { status: 500 });
    }

    const json = await response.json();
    await redis.set(dataName, JSON.stringify(json.data), { ex: 3600 });

    return NextResponse.json({ data: json.data, source: 'github' });
}
