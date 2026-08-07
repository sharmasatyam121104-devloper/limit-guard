import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { getRateLimitDetails } from "./rateLimit.service";

const RateLimiterRouter = Router();

RateLimiterRouter.get(
  "/",
  authMiddleware,
  getRateLimitDetails
);

export default RateLimiterRouter;