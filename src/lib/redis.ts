import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

/** Sorted-set key holding "<visitorId>: <lastSeenTimestamp>" pairs. */
export const ONLINE_SET_KEY = "presence:online";

/** Hash key holding "<visitorId>: <countryCode>" pairs, for the online set above. */
export const ONLINE_COUNTRY_KEY = "presence:country";

/** A visitor counts as online if we heard from them within this window. */
export const ONLINE_WINDOW_MS = 30_000;
