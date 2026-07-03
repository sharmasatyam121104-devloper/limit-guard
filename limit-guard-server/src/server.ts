import dotenv from "dotenv"
dotenv.config()

import connectDB from "./config/db.config"
connectDB()

import app from './app'
app.listen(8080,()=>{
    console.log(`server is running`);
})