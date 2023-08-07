import { Router } from "express";
import { getUser } from "../controllers/user.controllers.js";
import { authorizationValidate } from "../middlewares/authorizationValidate.js";

const userRouter = Router()

userRouter.get("/users/me", authorizationValidate, getUser)

export default userRouter