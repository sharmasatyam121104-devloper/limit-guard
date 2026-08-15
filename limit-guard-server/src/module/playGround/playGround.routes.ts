import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { getApiList, getBooks, getEmployees, getMovies, getProducts, getStudents } from "./playGround.controller";
import activityMiddleware from "../activity/activity.middleware";
import { rateLimiter } from "../rateLimit/rateLimit.service";
import { usageLogger } from "../usage/usage.middleware";

const PlayGroundRouter = Router()

PlayGroundRouter.use(authMiddleware)
PlayGroundRouter.use(activityMiddleware)

PlayGroundRouter.get("/product",  rateLimiter, usageLogger, getProducts);
PlayGroundRouter.get("/student",  rateLimiter, usageLogger, getStudents);
PlayGroundRouter.get("/employee",  rateLimiter, usageLogger, getEmployees);
PlayGroundRouter.get("/movie", rateLimiter, usageLogger, getMovies);
PlayGroundRouter.get("/book",  rateLimiter, usageLogger, getBooks);

PlayGroundRouter.get("/api-list", getApiList);

export default PlayGroundRouter;