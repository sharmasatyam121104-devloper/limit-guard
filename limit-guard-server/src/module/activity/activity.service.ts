import redis from "../../config/redis.config"
import createError from "../../utils/createError";
import { activityDto } from "./activity.dto";

export const logActivity = async(payload: activityDto)=>{
    await redis.lpush(
        `activity:${payload.userId}`,
        JSON.stringify({
            type: payload.type,
            message: payload.message,
            status: payload.status,
            createdAt: Date.now()
        })
    )
    await redis.ltrim(`activity:${payload.userId}`, 0, 99);

    return;
}

export const getRecentActivity = async(userId: string)=>{
    let data = await redis.lrange(`activity:${userId}`, 0, 9)
    if(!data){
        throw createError(404, "Any Activity Not Found.")
    }
    data = data.map((items)=>JSON.parse(items))
    return {data}
}