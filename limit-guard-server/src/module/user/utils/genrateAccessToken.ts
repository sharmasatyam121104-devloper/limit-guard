import jwt from "jsonwebtoken"

const genrateAccessToken = (id: string, email: string) => {
    return jwt.sign({id, email}, process.env.ACCESS_SECRET!, {expiresIn: "15m"})
}

export default genrateAccessToken