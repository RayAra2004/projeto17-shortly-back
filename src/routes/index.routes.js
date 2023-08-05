import { Router } from "express"
import personRoutes from "./person.routes.js"
import linkRoutes from "./link.routes.js"

const router = Router()

router.use(personRoutes)
router.use(linkRoutes)

export default router