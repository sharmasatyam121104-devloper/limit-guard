import { Request, Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import * as userService from './user.service'
import { setAccessAndRefreshToken } from "./utils/cokkies.utils";
import { SessionInterface } from "./user.interface";

export const signup = asyncHandler(async(req: Request, res: Response)=>{
    const body = req.body;
    const data = await userService.signup(body)
    res.json(data)
})

export const login = asyncHandler(async(req: Request, res: Response)=>{
    const body = req.body;
    const data = await userService.login(body)
    setAccessAndRefreshToken(res, data.access_token, data.refresh_token);
    res.json({message: data?.message})
})

export const update_profile = asyncHandler(async(req: SessionInterface, res: Response)=>{
    const body = req.body;
    const userId = req?.userId;
    const data = await userService.update_profile(body, userId!)
    res.json(data)
})

export const rotate_token = asyncHandler(async(req: Request, res: Response)=>{
    const refresh_token = req.cookies.refresh_token;
    const data = await userService.rotate_token(refresh_token)
    setAccessAndRefreshToken(res, data.access_token, data.refresh_token);
    res.json({message: data?.message})
})

export const getMe = asyncHandler(async(req: SessionInterface, res: Response)=>{
    const userId = req?.userId;
    const data = await userService.getMe(userId!)
    res.json(data)
})