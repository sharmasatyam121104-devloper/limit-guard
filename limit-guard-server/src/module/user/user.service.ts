import createError from "../../utils/createError"
import bcrypt from "bcrypt"
import crypto from "crypto"
import UserModel from "./user.model"
import { LoginDto, SignupDto, updateProfileDto } from "./user.dto"
import { LoginResponseInterface, SignupResponseInterface, UpadteProfileResponseInterface } from "./user.interface"
import genrateAccessToken from "./utils/genrateAccessToken"
import redis from "../../config/redis.config"

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

//login with local
export const login = async(body: LoginDto): Promise<LoginResponseInterface>=>{
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
    const refresh_token_hash = crypto.createHash("sha256").update(refresh_token).digest("hex")

    const access_token =  genrateAccessToken(user._id, email)
    const userPayload = {
        refresh_token: refresh_token_hash,
        last_login: Date.now()
    }

    await Promise.all([
        UserModel.findByIdAndUpdate(user._id, userPayload),
        redis.pipeline()
        .hset(`session:${user._id}`, {
            "refresh_token": refresh_token_hash,
            "email": user.email,
            "login_at": Date.now().toString(),
            "role": user.role,
        })
        .expire(`session:${user._id}`, process.env.REFRESH_TOKEN_EXPIRES || 604800)
        .exec()
    ])

    return {
        message: "User login successfully",
        access_token,
        refresh_token
    }
}

export const update_profile = async (body: updateProfileDto, userId: string): Promise<UpadteProfileResponseInterface> => {
  const { fullname, profile_image_url } = body;

  if(!fullname && !profile_image_url){
    throw createError(200, "No changes detected. Data is already up to date.")
  }

  const user = await UserModel.findByIdAndUpdate(userId,
    {
      fullname,
      profile_image_url,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    throw createError(404, "User not found.");
  }

  return {
    message: "Profile updated successfully.",
  };
};

export const rotate_token = async(body: any, cookies: any)=>{
    let {refresh_token} = cookies;
    if(!refresh_token){
        throw createError(404, "refresh_token not found.")
    }

    let refresh_token_hash = crypto.createHash("sha256").update(refresh_token).digest("hex")

    const user = await UserModel.findById(body.userId)

    if(refresh_token_hash !== user.refresh_token){
        throw createError(401, "Invalid Refresh Token.")
    }

    const access_token =  genrateAccessToken(user._id, user.email)
    refresh_token = crypto.randomBytes(64).toString("hex")
    refresh_token_hash = crypto.createHash("sha256").update(refresh_token).digest("hex")

    user.refresh_token = refresh_token_hash;
    user.save()

    return {
        message: "Token rotate successfully.",
        access_token,
        refresh_token
    }
}