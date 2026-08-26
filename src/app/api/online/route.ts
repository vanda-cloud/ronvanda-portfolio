import { NextRequest, NextResponse } from "next/server";
import { redis, ONLINE_SET_KEY, ONLINE_COUNTRY_KEY, ONLINE_WINDOW_MS } from "@/lib/redis";

export const dynamic = "force-dynamic";

/** Country code Vercel's edge network assigns to a visitor's IP, e.g. "US". Unset outside Vercel (e.g. local dev). */
const UNKNOWN_COUNTRY = "XX";

interface Presence {
  count: number;
  byCountry: Record<string, number>;
}

async function sweepAndCount(): Promise<Presence> {
  const cutoff = Date.now() - ONLINE_WINDOW_MS;

  const staleIds = await redis.zrange<string[]>(ONLINE_SET_KEY, 0, cutoff, { byScore: true });
  if (staleIds.length > 0) {
    await redis.zremrangebyscore(ONLINE_SET_KEY, 0, cutoff);
    await redis.hdel(ONLINE_COUNTRY_KEY, ...staleIds);
  }

  const activeIds = await redis.zrange<string[]>(ONLINE_SET_KEY, 0, -1);
  const byCountry: Record<string, number> = {};

  if (activeIds.length > 0) {
    const countries = await redis.hmget<Record<string, string>>(ONLINE_COUNTRY_KEY, ...activeIds);
    for (const id of activeIds) {
      const code = countries?.[id] ?? UNKNOWN_COUNTRY;
      byCountry[code] = (byCountry[code] ?? 0) + 1;
    }
  }

  return { count: activeIds.length, byCountry };
}

// Heartbeat: registers/refreshes a visitor (with their country), then returns live presence.
export async function POST(req: NextRequest) {
  const { visitorId } = await req.json().catch(() => ({ visitorId: null }));

  if (typeof visitorId === "string" && visitorId.length > 0 && visitorId.length <= 100) {
    const country = req.headers.get("x-vercel-ip-country") || UNKNOWN_COUNTRY;
    await redis.zadd(ONLINE_SET_KEY, { score: Date.now(), member: visitorId });
    await redis.hset(ONLINE_COUNTRY_KEY, { [visitorId]: country });
  }

  return NextResponse.json(await sweepAndCount());
}

// Plain poll: just read the current live presence without registering a visitor.
export async function GET() {
  return NextResponse.json(await sweepAndCount());
}
