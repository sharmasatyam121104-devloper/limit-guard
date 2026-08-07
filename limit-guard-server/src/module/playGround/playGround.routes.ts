import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { getApiList, getBooks, getEmployees, getMovies, getProducts, getStudents } from "./playGround.controller";
import activityMiddleware from "../activity/activity.middleware";
import { rateLimiter } from "../rateLimit/rateLimit.service";

const PlayGroundRouter = Router()

PlayGroundRouter.use(authMiddleware)
PlayGroundRouter.use(activityMiddleware)
PlayGroundRouter.use(rateLimiter)

PlayGroundRouter.get('/product', getProducts)
PlayGroundRouter.get('/student', getStudents)
PlayGroundRouter.get('/employee', getEmployees)
PlayGroundRouter.get('/movie', getMovies)
PlayGroundRouter.get('/book', getBooks)
PlayGroundRouter.get('/api-list', getApiList)

export default PlayGroundRouter;