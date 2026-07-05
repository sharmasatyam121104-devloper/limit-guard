import { Router } from "express";
import dtoMiddleware from "../../middleware/dtoMiddleware ";

import { login, signup } from "./user.controller";
import { loginDtoSchema, signupDtoSchema } from "./user.dto";

const UserRouter = Router()

UserRouter.post('/signup', dtoMiddleware(signupDtoSchema), signup)
UserRouter.post('/login', dtoMiddleware(loginDtoSchema), login)

export default UserRouter;