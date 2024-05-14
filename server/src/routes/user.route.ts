import { Router } from "express";
import { signout } from "../controllers/user.controller";

const router = Router()

router.post('/logout', signout)

export default router;