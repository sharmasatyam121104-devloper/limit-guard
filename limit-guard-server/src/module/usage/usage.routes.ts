import { Router } from "express";
import { getUsageData } from "./usage.controller";
import authmiddleware from "../../middleware/authMiddleware";

const UsageRouter = Router()

UsageRouter.get('/', authmiddleware, getUsageData)

export default UsageRouter;