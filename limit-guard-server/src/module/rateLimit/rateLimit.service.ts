import { Request, Response, NextFunction } from "express";
import redis from "../../config/redis.config";
import { SessionInterface } from "../user/user.interface";

const WINDOW_SIZE = 60; // seconds
const MAX_REQUESTS = 5;

export const rateLimiter = async (req: SessionInterface, res: Response, next: NextFunction) => {
  try {
    const key = `rate:${req.userId}`;

    const currentTime = Math.floor(Date.now() / 1000);
    const windowStart = currentTime - WINDOW_SIZE;

    // Remove expired timestamps
    await redis.zremrangebyscore(key, 0, windowStart);

    // Current requests
    let requestCount = await redis.zcard(key);

    // Limit reached
    if (requestCount >= MAX_REQUESTS) {
      const resetIn = await redis.ttl(key);

      return res.status(429).json({
        success: false,
        message: "Too many requests",
        data: {
          status: "Blocked",
          limit: MAX_REQUESTS,
          used: requestCount,
          remaining: 0,
          resetIn,
        },
      });
    }

    // Add current request
    await redis.zadd(
      key,
      currentTime,
      `${currentTime}-${Math.random()}`
    );

    // Set expiry
    await redis.expire(key, WINDOW_SIZE);

    // Update count after adding current request
    requestCount++;

    // Save info for next middleware/controller
    res.locals.rateLimit = {
      status: "Active",
      limit: MAX_REQUESTS,
      used: requestCount,
      remaining: MAX_REQUESTS - requestCount,
      resetIn: await redis.ttl(key),
    };

    next();
  } catch (error) {
    next(error);
  }
};



export const getRateLimitDetails = async (req: SessionInterface, res: Response) => {
  try {
    const key = `rate:${req.userId}`;

    const currentTime = Math.floor(Date.now() / 1000);
    const windowStart = currentTime - WINDOW_SIZE;

    // Remove expired requests
    await redis.zremrangebyscore(key, 0, windowStart);

    // Current used requests
    const used = await redis.zcard(key);

    // Remaining requests
    const remaining = Math.max(MAX_REQUESTS - used, 0);

    // Reset time
    let resetIn = await redis.ttl(key);

    if (resetIn < 0) {
      resetIn = 0;
    }

    res.status(200).json({
      success: true,
      data: {
        status: used >= MAX_REQUESTS ? "Blocked" : "Active",
        rateLimit: `${MAX_REQUESTS} / minute`,
        usedRequests: used,
        remainingRequests: remaining,
        windowReset: `${resetIn} sec`,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch rate limit details",
    });
  }
};