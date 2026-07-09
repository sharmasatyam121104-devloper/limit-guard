import { Router } from "express";
import dtoMiddleware from "../../middleware/dtoMiddleware ";

import { getMe, login, rotate_token, signup, update_profile } from "./user.controller";
import { loginDtoSchema, signupDtoSchema, updateProfileDtoSchema } from "./user.dto";
import authMiddleware from "../../middleware/authMiddleware";

const UserRouter = Router()

UserRouter.post('/signup', dtoMiddleware(signupDtoSchema), signup)
UserRouter.post('/login', dtoMiddleware(loginDtoSchema), login)
UserRouter.get('/rotate_token', rotate_token)
UserRouter.put('/update-profile', authMiddleware, dtoMiddleware(updateProfileDtoSchema), update_profile)
UserRouter.get('/getMe', authMiddleware, getMe)


export default UserRouter;