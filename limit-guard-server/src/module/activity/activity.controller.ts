import { Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { SessionInterface } from "../user/user.interface";
import createError from "../../utils/createError";

import * as activityService from "./activity.service"

export const getRecentActivity = asyncHandler(async(req:SessionInterface, res: Response)=>{
    const userId = req?.userId;
    
    if(!userId){
        throw createError(401, "Unauthorised Access")
    }

    const data = await activityService.getRecentActivity(userId)
    res.json(data)
})