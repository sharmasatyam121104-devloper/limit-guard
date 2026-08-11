import { Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { SessionInterface } from "../user/user.interface";
import * as rateLimitService from "./rateLimit.service"

export const getRateLimitDetails = asyncHandler(async(req: SessionInterface, res: Response)=>{
    const userId = req?.userId;
    const data = await rateLimitService.getRateLimitDetails(userId!)
    res.json(data)
})