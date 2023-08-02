import { Router } from "express";
import personRoutes from "./person.routes.js";

const router = Router();

router.use(personRoutes);

export default router;