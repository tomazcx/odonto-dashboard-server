import {CreateSessionController} from "@modules/client/useCases/CreateSession/infra/CreateSessionController";
import {Router} from "express";
import {z} from "zod";
import {validateRequest} from "zod-express-middleware";

const createSessionController = new CreateSessionController()
const authRouter = Router()

authRouter.post('/login', validateRequest({
	body: z.object({
		user: z.string(),
		password: z.string()
	})
}), createSessionController.handle)

export {authRouter}
