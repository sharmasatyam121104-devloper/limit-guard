import jwt from "jsonwebtoken"

const accessTokenExpireTime = process.env.ACCESS_TOKEN_EXPIRES
if(!accessTokenExpireTime){
    throw new Error("ACCESS_TOKEN_EXPIRES variable missing in .env file")
}

const genrateAccessToken = (id: string, email: string) => {
    return jwt.sign({id, email}, process.env.ACCESS_SECRET!, {expiresIn: "15m"})
}

export default genrateAccessToken