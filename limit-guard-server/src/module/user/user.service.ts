import createError from "../../utils/createError"
import { SignupDto } from "./user.dto"
import { SignupResponseInterface } from "./user.interface"
import UserModel from "./user.model"

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