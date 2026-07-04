import { Router } from "express";
import dtoMiddleware from "../../middleware/DtoMiddleware ";

import { signup } from "./user.controller";
import { signupDtoSchema } from "./user.dto";

const UserRouter = Router()

UserRouter.post('/signup', dtoMiddleware(signupDtoSchema), signup)

export default UserRouter;