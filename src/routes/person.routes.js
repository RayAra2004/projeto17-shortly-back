import { Router } from "express";
import { signUp } from "../controllers/person.controllers.js";
import validateSchema from "../middlewares/validadeSchema.js";
import { personSchema } from "../schemas/person.schemas.js";

const personRoutes = Router();

personRoutes.post("/signup", validateSchema(personSchema), signUp)


export default personRoutes;