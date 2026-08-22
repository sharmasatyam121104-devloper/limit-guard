import { NextFunction, Response } from "express";
import asyncHandler from "./asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken"
import { SessionInterface } from "../module/user/user.interface";
import redis from "../config/redis.config";


interface AuthPayload extends JwtPayload {
  userId: string;
  email: string;
  role: string;
}


const authMiddleware = asyncHandler (async(req: SessionInterface, res: Response, next: NextFunction)=>{
    const {access_token} = req.cookies;

    if(!access_token){
        return res.status(401).json({
        "success": false,
        "code": "AUTH_TOKEN_MISSING",
        "message": "Access token not found"
        });
    }

    const isBlacklisted = await redis.get(
        `blacklist:${access_token}`
    );

    if (isBlacklisted) {
        return res.status(401).json({
            success: false,
            message: "Token has been revoked."
        });
    }

    const decoded = jwt.verify(
        access_token,
        process.env.ACCESS_SECRET!
    ) as AuthPayload;

    if(!decoded){
        return res.status(401).json({
            "success": false,
            "code": "AUTH_TOKEN_INVALID",
            "message": "Invalid access token"
        }) 
    }

    req.userId = decoded.id
    req.email = decoded.email
    req.role = decoded.role
    next()
})

export default authMiddleware

