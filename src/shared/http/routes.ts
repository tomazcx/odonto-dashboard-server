import {authRouter} from "@modules/client/infra/routes/authRoutes";
import {clientRouter} from "@modules/client/infra/routes/clientRoutes";
import {Router} from "express";
const router = Router()

router.use("/clients", clientRouter)
router.use('/auth', authRouter)

export {router}
