import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { getApiList, getBooks, getEmployees, getMovies, getProducts, getStudents } from "./playGround.controller";
import activityMiddleware from "../activity/activity.middleware";
import { rateLimiter } from "../rateLimit/rateLimit.service";

const PlayGroundRouter = Router()

PlayGroundRouter.use(authMiddleware)
PlayGroundRouter.use(activityMiddleware)

PlayGroundRouter.get("/product", rateLimiter, getProducts);
PlayGroundRouter.get("/student", rateLimiter, getStudents);
PlayGroundRouter.get("/employee", rateLimiter, getEmployees);
PlayGroundRouter.get("/movie", rateLimiter, getMovies);
PlayGroundRouter.get("/book", rateLimiter, getBooks);

PlayGroundRouter.get("/api-list", getApiList);

export default PlayGroundRouter;