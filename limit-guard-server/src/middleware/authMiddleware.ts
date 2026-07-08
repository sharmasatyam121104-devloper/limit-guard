import { NextFunction, Response } from "express";
import asyncHandler from "./asyncHandler";
import createError from "../utils/createError";
import jwt, { JwtPayload } from "jsonwebtoken"
import { SessionInterface } from "../module/user/user.interface";


interface AuthPayload extends JwtPayload {
  userId: string;
  email: string;
  role: string;
}


const authMiddleware = asyncHandler (async(req: SessionInterface, res: Response, next: NextFunction)=>{
    const {access_token} = req.cookies;

    if(!access_token){
        throw createError(404, "access_token not found.")
    }

    const decoded = jwt.verify(
        access_token,
        process.env.ACCESS_SECRET!
    ) as AuthPayload;

    if(!decoded){
        throw createError(401, "Unauthorized .") 
    }

    req.userId = decoded.id
    req.email = decoded.email
    req.role = decoded.role
    next()
})

export default authMiddleware

