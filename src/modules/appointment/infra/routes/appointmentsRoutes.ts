import {CreateAppointmentController} from "@modules/appointment/useCases/CreateAppointment/infra/CreateAppointmentController";
import {DeleteAppointmentController} from "@modules/appointment/useCases/DeleteAppointment/infra/DeleteAppoitmentController";
import {ShowAllClientAppointmentsController} from "@modules/appointment/useCases/ShowAllClientAppointments/infra/ShowAllClientAppointmentsController";
import {authenticate} from "@shared/http/middlewares/Authenticate";
import {Router} from "express";
import {z} from "zod";
import {validateRequest} from "zod-express-middleware";

const appointmentRouter = Router()

//CONTROLLERS
const createAppointmentController = new CreateAppointmentController()
const deletAppointmentController = new DeleteAppointmentController()
const showAllClientAppointmentsController = new ShowAllClientAppointmentsController()

//GET REQUEST
appointmentRouter.get('/all/:clientId', authenticate, validateRequest({
	params: z.object({
		clientId: z.string().uuid()
	})
}), showAllClientAppointmentsController.handle)

//POST REQUEST
appointmentRouter.post('/create/:clientId', authenticate, validateRequest({
	params: z.object({
		clientId: z.string().uuid()
	}),
	body: z.object({
		date: z.string(),
		teeth: z.string(),
		proccedure: z.string()
	})
}), createAppointmentController.handle)

//DELETE REQUEST
appointmentRouter.delete('/:id', authenticate, validateRequest({
	params: z.object({
		id: z.string().uuid()
	})
}), deletAppointmentController.handle)


export {appointmentRouter}
