import { Router } from "express"
import { getUrl, openUrl, shorten } from "../controllers/link.controllers.js"
import { authorizationValidate } from "../middlewares/authorizationValidate.js"
import validateSchema from "../middlewares/validadeSchema.js"
import { linkSchema } from "../schemas/link.schemas.js"

const linkRoutes = Router()

linkRoutes.post("/urls/shorten", authorizationValidate, validateSchema(linkSchema), shorten)
linkRoutes.get("/urls/:id", getUrl)
linkRoutes.get("/urls/open/:shortUrl", openUrl)

export default linkRoutes