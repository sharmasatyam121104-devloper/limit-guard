import { Router } from "express";
import dtoMiddleware from "../../middleware/dtoMiddleware ";

import { signup } from "./user.controller";
import { signupDtoSchema } from "./user.dto";

const UserRouter = Router()

UserRouter.post('/signup', dtoMiddleware(signupDtoSchema), signup)

export default UserRouter;