import dotenv from "dotenv"
dotenv.config()

import Redis from "ioredis";

const url = process.env.REDIS_URL
if(!url){
    throw new Error("Redis url not found")
}

const redis = new Redis(process.env.REDIS_URL as string, {
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
});

redis.on("connect", () => console.log("Redis Connected"));
redis.on("error", (error: unknown) => {
    if(error instanceof Error){
        console.log(error);
    }
});

export default redis;