import { Router } from "express";
import { signIn, signUp } from "../controllers/person.controllers.js";
import validateSchema from "../middlewares/validadeSchema.js";
import { signInSchema, signUpSchema } from "../schemas/person.schemas.js";

const personRoutes = Router();

personRoutes.post("/signup", validateSchema(signUpSchema), signUp)
personRoutes.post("/signIn", validateSchema(signInSchema), signIn)


export default personRoutes;