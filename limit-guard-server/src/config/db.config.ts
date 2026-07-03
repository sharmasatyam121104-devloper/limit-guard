import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const DB_URL = process.env.DB_URL
        const DB_NAME = process.env.DB_NAME
        if(!DB_URL){
            throw new Error("DB_URL env variable missing.")
        }
        if(!DB_NAME){
            throw new Error("DB_NAME env variable missing.")
        }
        const DB_STRIG = `${DB_URL}/${DB_NAME}`

        await mongoose.connect(DB_STRIG)

        console.log(`Database connected`);
    } 
    catch (error) {
        if(error instanceof Error){
           console.log(`Error in DB connection - ${error.message}`)
           return process.exit(1)   
        }
    }
}


export default connectDB