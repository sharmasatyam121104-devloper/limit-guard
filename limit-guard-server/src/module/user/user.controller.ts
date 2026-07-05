import { Request, Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import * as userService from './user.service'
import { setAccessAndRefreshToken } from "./utils/cokkies.utils";

export const signup = asyncHandler(async(req: Request, res: Response)=>{
    const body = req.body;
    const data = await userService.signup(body)
    res.json(data)
})

export const login = asyncHandler(async(req: Request, res: Response)=>{
    const body = req.body;
    const data = await userService.login(body)
    setAccessAndRefreshToken(res, data.access_token, data.refresh_token);
    res.json(data?.message)
})