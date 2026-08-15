import express from "express";
const app = express()

import cookieParser from "cookie-parser"
import { corsOptions } from "./config/cors.config";

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(corsOptions)



import notFound from "./middleware/notFound";
import errorHandler from "./middleware/errorHandler";
import UserRouter from "./module/user/user.route";
import PlayGroundRouter from "./module/playGround/playGround.routes";
import ActivityRouter from "./module/activity/activity.route";
import RateLimiterRouter from "./module/rateLimit/rateLimit.routes";
import UsageRouter from "./module/usage/usage.routes";

app.use('/user', UserRouter)
app.use('/play-ground', PlayGroundRouter)
app.use('/activity', ActivityRouter)
app.use('/rate-limit', RateLimiterRouter)
app.use('/usage', UsageRouter)
app.use(notFound);
app.use(errorHandler);


export default app;