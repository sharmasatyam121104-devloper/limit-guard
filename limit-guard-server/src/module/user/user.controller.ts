import { Request, Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import * as userService from './user.service'

export const signup = asyncHandler(async(req: Request, res: Response)=>{
    const body = req.body;
    const data = await userService.signup(body)
    res.json(data)
})