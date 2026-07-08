import { Router } from "express";
import dtoMiddleware from "../../middleware/dtoMiddleware ";

import { login, rotate_token, signup, update_profile } from "./user.controller";
import { loginDtoSchema, signupDtoSchema, updateProfileDtoSchema } from "./user.dto";
import authMiddleware from "../../middleware/authMiddleware";

const UserRouter = Router()

UserRouter.post('/signup', dtoMiddleware(signupDtoSchema), signup)
UserRouter.post('/login', dtoMiddleware(loginDtoSchema), login)
UserRouter.put('/update-profile', authMiddleware, dtoMiddleware(updateProfileDtoSchema), update_profile)
UserRouter.get('/rotate_token', rotate_token)

export default UserRouter;