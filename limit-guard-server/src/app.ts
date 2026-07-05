import express from "express";
const app = express()

import cookieParser from "cookie-parser"

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())



import notFound from "./middleware/notFound";
import errorHandler from "./middleware/errorHandler";
import UserRouter from "./module/user/user.route";

app.use('/user', UserRouter)
app.use(notFound);
app.use(errorHandler);


export default app;