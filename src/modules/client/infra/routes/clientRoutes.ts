import {CreateClientController} from "@modules/client/useCases/CreateClient/infra/CreateClientControlller";
import {DeleteClientController} from "@modules/client/useCases/DeleteClient/infra/DeleteClientController";
import {ShowAllClientsController} from "@modules/client/useCases/ShowAllClients/infra/ShowAllClientsController";
import {ShowClientController} from "@modules/client/useCases/ShowClient/infra/ShowClientController";
import {UpdateClientController} from "@modules/client/useCases/UpdateClient/infra/UpdateClientController";
import {authenticate} from "@shared/http/middlewares/Authenticate";
import {Router} from "express";
import {z} from "zod";
import {validateRequest} from "zod-express-middleware";

const clientRouter = Router()

//CONTROLLERS
const createClientController = new CreateClientController()
const showClientController = new ShowClientController()
const showAllClientsController = new ShowAllClientsController()
const deleteClientController = new DeleteClientController()
const updateClientController = new UpdateClientController()

//GET REQUESTS

clientRouter.get('/all', authenticate, showAllClientsController.handle)

clientRouter.get('/:id', authenticate, validateRequest({
	params: z.object({
		id: z.string().uuid()
	})
}), showClientController.handle)

//POST REQUEST

clientRouter.post('/create', authenticate, validateRequest({
	body: z.object({
		name: z.string(),
		age: z.number().int(),
		phoneNumber: z.string(),
		city: z.string()

	})
}), createClientController.handle)

//PUT REQUEST
clientRouter.put('/:id', authenticate, validateRequest({
	params: z.object({
		id: z.string().uuid()
	}),
	body: z.object({
		name: z.string(),
		age: z.number().int(),
		phoneNumber: z.string(),
		address: z.object({
			city: z.string()
		})
	})
}), updateClientController.handle)


//DELETE REQUEST
clientRouter.delete('/:id', authenticate, validateRequest({
	params: z.object({
		id: z.string().uuid()
	})
}), deleteClientController.handle)

export {clientRouter}
