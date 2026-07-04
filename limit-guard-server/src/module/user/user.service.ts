import createError from "../../utils/createError"
import bcrypt from "bcrypt"
import crypto from "crypto"
import UserModel from "./user.model"
import { SignupDto } from "./user.dto"
import { SignupResponseInterface } from "./user.interface"
import genrateAccessToken from "./utils/genrateAccessToken"

//signup with local
export const signup = async(body: SignupDto): Promise<SignupResponseInterface>=>{
    const {email, fullname, password} = body
    const isUserExists = await UserModel.exists({email})
    if(isUserExists){
        throw createError(409, "User already exists. Please login instead.")
    }

    const signupData = {
        email,
        fullname,
        password,
    }
    await UserModel.create(signupData)
    return {message: "User registered successfully."}
}


export const login = async(body: any)=>{
    const {email, password} = body
    const user = await UserModel.findOne({email})
    if(!user){
        throw createError(404, "User not found, Please registered first.")
    }

    const isPasswordMatch = await bcrypt.compare(password, user?.password)
    if(!isPasswordMatch){
        throw createError(401, "Unauthorized: Invalid credentials")
    }

    const refresh_token = crypto.randomBytes(64).toString("hex")
    const refresh_token_hash = crypto.createHash("sha256").update("refresh_token").digest("hex")

    const access_token =  genrateAccessToken(user._id, email)
}