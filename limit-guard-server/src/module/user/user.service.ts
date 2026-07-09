import createError from "../../utils/createError"
import bcrypt from "bcrypt"
import crypto from "crypto"
import UserModel from "./user.model"
import { LoginDto, SignupDto, updateProfileDto } from "./user.dto"
import { GetMeResponseInterface, LoginResponseInterface, LogoutResponseInterface, RotateTokenResponseInterface, SignupResponseInterface, UpadteProfileResponseInterface } from "./user.interface"
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
        .expire(`session:${user._id}`, process.env.REDIS_SESSION_TTL || 604800)
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

export const rotate_token = async(refresh_token: string): Promise<RotateTokenResponseInterface>=>{
    if (!refresh_token) {
        throw createError(401, "Refresh token not found.");
    }

    let refresh_token_hash = crypto.createHash("sha256").update(refresh_token).digest("hex")

    const user = await UserModel.findOne({refresh_token: refresh_token_hash})

    if (!user) {
        throw createError(401, "Invalid refresh token.");
    }

    const access_token =  genrateAccessToken(user._id, user.email)
    refresh_token = crypto.randomBytes(64).toString("hex")
    refresh_token_hash = crypto.createHash("sha256").update(refresh_token).digest("hex")

    user.refresh_token = refresh_token_hash;
    await user.save()

    return {
        message: "Token rotate successfully.",
        access_token,
        refresh_token
    }
}

export const getMe = async(userId: string): Promise<GetMeResponseInterface>=>{
    const myData = await UserModel.findById(userId).select("-password -refresh_token")
    return {data:myData}
}


export const logout = async(userId: string, access_token: string): Promise<LogoutResponseInterface>=>{
    const logoutData = await UserModel.findByIdAndUpdate(userId, {refresh_token: null})
    if(!logoutData){
        throw createError(401, "Unauthorized Access.");
    }
    const TOKEN_EXPIRY = 15 * 60; 

    const lastLogin = logoutData.last_login.getTime();
    const currentTime = Date.now();

    const elapsedSeconds = Math.floor((currentTime - lastLogin) / 1000);

    const ttl = Math.max(0, TOKEN_EXPIRY - elapsedSeconds);

    await Promise.all([
        redis.set(`blacklist:${access_token}`, "true", "EX", ttl),
        redis.del(`session:${userId}`)
    ])
    return {
        message: "User logout successfully."
    }
}