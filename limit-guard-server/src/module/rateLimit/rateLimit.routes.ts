import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { getRateLimitDetails } from "./rateLimit.controller";

const RateLimiterRouter = Router();

RateLimiterRouter.get(
  "/",
  authMiddleware,
  getRateLimitDetails
);

export default RateLimiterRouter;