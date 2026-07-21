import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { getRecentActivity } from "./activity.controller";
const ActivityRouter = Router()

ActivityRouter.use(authMiddleware)

ActivityRouter.get("/recent", getRecentActivity)

export default ActivityRouter;