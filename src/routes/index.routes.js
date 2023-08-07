import { Router } from "express"
import personRoutes from "./person.routes.js"
import linkRoutes from "./link.routes.js"
import userRouter from "./user.routes.js"
import rankingRouter from "./ranking.routes.js"

const router = Router()

router.use(personRoutes)
router.use(linkRoutes)
router.use(userRouter)
router.use(rankingRouter)

export default router